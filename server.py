import hashlib
import hmac
import json
import secrets
import sqlite3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "martialarts.db"
HOST = "127.0.0.1"
PORT = 8000

sessions = {}


def connect_db():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def initialize_db():
    with connect_db() as db:
        db.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL COLLATE NOCASE UNIQUE,
                password_hash TEXT NOT NULL,
                password_salt TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)


def hash_password(password, salt=None):
    salt = salt or secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        bytes.fromhex(salt),
        210_000
    )
    return digest.hex(), salt


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def read_json(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 20_000:
                return None
            data = json.loads(self.rfile.read(length))
            return data if isinstance(data, dict) else None
        except (ValueError, json.JSONDecodeError):
            return None

    def get_session_user(self):
        token = self.headers.get("Authorization", "")
        if not token.startswith("Bearer "):
            return None

        token = token[7:].strip()
        user_id = sessions.get(token)
        if user_id is None:
            return None

        with connect_db() as db:
            return db.execute(
                "SELECT id, username FROM users WHERE id = ?",
                (user_id,)
            ).fetchone()

    def do_GET(self):
        path = urlparse(self.path).path

        if path == "/api/me":
            user = self.get_session_user()
            if not user:
                return self.send_json(401, {"error": "Sesión no válida."})

            return self.send_json(200, {
                "id": user["id"],
                "username": user["username"]
            })

        if path.startswith("/api/"):
            return self.send_json(404, {"error": "Ruta no encontrada."})

        if path == "/":
            self.path = "/index.html"

        return super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path
        data = self.read_json()

        if data is None:
            return self.send_json(400, {"error": "Solicitud inválida."})

        if path == "/api/register":
            return self.register(data)

        if path == "/api/login":
            return self.login(data)

        if path == "/api/logout":
            token = self.headers.get("Authorization", "")
            if token.startswith("Bearer "):
                sessions.pop(token[7:].strip(), None)
            return self.send_json(200, {"message": "Sesión cerrada."})

        return self.send_json(404, {"error": "Ruta no encontrada."})

    def register(self, data):
        username = str(data.get("username", "")).strip()
        password = data.get("password", "")

        if not isinstance(password, str):
            return self.send_json(400, {"error": "Contraseña inválida."})

        if not 3 <= len(username) <= 30:
            return self.send_json(400, {
                "error": "El usuario debe tener entre 3 y 30 caracteres."
            })

        if not all(
            char.isalnum() or char in "_.-" for char in username
        ):
            return self.send_json(400, {
                "error": "Usa letras, números, puntos, guiones o guiones bajos."
            })

        if len(password) < 8:
            return self.send_json(400, {
                "error": "La contraseña debe tener al menos 8 caracteres."
            })

        if len(password) > 256:
            return self.send_json(400, {
                "error": "La contraseña es demasiado larga."
            })

        password_hash, salt = hash_password(password)

        try:
            with connect_db() as db:
                cursor = db.execute("""
                    INSERT INTO users (username, password_hash, password_salt)
                    VALUES (?, ?, ?)
                """, (username, password_hash, salt))
                user_id = cursor.lastrowid

        except sqlite3.IntegrityError:
            return self.send_json(409, {
                "error": "Ese nombre de usuario ya está registrado."
            })

        return self.send_json(201, {
            "message": "Cuenta creada correctamente.",
            "id": user_id,
            "username": username
        })

    def login(self, data):
        username = str(data.get("username", "")).strip()
        password = data.get("password", "")

        if not isinstance(password, str) or not username:
            return self.send_json(400, {
                "error": "Introduce tu usuario y contraseña."
            })

        with connect_db() as db:
            user = db.execute("""
                SELECT id, username, password_hash, password_salt
                FROM users
                WHERE username = ? COLLATE NOCASE
            """, (username,)).fetchone()

        if not user:
            return self.send_json(401, {
                "error": "Usuario o contraseña incorrectos."
            })

        submitted_hash, _ = hash_password(
            password, user["password_salt"]
        )

        if not hmac.compare_digest(
            submitted_hash, user["password_hash"]
        ):
            return self.send_json(401, {
                "error": "Usuario o contraseña incorrectos."
            })

        token = secrets.token_urlsafe(32)
        sessions[token] = user["id"]

        return self.send_json(200, {
            "token": token,
            "username": user["username"],
            "id": user["id"]
        })


if __name__ == "__main__":
    initialize_db()

    print("MartialArts-Learning-Platform-ES")
    print(f"Carpeta del proyecto: {BASE_DIR}")
    print(f"Base de datos: {DB_PATH}")
    print(f"HTML encontrado: {(BASE_DIR / 'index.html').exists()}")
    print(f"CSS encontrado: {(BASE_DIR / 'styles.css').exists()}")
    print(f"JavaScript encontrado: {(BASE_DIR / 'app.js').exists()}")
    print(f"Aplicación disponible en http://localhost:{PORT}")
    print("Presiona Ctrl+C para detener el servidor.")

    server = ThreadingHTTPServer((HOST, PORT), AppHandler)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
    finally:
        server.server_close()
        sessions.clear()