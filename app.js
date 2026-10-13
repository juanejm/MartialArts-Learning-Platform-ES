/*Juan Esteban JM*/
"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const responseText = await response.text();
  let data = {};

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    data = { message: responseText };
  }

  if (!response.ok || data.ok === false) {
    throw new Error(
      data.error || data.message || `Error del servidor (${response.status}).`
    );
  }

  return data;
}

function setMessage(selector, message, color) {
  const element = $(selector);
  if (!element) return;

  element.textContent = message;

  if (color) element.style.color = color;
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function normalizeText(value) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("es");
}

function getDisciplines() {
  return Array.isArray(window.MAI_DISCIPLINES)
    ? window.MAI_DISCIPLINES
    : [];
}

function getDisciplineName(discipline) {
  if (typeof discipline === "string") {
    return discipline.trim();
  }

  return String(
    discipline?.name ||
    discipline?.nombre ||
    discipline?.title ||
    discipline?.label ||
    ""
  ).trim();
}

function findDiscipline(name) {
  const normalized = normalizeText(name);

  return getDisciplines().find(
    (discipline) =>
      normalizeText(getDisciplineName(discipline)) === normalized
  ) || null;
}

const views = {
  login: $("#login-view"),
  register: $("#register-view"),
  home: $("#home-view"),
  learning: $("#learning-view")
};

let currentView = "login";
let isGuest = false;

function showView(name) {
  if (!views[name]) return;

  currentView = name;

  Object.entries(views).forEach(([key, element]) => {
    if (element) {
      element.classList.toggle("active", key === name);
    }
  });

  document.body.classList.toggle("learning-mode", name === "learning");

  $$(".error").forEach((element) => {
    element.textContent = "";
  });

  if (name === "home") {
    displayReflection();
  }

  if (name === "learning") {
    showLearningSection("discipline-section");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$("[data-view]").forEach((element) => {
  element.addEventListener("click", (event) => {
    const destination = element.dataset.view;

    if (!views[destination]) return;

    event.preventDefault();
    showView(destination);
  });
});

function enterHome(username = "", guestMode = false) {
  isGuest = guestMode;

  if ($("#home-sub")) {
    $("#home-sub").textContent = guestMode
      ? "Estás explorando como invitado. Tu camino empieza aquí."
      : `Bienvenido, ${username}. Un paso a la vez. Cada práctica cuenta.`;
  }

  if ($("#logout")) {
    $("#logout").textContent = guestMode
      ? "Volver al inicio ↗"
      : "Cerrar sesión ↗";
  }

  showView("home");
}

function enterLearning() {
  if (views.learning) {
    showView("learning");
    return;
  }

  showView("home");

  setMessage(
    "#home-sub",
    "No se encontró el espacio de aprendizaje. Comprueba que index.html incluya learning-view."
  );
}

function guest() {
  enterHome("", true);
}

$("#guest-login")?.addEventListener("click", guest);
$("#guest-register")?.addEventListener("click", guest);

$("#show-pass")?.addEventListener("click", () => {
  const password = $("#login-pass");
  const button = $("#show-pass");

  if (!password || !button) return;

  password.type = password.type === "password" ? "text" : "password";
  button.textContent = password.type === "password" ? "Mostrar" : "Ocultar";
});

$("#login-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = $("#login-user")?.value.trim() || "";
  const password = $("#login-pass")?.value || "";

  if (!username || !password) {
    setMessage("#login-error", "Completa ambos campos.");
    return;
  }

  const button = $("#login-form button[type='submit']");

  if (button) button.disabled = true;

  setMessage("#login-error", "Verificando tus datos…");

  try {
    const result = await apiRequest("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });

    enterHome(result.username || result.user?.username || username);
  } catch (error) {
    setMessage(
      "#login-error",
      error.message.includes("Failed to fetch")
        ? "No se pudo conectar con el servidor. Comprueba que server.py esté ejecutándose."
        : error.message
    );
  } finally {
    if (button) button.disabled = false;
  }
});

$("#register-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = $("#reg-user")?.value.trim() || "";
  const password = $("#reg-pass")?.value || "";
  const confirmation = $("#reg-confirm")?.value || "";

  if (username.length < 3) {
    setMessage("#register-error", "El usuario debe tener al menos 3 caracteres.");
    return;
  }

  if (password.length < 8) {
    setMessage("#register-error", "La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  if (password !== confirmation) {
    setMessage("#register-error", "Las contraseñas no coinciden.");
    return;
  }

  const button = $("#register-form button[type='submit']");

  if (button) button.disabled = true;

  setMessage("#register-error", "Creando tu cuenta…");

  try {
    await apiRequest("/api/register", {
      method: "POST",
      body: JSON.stringify({ username, password })
    });

    if ($("#login-user")) $("#login-user").value = username;
    if ($("#login-pass")) $("#login-pass").value = "";

    showView("login");

    setMessage(
      "#login-error",
      "¡Cuenta creada correctamente! Ahora inicia sesión.",
      "#86c99a"
    );
  } catch (error) {
    setMessage(
      "#register-error",
      error.message.includes("Failed to fetch")
        ? "No se pudo conectar con el servidor. Comprueba que server.py esté ejecutándose."
        : error.message
    );
  } finally {
    if (button) button.disabled = false;
  }
});

$("#logout")?.addEventListener("click", async () => {
  if (!isGuest) {
    try {
      await apiRequest("/api/logout", {
        method: "POST",
        body: JSON.stringify({})
      });
    } catch (error) {
      console.warn("No se pudo confirmar el cierre de sesión:", error.message);
    }
  }

  isGuest = false;

  $("#login-form")?.reset();
  $("#register-form")?.reset();

  showView("login");
});

const reflections = [
  {
    category: "CONSTANCIA",
    text: "No necesitas entrenar perfectamente. Necesitas volver a entrenar."
  },
  {
    category: "SALUD",
    text: "Cuida tu cuerpo: es el compañero que te acompañará toda la vida."
  },
  {
    category: "DISCIPLINA",
    text: "La motivación inicia el camino; la constancia te ayuda a recorrerlo."
  },
  {
    category: "MOVIMIENTO",
    text: "Una caminata, unos estiramientos o una práctica breve también cuentan."
  },
  {
    category: "DESCANSO",
    text: "Recuperarse también forma parte del entrenamiento."
  },
  {
    category: "PROGRESO",
    text: "Compárate con quien eras ayer, no con quien lleva años practicando."
  },
  {
    category: "EQUILIBRIO",
    text: "La fuerza es más útil cuando está acompañada de control y responsabilidad."
  },
  {
    category: "BIENESTAR",
    text: "La hidratación, el sueño y una buena alimentación también son práctica."
  },
  {
    category: "APRENDIZAJE",
    text: "Cada error puede enseñarte algo si lo observas con paciencia."
  },
  {
    category: "RESPETO",
    text: "El verdadero progreso no consiste en vencer a todos, sino en dominarte mejor."
  }
];

let reflectionIndex = 0;

function displayReflection() {
  const item = reflections[reflectionIndex % reflections.length];

  if ($("#reflection-text")) {
    $("#reflection-text").textContent = item.text;
  }

  if ($("#reflection-category")) {
    $("#reflection-category").textContent = item.category;
  }

  if ($("#reflection-count")) {
    $("#reflection-count").textContent =
      `${String((reflectionIndex % reflections.length) + 1).padStart(2, "0")} / ${String(reflections.length).padStart(2, "0")}`;
  }
}

function nextReflection() {
  reflectionIndex = (reflectionIndex + 1) % reflections.length;

  const card = $(".reflection-card");

  if (!card) {
    displayReflection();
    return;
  }

  card.classList.add("changing");

  window.setTimeout(() => {
    displayReflection();
    card.classList.remove("changing");
  }, 180);
}

displayReflection();

window.setInterval(() => {
  if (currentView === "home") nextReflection();
}, 60000);

const HOLD_DURATION = 1400;

let holdTimer = null;
let holdStarted = 0;
let holdCompleted = false;

function updateHoldProgress(percent) {
  const progress = $("#hold-progress");

  if (progress) {
    progress.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }
}

function startHold(event) {
  if (event.type === "pointerdown" && event.button !== 0) return;
  if (holdTimer || holdCompleted) return;

  holdStarted = Date.now();
  updateHoldProgress(0);

  if ($("#hold-hint")) {
    $("#hold-hint").textContent = "Mantén presionado…";
  }

  function tick() {
    const elapsed = Date.now() - holdStarted;

    updateHoldProgress((elapsed / HOLD_DURATION) * 100);

    if (elapsed >= HOLD_DURATION) {
      holdCompleted = true;
      holdTimer = null;
      updateHoldProgress(100);

      if ($("#hold-hint")) {
        $("#hold-hint").textContent = "Accediendo al aprendizaje…";
      }

      window.setTimeout(() => {
        holdCompleted = false;
        updateHoldProgress(0);

        if ($("#hold-hint")) {
          $("#hold-hint").textContent =
            "Mantén presionado para entrar al dojo de aprendizaje.";
        }

        enterLearning();
      }, 180);
    } else {
      holdTimer = window.setTimeout(tick, 30);
    }
  }

  holdTimer = window.setTimeout(tick, 30);
}

function cancelHold() {
  if (holdTimer) {
    window.clearTimeout(holdTimer);
    holdTimer = null;
  }

  if (!holdCompleted) {
    updateHoldProgress(0);

    if ($("#hold-hint")) {
      $("#hold-hint").textContent =
        "Mantén presionado para entrar al dojo de aprendizaje.";
    }
  }
}

const holdButton = $("#discipline-launch");

if (holdButton) {
  holdButton.addEventListener("pointerdown", startHold);
  holdButton.addEventListener("pointerup", cancelHold);
  holdButton.addEventListener("pointerleave", cancelHold);
  holdButton.addEventListener("pointercancel", cancelHold);

  holdButton.addEventListener("keydown", (event) => {
    if (
      (event.key === " " || event.key === "Enter") &&
      !event.repeat
    ) {
      event.preventDefault();
      startHold(event);
    }
  });

  holdButton.addEventListener("keyup", (event) => {
    if (event.key === " " || event.key === "Enter") {
      cancelHold();
    }
  });

  holdButton.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}

const quizQuestions = [
  {
    question: "¿Qué te gustaría desarrollar principalmente?",
    hint: "Piensa en tu motivación más importante.",
    options: [
      { text: "Golpes de puño y defensa de pie", scores: { striking: 3, fitness: 1 } },
      { text: "Patadas, velocidad y coordinación", scores: { kicking: 3, striking: 1 } },
      { text: "Proyecciones, agarres y control", scores: { grappling: 3 } },
      { text: "Autodefensa y situaciones prácticas", scores: { selfdefense: 3 } },
      { text: "Equilibrio, calma y movimiento fluido", scores: { flow: 3, traditional: 1 } },
      { text: "Tradición, formas y cultura marcial", scores: { traditional: 3, weapons: 1 } }
    ]
  },
  {
    question: "¿Qué tipo de entrenamiento te atrae más?",
    hint: "No necesitas experiencia previa.",
    options: [
      { text: "Dinámico, intenso y cardiovascular", scores: { striking: 2, kicking: 2, fitness: 2 } },
      { text: "Técnico, con contacto y combate", scores: { striking: 2, grappling: 2 } },
      { text: "Controlado, estratégico y táctico", scores: { grappling: 2, selfdefense: 2 } },
      { text: "Fluido, preciso y consciente", scores: { flow: 2, traditional: 2 } },
      { text: "Con formas, rituales y fundamentos", scores: { traditional: 3 } }
    ]
  },
  {
    question: "¿Cómo te sientes respecto al contacto físico?",
    hint: "Puedes comenzar de manera gradual.",
    options: [
      { text: "Me interesa el combate de pie", scores: { striking: 3, kicking: 1 } },
      { text: "Me interesa luchar cuerpo a cuerpo", scores: { grappling: 3 } },
      { text: "Prefiero practicar sin combate fuerte", scores: { flow: 2, traditional: 2 } },
      { text: "Quiero aprender defensa personal", scores: { selfdefense: 3 } },
      { text: "Quiero probar distintas distancias", scores: { striking: 1, grappling: 1, selfdefense: 2 } }
    ]
  },
  {
    question: "¿Qué aspecto de la práctica valoras más?",
    hint: "Elige lo que te motive a largo plazo.",
    options: [
      { text: "Condición física y resistencia", scores: { fitness: 3, striking: 1 } },
      { text: "Técnica, precisión y coordinación", scores: { kicking: 2, striking: 1, traditional: 1 } },
      { text: "Estrategia y resolución de problemas", scores: { grappling: 2, fencing: 2 } },
      { text: "Autocontrol y serenidad", scores: { flow: 2, traditional: 2 } },
      { text: "Confianza y prevención de riesgos", scores: { selfdefense: 3 } }
    ]
  },
  {
    question: "¿Qué tradición te interesa explorar?",
    hint: "Puedes descubrir artes de distintas regiones.",
    options: [
      { text: "Japonesa: karate, judo, aikido, kendo…", scores: { japanese: 3, traditional: 1 } },
      { text: "Coreana: taekwondo, hapkido…", scores: { korean: 3, kicking: 1 } },
      { text: "China: kung fu, tai chi, sanda…", scores: { chinese: 3, traditional: 1 } },
      { text: "Tailandesa: muay thai…", scores: { striking: 2, thai: 3 } },
      { text: "Brasileña: jiu-jitsu brasileño, capoeira…", scores: { brazilian: 3, grappling: 1, flow: 1 } },
      { text: "Me interesa cualquier origen", scores: { general: 2, fitness: 1 } }
    ]
  },
  {
    question: "¿Cómo imaginas tu práctica ideal?",
    hint: "Elige una opción que encaje con tu estilo de vida.",
    options: [
      { text: "Entrenar en solitario y mejorar poco a poco", scores: { traditional: 2, flow: 1, fitness: 1 } },
      { text: "Aprender con compañeros y practicar combate", scores: { striking: 1, grappling: 2, fitness: 1 } },
      { text: "Prepararme para defenderme", scores: { selfdefense: 3 } },
      { text: "Participar en competiciones", scores: { striking: 1, kicking: 1, grappling: 1, fitness: 2 } },
      { text: "Estudiar técnicas, historia y filosofía", scores: { traditional: 3, flow: 1 } }
    ]
  }
];

let quizIndex = 0;
let quizAnswers = [];
let recommendedDiscipline = null;
let rankedRecommendations = [];
let quizCompleted = false;

function invalidateQuizResult() {
  quizCompleted = false;
  recommendedDiscipline = null;
  rankedRecommendations = [];

  populateDisciplineOptions("");

  const result = $("#quiz-result");

  if (result) {
    result.classList.add("hidden");
    result.setAttribute("hidden", "");
  }
}

function renderQuizQuestion() {
  const question = quizQuestions[quizIndex];
  const questionNode = $("#quiz-question");
  const optionsNode = $("#quiz-options");

  if (!question || !questionNode || !optionsNode) {
    console.warn("MAI: faltan elementos del cuestionario en index.html.");
    return;
  }

  $("#quiz-container")?.classList.remove("hidden");
  $("#quiz-container")?.removeAttribute("hidden");

  $("#quiz-result")?.classList.add("hidden");
  $("#quiz-result")?.setAttribute("hidden", "");

  questionNode.textContent = question.question;

  if ($("#quiz-hint")) {
    $("#quiz-hint").textContent = question.hint;
  }

  if ($("#quiz-step-label")) {
    $("#quiz-step-label").textContent =
      `PREGUNTA ${quizIndex + 1} DE ${quizQuestions.length}`;
  }

  if ($("#quiz-progress-bar")) {
    $("#quiz-progress-bar").style.width =
      `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
  }

  if ($("#quiz-back")) {
    $("#quiz-back").disabled = quizIndex === 0;
  }

  optionsNode.innerHTML = question.options.map((option, index) => `
    <button
      type="button"
      class="quiz-option ${quizAnswers[quizIndex] === index ? "selected" : ""}"
      data-option="${index}"
      aria-pressed="${quizAnswers[quizIndex] === index}">
      <span class="quiz-option-mark">
        ${quizAnswers[quizIndex] === index ? "●" : "○"}
      </span>
      <span>${escapeHTML(option.text)}</span>
    </button>
  `).join("");

  optionsNode.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedIndex = Number(button.dataset.option);
      const answerChanged = quizAnswers[quizIndex] !== selectedIndex;

      quizAnswers[quizIndex] = selectedIndex;

      if (answerChanged && quizCompleted) {
        invalidateQuizResult();
      }

      renderQuizQuestion();
    });
  });

  const nextButton = $("#quiz-next");

  if (nextButton) {
    nextButton.disabled = quizAnswers[quizIndex] === undefined;
    nextButton.textContent =
      quizIndex === quizQuestions.length - 1
        ? "Ver recomendación →"
        : "Siguiente →";
  }

  if ($("#quiz-error")) {
    $("#quiz-error").textContent = "";
  }
}

function normalizeRecommendation(item) {
  if (!item) return null;

  let candidate =
    item.discipline ||
    item.martialArt ||
    item.art ||
    item.item ||
    item;

  if (typeof candidate === "string") {
    candidate = findDiscipline(candidate) || { name: candidate };
  }

  if (!candidate || !getDisciplineName(candidate)) {
    return null;
  }

  if (candidate === item) {
    return candidate;
  }

  return {
    ...candidate,
    compatibility:
      typeof item.compatibility === "number"
        ? item.compatibility
        : candidate.compatibility,
    score:
      typeof item.score === "number"
        ? item.score
        : candidate.score
  };
}

function calculateRecommendation() {
  if (
    !window.MAIEngine ||
    typeof window.MAIEngine.recommend !== "function"
  ) {
    console.error(
      "MAI: falta discipline-engine.js o no se ha cargado MAIEngine."
    );

    setMessage(
      "#quiz-hint",
      "No se ha cargado el motor de recomendaciones. Comprueba los scripts de index.html."
    );

    return [];
  }

  try {
    const ranked = window.MAIEngine.recommend(
      quizQuestions,
      quizAnswers
    );

    if (!Array.isArray(ranked)) return [];

    return ranked
      .map(normalizeRecommendation)
      .filter(Boolean);
  } catch (error) {
    console.error("MAI: error al calcular la recomendación:", error);

    setMessage(
      "#quiz-hint",
      "No se pudo calcular la recomendación. Comprueba el formato del motor de disciplinas."
    );

    return [];
  }
}

function getRecommendationCompatibility(item) {
  if (typeof item?.compatibility === "number") {
    return `${Math.round(item.compatibility)} %`;
  }

  return "";
}

function populateDisciplineOptions(selectedName = "") {
  const select = $("#plan-discipline");
  if (!select) return;

  const recommendations = rankedRecommendations.slice(0, 6);
  const previousValue = selectedName || select.value;

  select.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";

  if (!quizCompleted || !recommendations.length) {
    placeholder.textContent = "Completa el cuestionario primero";
    placeholder.disabled = true;
    placeholder.selected = true;

    select.appendChild(placeholder);
    select.disabled = true;
    return;
  }

  placeholder.textContent = "Selecciona una disciplina recomendada";
  select.appendChild(placeholder);

  recommendations.forEach((item) => {
    const name = getDisciplineName(item);
    if (!name) return;

    const option = document.createElement("option");
    option.value = name;

    const compatibility = getRecommendationCompatibility(item);

    option.textContent = compatibility
      ? `${name} · ${compatibility} de compatibilidad`
      : name;

    select.appendChild(option);
  });

  select.disabled = recommendations.length === 0;

  const matchingOption = [...select.options].find(
    (option) =>
      option.value &&
      normalizeText(option.value) === normalizeText(previousValue)
  );

  select.value = matchingOption ? matchingOption.value : "";
}

function showPlanTestRequired() {
  const output = getTrainingOutput();

  if (!output) return;

  output.innerHTML = `
    <div class="empty-state">
      <span>✦</span>
      <h4>Primero descubramos tu perfil marcial</h4>
      <p>
        Completa el cuestionario para que MAI pueda recomendarte
        disciplinas compatibles contigo. Después podrás generar
        un plan personalizado.
      </p>
      <button type="button" class="primary" id="go-to-quiz">
        Completar cuestionario →
      </button>
    </div>
  `;

  $("#go-to-quiz")?.addEventListener("click", goToQuiz);
}

function goToQuiz() {
  showLearningSection("discipline-section");

  $("#quiz-container")?.classList.remove("hidden");
  $("#quiz-container")?.removeAttribute("hidden");

  $("#quiz-container")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function finishQuiz() {
  const allAnswered =
    quizAnswers.length === quizQuestions.length &&
    quizAnswers.every((answer, index) =>
      Number.isInteger(answer) &&
      answer >= 0 &&
      answer < quizQuestions[index].options.length
    );

  if (!allAnswered) {
    setMessage(
      "#quiz-hint",
      "Responde todas las preguntas antes de consultar tus recomendaciones."
    );
    return;
  }

  const ranked = calculateRecommendation();

  if (!ranked.length) {
    quizCompleted = false;
    rankedRecommendations = [];
    recommendedDiscipline = null;

    populateDisciplineOptions("");

    setMessage(
      "#quiz-hint",
      "No se obtuvieron recomendaciones. Revisa que martial-arts-data.js y discipline-engine.js estén cargados en el orden correcto."
    );
    return;
  }

  rankedRecommendations = ranked;
  recommendedDiscipline = rankedRecommendations[0];
  quizCompleted = true;

  populateDisciplineOptions(
    getDisciplineName(recommendedDiscipline)
  );

  $("#quiz-container")?.classList.add("hidden");
  $("#quiz-container")?.setAttribute("hidden", "");

  $("#quiz-result")?.classList.remove("hidden");
  $("#quiz-result")?.removeAttribute("hidden");

  if ($("#result-title")) {
    $("#result-title").textContent =
      getDisciplineName(recommendedDiscipline);
  }

  if ($("#result-description")) {
    const origin =
      recommendedDiscipline.origin ||
      recommendedDiscipline.country ||
      "Origen por investigar";

    const period =
      recommendedDiscipline.period ||
      "Periodo sin clasificar";

    const focus =
      recommendedDiscipline.focus ||
      recommendedDiscipline.description ||
      "Información pendiente de ampliar.";

    const compatibility =
      getRecommendationCompatibility(recommendedDiscipline);

    $("#result-description").textContent =
      `${focus} Origen: ${origin}. Periodo: ${period}.` +
      (compatibility
        ? ` Compatibilidad relativa: ${compatibility}.`
        : "");
  }

  if ($("#result-tags")) {
    const tags = Array.isArray(recommendedDiscipline.tags)
      ? recommendedDiscipline.tags
      : [];

    $("#result-tags").innerHTML = tags
      .slice(0, 5)
      .map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`)
      .join("");
  }

  const alternatives = $("#result-alternatives");

  if (alternatives) {
    alternatives.innerHTML = rankedRecommendations
      .slice(1, 6)
      .map((item) => {
        const name = getDisciplineName(item);
        const compatibility = getRecommendationCompatibility(item);

        return `
          <div class="alternative-item">
            <strong>${escapeHTML(name)}</strong>
            <span>
              ${escapeHTML(
                item.description ||
                item.focus ||
                "Disciplina recomendada según tus respuestas."
              )}
            </span>
            ${compatibility
              ? `<span class="tag">${escapeHTML(compatibility)} de compatibilidad</span>`
              : ""}
            <button
              type="button"
              data-choose-discipline="${escapeHTML(name)}">
              Elegir esta disciplina
            </button>
          </div>
        `;
      })
      .join("");

    alternatives
      .querySelectorAll("[data-choose-discipline]")
      .forEach((button) => {
        button.addEventListener("click", () => {
          const chosen = rankedRecommendations.find(
            (item) =>
              normalizeText(getDisciplineName(item)) ===
              normalizeText(button.dataset.chooseDiscipline)
          );

          if (!chosen) return;

          recommendedDiscipline = chosen;
          applyRecommendation();
        });
      });
  }

  const resultButton = $(
    "#apply-recommendation, #use-recommendation, #start-recommended-plan"
  );

  if (resultButton) {
    resultButton.disabled = false;
    resultButton.textContent =
      "Crear mi plan con esta disciplina →";
  }
}

function applyRecommendation() {
  if (!quizCompleted || !rankedRecommendations.length) {
    showPlanTestRequired();
    goToQuiz();
    return;
  }

  const chosenName = getDisciplineName(recommendedDiscipline);

  if (!chosenName) {
    showTrainingError(
      "No se ha podido identificar la disciplina recomendada."
    );
    return;
  }

  populateDisciplineOptions(chosenName);

  const select = $("#plan-discipline");

  if (select) {
    const validChoice = [...select.options].some(
      (option) =>
        normalizeText(option.value) === normalizeText(chosenName)
    );

    if (!validChoice) {
      showTrainingError(
        "La disciplina elegida ya no está entre las recomendaciones disponibles. Vuelve a completar el cuestionario."
      );
      return;
    }

    select.value = chosenName;
  }

  showLearningSection("plan-section");

  if (select) {
    select.value = chosenName;
  }

  if ($("#plan-output") || $("#training-output")) {
    generatePlan();
  }
}

$("#quiz-next")?.addEventListener("click", (event) => {
  event.preventDefault();

  if (quizAnswers[quizIndex] === undefined) {
    setMessage(
      "#quiz-hint",
      "Selecciona una respuesta para continuar."
    );
    return;
  }

  if (quizIndex < quizQuestions.length - 1) {
    quizIndex += 1;
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
});

$("#quiz-back")?.addEventListener("click", (event) => {
  event.preventDefault();

  if (quizIndex > 0) {
    quizIndex -= 1;
    renderQuizQuestion();
  }
});

$("#apply-recommendation")?.addEventListener(
  "click",
  applyRecommendation
);

$("#use-recommendation")?.addEventListener(
  "click",
  applyRecommendation
);

$("#start-recommended-plan")?.addEventListener(
  "click",
  applyRecommendation
);

$$("[id='quiz-restart'], [id='quiz-retry']").forEach((button) => {
  button.addEventListener("click", () => {
    quizIndex = 0;
    quizAnswers = [];
    recommendedDiscipline = null;
    rankedRecommendations = [];
    quizCompleted = false;

    currentTrainingOptions = null;
    currentTrainingResult = null;
    currentTrainingVariant = 0;

    populateDisciplineOptions("");
    renderQuizQuestion();
    goToQuiz();
  });
});

function showLearningSection(sectionId) {
  if (sectionId === "plan-section" && !quizCompleted) {
    if ($("#discipline-section")) {
      showLearningSection("discipline-section");
    }

    showPlanTestRequired();

    window.setTimeout(() => {
      $("#quiz-container")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 50);

    return;
  }

  const sections = $$(".learning-section");
  const links = $$(".side-link");

  const target = sections.find(
    (section) => section.id === sectionId
  );

  if (!target) {
    console.warn(`MAI: no se encontró la sección "${sectionId}".`);
    return;
  }

  sections.forEach((section) => {
    const isActive = section.id === sectionId;

    section.classList.toggle("active", isActive);

    if (isActive) {
      section.removeAttribute("hidden");
    } else {
      section.setAttribute("hidden", "");
    }
  });

  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.dataset.section === sectionId
    );
  });

  if (sectionId === "plan-section") {
    populateDisciplineOptions(
      $("#plan-discipline")?.value ||
      getDisciplineName(recommendedDiscipline)
    );
  }
}

$$(".side-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!link.dataset.section) return;

    event.preventDefault();
    showLearningSection(link.dataset.section);
  });
});

$("#sidebar-toggle")?.addEventListener("click", () => {
  const sidebar = $("#learning-sidebar");
  const button = $("#sidebar-toggle");

  sidebar?.classList.toggle("collapsed");
  $(".learning-layout")?.classList.toggle("sidebar-collapsed");

  if (button) {
    button.setAttribute(
      "aria-expanded",
      String(!sidebar?.classList.contains("collapsed"))
    );
  }
});

$("#learning-home")?.addEventListener("click", () => {
  showView("home");
});

let currentTrainingOptions = null;
let currentTrainingResult = null;
let currentTrainingVariant = 0;

const trainingLabels = {
  basic: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
  technique: "Técnica",
  fitness: "Condición física",
  mobility: "Movilidad y coordinación",
  discipline: "Constancia y disciplina",
  none: "Sin material",
  basicEquipment: "Material básico",
  bag: "Saco o equipo específico"
};

function getTrainingEngine() {
  return window.MAITrainingEngine || null;
}

function normalizeTrainingLevel(value) {
  const map = {
    basico: "basic",
    "básico": "basic",
    basic: "basic",
    intermedio: "intermediate",
    intermediate: "intermediate",
    avanzado: "advanced",
    advanced: "advanced"
  };

  return map[normalizeText(value)] || value || "basic";
}

function normalizeTrainingGoal(value) {
  const map = {
    tecnica: "technique",
    "técnica": "technique",
    technique: "technique",
    condicion: "fitness",
    "condición": "fitness",
    fitness: "fitness",
    movilidad: "mobility",
    mobility: "mobility",
    disciplina: "discipline",
    discipline: "discipline"
  };

  return map[normalizeText(value)] || value || "technique";
}

function ensureTrainingControls() {
  const disciplineSelect = $("#plan-discipline");
  if (!disciplineSelect) return;

  let container = $(".plan-controls");

  if (!container) {
    container = disciplineSelect.parentElement;
  }

  if (!container) return;

  function createSelectField(id, labelText, options) {
    if ($(`#${id}`)) return;

    const field = document.createElement("div");
    field.className = "plan-field";

    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelText;

    const select = document.createElement("select");
    select.id = id;
    select.name = id;

    options.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.label;

      if (item.selected) option.selected = true;

      select.appendChild(option);
    });

    field.append(label, select);
    container.appendChild(field);
  }

  createSelectField("plan-duration", "Duración por sesión", [
    { value: "20", label: "20 minutos" },
    { value: "30", label: "30 minutos" },
    { value: "45", label: "45 minutos", selected: true },
    { value: "60", label: "60 minutos" },
    { value: "75", label: "75 minutos" },
    { value: "90", label: "90 minutos" }
  ]);

  createSelectField("plan-equipment", "Equipamiento", [
    { value: "none", label: "Sin material" },
    { value: "basic", label: "Material básico" },
    { value: "bag", label: "Saco o equipo específico" }
  ]);

  if (!$("#generate-variant")) {
    const button = document.createElement("button");
    button.type = "button";
    button.id = "generate-variant";
    button.className = "secondary";
    button.textContent = "Generar otra variante";
    button.disabled = true;

    const generateButton = $("#generate-plan");

    if (generateButton?.parentElement) {
      generateButton.parentElement.appendChild(button);
    } else {
      container.appendChild(button);
    }
  }
}

function getTrainingOutput() {
  return $("#training-output") || $("#plan-output");
}

function readTrainingOptions() {
  const discipline = $("#plan-discipline")?.value?.trim() || "";
  const level = normalizeTrainingLevel(
    $("#plan-level")?.value || "basic"
  );
  const days = Number($("#plan-days")?.value || 3);
  const duration = Number($("#plan-duration")?.value || 45);
  const goal = normalizeTrainingGoal(
    $("#plan-goal")?.value || "technique"
  );
  const equipment = $("#plan-equipment")?.value || "none";

  return {
    discipline,
    level,
    days: Math.max(2, Math.min(5, days)),
    duration: Math.max(20, Math.min(90, duration)),
    goal,
    equipment,
    variant: currentTrainingVariant
  };
}

function setTrainingBusy(isBusy) {
  const generateButton = $("#generate-plan");
  const variantButton = $("#generate-variant");
  const output = getTrainingOutput();

  if (generateButton) {
    generateButton.disabled = isBusy;
    generateButton.textContent = isBusy
      ? "Preparando entrenamiento…"
      : "✳ Generar mi plan";
  }

  if (variantButton) {
    variantButton.disabled =
      isBusy || !currentTrainingResult?.success;
  }

  if (output) {
    output.setAttribute("aria-busy", String(isBusy));
  }
}

function showTrainingError(message) {
  const output = getTrainingOutput();
  if (!output) return;

  output.innerHTML = `
    <div class="empty-state">
      <span>!</span>
      <h4>No se pudo generar el plan</h4>
      <p>${escapeHTML(message)}</p>
      <p>
        Comprueba que training-engine.js esté cargado y que la disciplina
        seleccionada sea una de las recomendaciones del cuestionario.
      </p>
    </div>
  `;
}

function renderExercise(exercise) {
  const name =
    exercise?.name ||
    exercise?.title ||
    exercise?.exercise ||
    "Ejercicio";

  const instructions =
    exercise?.instructions ||
    exercise?.description ||
    exercise?.details ||
    "";

  const purpose =
    exercise?.purpose ||
    exercise?.objective ||
    "";

  return `
    <article class="exercise-item">
      <h5>${escapeHTML(name)}</h5>
      ${instructions ? `<p>${escapeHTML(instructions)}</p>` : ""}
      ${purpose
        ? `<p class="exercise-purpose"><strong>Propósito:</strong> ${escapeHTML(purpose)}</p>`
        : ""}
    </article>
  `;
}

function renderTrainingBlock(block) {
  const exercises = Array.isArray(block?.exercises)
    ? block.exercises
    : [];

  const minutes = Number(block?.minutes);

  return `
    <div class="training-block">
      <div class="training-block-heading">
        <h5>${escapeHTML(block?.title || "Bloque de práctica")}</h5>
        ${Number.isFinite(minutes) && minutes > 0
          ? `<span class="tag">${minutes} min</span>`
          : ""}
      </div>

      ${block?.note
        ? `<p class="training-block-note">${escapeHTML(block.note)}</p>`
        : ""}

      <div class="exercise-list">
        ${exercises.length
          ? exercises.map(renderExercise).join("")
          : "<p>Consulta este bloque con un instructor cualificado.</p>"}
      </div>
    </div>
  `;
}

function renderTrainingSession(session, weekNumber, sessionIndex) {
  const blocks = Array.isArray(session?.blocks)
    ? session.blocks
    : [];

  const duration = Number(session?.duration);
  const focus = session?.focus || "Práctica general";
  const effort = session?.effort || "";

  return `
    <details class="session-card training-session" ${sessionIndex === 0 ? "open" : ""}>
      <summary>
        <span>
          Día ${escapeHTML(session?.day ?? sessionIndex + 1)}:
          ${escapeHTML(focus)}
        </span>
        <span>
          ${Number.isFinite(duration) && duration > 0
            ? `${duration} min`
            : "Sesión"}
        </span>
      </summary>

      <div class="session-body">
        ${effort
          ? `<p class="session-effort"><strong>Intensidad orientativa:</strong> ${escapeHTML(effort)}</p>`
          : ""}

        <div class="training-block-list">
          ${blocks.map(renderTrainingBlock).join("")}
        </div>
  `;
}

function renderTrainingWeek(week, index) {
  const weekNumber = Number(week?.week) || index + 1;
  const progression = week?.progression || {};
  const sessions = Array.isArray(week?.sessions)
    ? week.sessions
    : [];

  return `
    <section class="training-week">
      <div class="training-week-heading">
        <span class="eyebrow">SEMANA ${String(weekNumber).padStart(2, "0")}</span>
        <h4>${escapeHTML(progression.name || `Semana ${weekNumber}`)}</h4>
      </div>

      ${progression.guidance
        ? `<p>${escapeHTML(progression.guidance)}</p>`
        : ""}

      ${progression.progression
        ? `<p class="progression-detail">${escapeHTML(progression.progression)}</p>`
        : ""}

      <div class="session-list">
        ${sessions.length
          ? sessions.map((session, sessionIndex) =>
              renderTrainingSession(session, weekNumber, sessionIndex)
            ).join("")
          : "<p>No hay sesiones disponibles para esta semana.</p>"}
      </div>
    </section>
  `;
}

function renderTrainingPlan(result) {
  const output = getTrainingOutput();
  if (!output) return;

  if (!result || result.success === false || !result.plan) {
    const messages = [
      ...(Array.isArray(result?.errors) ? result.errors : []),
      ...(Array.isArray(result?.warnings) ? result.warnings : [])
    ];

    showTrainingError(
      messages.length
        ? messages.join(" ")
        : "El motor no devolvió un plan válido."
    );

    return;
  }

  const plan = result.plan;
  const weeks = Array.isArray(plan.weeks) ? plan.weeks : [];

  const discipline = plan.discipline || "Entrenamiento marcial";
  const level = trainingLabels[plan.level] || plan.level || "No especificado";
  const frequency = Number(plan.frequency || plan.daysPerWeek || 0);
  const duration = Number(plan.durationPerSession || plan.duration || 0);
  const goal = trainingLabels[plan.goal] || plan.goal || "";

  const equipment = plan.equipment === "basic"
    ? trainingLabels.basicEquipment
    : trainingLabels[plan.equipment] || plan.equipment || "";

  const profile = plan.disciplineProfile || {};
  const warnings = Array.isArray(result.warnings) ? result.warnings : [];

  const safety = Array.isArray(plan.safety)
    ? plan.safety
    : plan.safety
      ? [plan.safety]
      : [];

  output.innerHTML = `
    <div class="content-panel training-plan-panel">
      <div class="plan-title-row">
        <div>
          <span class="eyebrow">— TU PLAN PERSONALIZADO</span>
          <h3>${escapeHTML(discipline)}</h3>
          <p>
            ${escapeHTML(level)}
            ${frequency ? ` · ${frequency} días por semana` : ""}
            ${duration ? ` · ${duration} minutos por sesión` : ""}
          </p>
        </div>

        <span class="tag">4 semanas</span>
      </div>

      <div class="training-plan-meta">
        ${goal ? `
          <div>
            <strong>Objetivo</strong>
            <span>${escapeHTML(goal)}</span>
          </div>
        ` : ""}

        ${equipment ? `
          <div>
            <strong>Equipamiento</strong>
            <span>${escapeHTML(equipment)}</span>
          </div>
        ` : ""}

        ${profile.label ? `
          <div>
            <strong>Perfil marcial</strong>
            <span>${escapeHTML(profile.label)}</span>
          </div>
        ` : ""}
      </div>

      ${profile.focus
        ? `<p class="discipline-focus">${escapeHTML(profile.focus)}</p>`
        : ""}

      ${warnings.length
        ? `<div class="safety-note"><strong>Consideraciones</strong><ul>${warnings.map((warning) => `<li>${escapeHTML(warning)}</li>`).join("")}</ul></div>`
        : ""}

      ${weeks.length
        ? weeks.map(renderTrainingWeek).join("")
        : "<p>El motor no devolvió las cuatro semanas del plan.</p>"}

      ${safety.length
        ? `<div class="safety-note"><strong>Seguridad</strong><ul>${safety.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></div>`
        : ""}
 `;

  if ($("#generate-variant")) {
    $("#generate-variant").disabled = false;
  }
}

function validateTrainingOptions(options) {
  if (!quizCompleted) {
    return "Completa primero el cuestionario para recibir tus disciplinas recomendadas.";
  }

  if (!options.discipline) {
    return "Selecciona una de las disciplinas recomendadas.";
  }

  const allowedRecommendations = rankedRecommendations
    .slice(0, 6)
    .map(getDisciplineName)
    .map(normalizeText);

  if (!allowedRecommendations.includes(normalizeText(options.discipline))) {
    return "La disciplina seleccionada no forma parte de tus recomendaciones actuales. Vuelve a elegir una del selector.";
  }

  if (![2, 3, 4, 5].includes(options.days)) {
    return "Selecciona entre 2 y 5 días de entrenamiento por semana.";
  }

  if (![20, 30, 45, 60, 75, 90].includes(options.duration)) {
    return "Selecciona una duración válida para cada sesión.";
  }

  if (!["basic", "intermediate", "advanced"].includes(options.level)) {
    return "Selecciona un nivel de experiencia válido.";
  }

  if (!["technique", "fitness", "mobility", "discipline"].includes(options.goal)) {
    return "Selecciona un objetivo válido.";
  }

  if (!["none", "basic", "bag"].includes(options.equipment)) {
    return "Selecciona un tipo de equipamiento válido.";
  }

  return "";
}

function generatePlan(event) {
  if (event?.preventDefault) event.preventDefault();

  const output = getTrainingOutput();
  if (!output) return;

  if (!quizCompleted) {
    showPlanTestRequired();
    goToQuiz();
    return;
  }

  const engine = getTrainingEngine();

  if (!engine || typeof engine.generatePlan !== "function") {
    showTrainingError(
      "No se encontró window.MAITrainingEngine.generatePlan(). Comprueba que training-engine.js se cargue antes de app.js."
    );
    return;
  }

  const options = readTrainingOptions();
  const validationMessage = validateTrainingOptions(options);

  if (validationMessage) {
    showTrainingError(validationMessage);
    return;
  }

  currentTrainingOptions = { ...options };
  currentTrainingVariant = 0;

  setTrainingBusy(true);

  try {
    const result = engine.generatePlan({
      ...options,
      variant: currentTrainingVariant
    });

    currentTrainingResult = result;

    if (result?.plan?.variant !== undefined) {
      currentTrainingVariant = Number(result.plan.variant) || 0;
    }

    renderTrainingPlan(result);
  } catch (error) {
    console.error("MAI: error generando el entrenamiento:", error);

    currentTrainingResult = null;

    showTrainingError(
      error.message || "Se produjo un error al generar el entrenamiento."
    );
  } finally {
    setTrainingBusy(false);
  }
}

function generatePlanVariant(event) {
  if (event?.preventDefault) event.preventDefault();

  const engine = getTrainingEngine();
  const output = getTrainingOutput();

  if (!output) return;

  if (!engine || typeof engine.generateVariant !== "function") {
    showTrainingError(
      "El motor no dispone de generateVariant(). Comprueba que training-engine.js incluya la función de variantes."
    );
    return;
  }

  if (!currentTrainingResult?.success || !currentTrainingOptions) {
    showTrainingError(
      "Primero genera un plan de entrenamiento. Después podrás crear otra variante."
    );
    return;
  }

  const latestOptions = readTrainingOptions();
  const validationMessage = validateTrainingOptions(latestOptions);

  if (validationMessage) {
    showTrainingError(validationMessage);
    return;
  }

  currentTrainingOptions = { ...latestOptions };
  setTrainingBusy(true);

  try {
    const result = engine.generateVariant({
      ...currentTrainingOptions,
      variant: currentTrainingVariant + 1
    });

    currentTrainingResult = result;

    if (result?.plan?.variant !== undefined) {
      currentTrainingVariant = Number(result.plan.variant) || 0;
    } else {
      currentTrainingVariant += 1;
    }

    renderTrainingPlan(result);
  } catch (error) {
    console.error("MAI: error generando la variante:", error);

    showTrainingError(
      error.message || "No se pudo generar otra variante del plan."
    );
  } finally {
    setTrainingBusy(false);
  }
}

const trainingForm = $("#training-form");
const generateButton = $("#generate-plan");

if (trainingForm) {
  trainingForm.addEventListener("submit", generatePlan);
}

if (
  generateButton &&
  (
    !trainingForm ||
    !trainingForm.contains(generateButton) ||
    generateButton.type !== "submit"
  )
) {
  generateButton.addEventListener("click", generatePlan);
}

$("#generate-variant")?.addEventListener(
  "click",
  generatePlanVariant
);

[
  "#plan-discipline",
  "#plan-level",
  "#plan-days",
  "#plan-duration",
  "#plan-goal",
  "#plan-equipment"
].forEach((selector) => {
  $(selector)?.addEventListener("change", () => {
    currentTrainingOptions = readTrainingOptions();
  });
});

$("#spotify-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = $("#spotify-url");
  const player = $("#spotify-player");

  if (!input || !player) return;

  try {
    const url = new URL(input.value.trim());

    const validHosts = [
      "open.spotify.com",
      "spotify.com",
      "www.spotify.com"
    ];

    if (!validHosts.includes(url.hostname)) {
      throw new Error("Introduce un enlace válido de Spotify.");
    }

    const parts = url.pathname.split("/").filter(Boolean);
    const type = parts[0];
    const id = parts[1];

    const allowed = ["track", "album", "playlist", "episode", "show"];

    if (!allowed.includes(type) || !id || !/^[a-zA-Z0-9]+$/.test(id)) {
      throw new Error(
        "Usa un enlace a una canción, álbum, lista o episodio de Spotify."
      );
    }

    player.innerHTML = `
      <iframe
        title="Reproductor de Spotify"
        src="https://open.spotify.com/embed/${type}/${id}"
        width="100%"
        height="152"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy">
      </iframe>
    `;
  } catch (error) {
    player.innerHTML = `
      <p class="error">${escapeHTML(
        error.message || "No se pudo cargar el enlace."
      )}</p>
    `;
  }
});

const techniqueGuides = [
  {
    keywords: ["guardia", "postura", "base de combate", "posicion de combate", "stance"],
    title: "Guardia y postura básica",
    category: "Fundamentos",
    level: "Principiante",
    steps: [
      "Adopta una postura estable y cómoda, con las rodillas ligeramente flexionadas.",
      "Mantén la cabeza alineada, la mirada al frente y los hombros relajados.",
      "Distribuye el peso para poder desplazarte sin perder el equilibrio.",
      "Practica avanzar, retroceder y moverte lateralmente sin cruzar los pies.",
      "Comienza despacio y solicita a un instructor que revise tu postura."
    ]
  },
  {
    keywords: ["jab", "cross", "directo", "golpe de puño", "boxeo", "puñetazo", "uppercut", "gancho", "hook"],
    title: "Fundamentos de los golpes de puño",
    category: "Golpeo",
    level: "Principiante",
    steps: [
      "Adopta una guardia cómoda y mantén una distancia segura.",
      "Practica lentamente el movimiento sin aplicar fuerza máxima.",
      "Mantén la muñeca alineada con el antebrazo y evita bloquear bruscamente el codo.",
      "Recupera la guardia después de cada repetición.",
      "Utiliza equipo apropiado y supervisión antes de golpear sacos intensamente o practicar con otra persona."
    ]
  },
  {
    keywords: ["patada", "low kick", "high kick", "roundhouse", "dollyo chagi", "mawashi geri", "taekwondo", "patada circular"],
    title: "Fundamentos de las patadas",
    category: "Golpeo",
    level: "Principiante",
    steps: [
      "Empieza con una postura estable y una distancia suficiente.",
      "Practica elevar la rodilla lentamente y conservar el equilibrio.",
      "Desarrolla la movilidad de forma progresiva, sin forzar las articulaciones.",
      "Practica la recuperación de la pierna y el regreso a la postura inicial.",
      "Aprende la mecánica específica de cada patada con un instructor y no practiques impactos fuertes sin equipo adecuado."
    ]
  },
  {
    keywords: ["judo", "ukemi", "caida", "caidas", "breakfall", "rodada", "proyeccion"],
    title: "Introducción a las caídas y proyecciones",
    category: "Grappling",
    level: "Requiere supervisión",
    steps: [
      "Estudia primero las reglas de seguridad y las condiciones del tatami.",
      "Empieza con ejercicios de equilibrio y conciencia corporal desde posiciones bajas.",
      "No practiques caídas desde altura ni sobre superficies duras.",
      "Aprende a proteger la cabeza y el cuello con supervisión presencial.",
      "No intentes proyecciones con compañeros sin preparación, colchonetas y supervisión cualificada."
    ]
  },
  {
    keywords: ["armbar", "llave de brazo", "juji gatame", "kimura", "americana", "llave articular"],
    title: "Introducción a las llaves articulares",
    category: "Grappling",
    level: "Requiere supervisión",
    steps: [
      "Identifica la disciplina, el nombre técnico y la finalidad de la llave.",
      "Estudia su contexto deportivo y las reglas de seguridad correspondientes.",
      "Aprende con un instructor cualificado y un compañero que conozca las señales de rendición.",
      "No apliques fuerza ni presión sobre articulaciones ajenas para experimentar.",
      "Detén la práctica inmediatamente ante una señal de rendición, dolor o incomodidad."
    ]
  },
  {
    keywords: ["estrangulacion", "choke", "rear naked choke", "hadaka jime", "guillotina"],
    title: "Seguridad y estudio de las técnicas de estrangulación",
    category: "Grappling",
    level: "Requiere supervisión",
    steps: [
      "Investiga las reglas y restricciones de la disciplina correspondiente.",
      "Comprende que estas técnicas pueden causar lesiones graves o pérdida del conocimiento.",
      "No practiques compresiones del cuello por tu cuenta ni con personas sin supervisión cualificada.",
      "Estudia primero las posiciones, la terminología y los protocolos de seguridad.",
      "En caso de pérdida del conocimiento o dificultad respiratoria, suspende la actividad y solicita asistencia médica urgente."
    ]
  },
  {
    keywords: ["kata", "poomsae", "hyung", "taolu", "formas marciales", "secuencia tecnica"],
    title: "Estudio de formas marciales",
    category: "Formas y tradición",
    level: "Principiante",
    steps: [
      "Identifica el nombre de la forma, su estilo y la escuela a la que pertenece.",
      "Divide la secuencia en segmentos cortos para facilitar el aprendizaje.",
      "Practica lentamente las posiciones, transiciones y direcciones.",
      "Investiga el significado técnico e histórico de los movimientos sin asumir que todas las escuelas interpretan igual la forma.",
      "Compara tus movimientos con fuentes fiables y recibe correcciones de un instructor."
    ]
  },
  {
    keywords: ["desplazamiento", "footwork", "juego de pies", "pasos", "movilidad marcial"],
    title: "Desplazamientos y juego de pies",
    category: "Movimiento",
    level: "Principiante",
    steps: [
      "Adopta una posición equilibrada antes de empezar.",
      "Practica pasos cortos hacia delante, atrás y los lados.",
      "Evita cruzar los pies cuando el ejercicio requiera conservar una base estable.",
      "Coordina el movimiento de los pies con la orientación del tronco.",
      "Aumenta la velocidad solo cuando mantengas el control del equilibrio."
    ]
  },
  {
    keywords: ["estiramiento", "movilidad", "flexibilidad", "calentamiento", "rango articular"],
    title: "Movilidad y preparación física",
    category: "Preparación física",
    level: "Principiante",
    steps: [
      "Comienza con varios minutos de actividad suave para elevar progresivamente la temperatura corporal.",
      "Moviliza las articulaciones de forma controlada y dentro de un rango cómodo.",
      "Respira con normalidad y evita los rebotes forzados.",
      "Incrementa el rango de movimiento progresivamente, sin competir con otras personas.",
      "Interrumpe el ejercicio si aparece dolor, mareo o una sensación anormal."
    ]
  },
  {
    keywords: ["respiracion", "meditacion", "zazen", "concentracion", "kime"],
    title: "Respiración, atención y control corporal",
    category: "Control mental",
    level: "Principiante",
    steps: [
      "Busca un lugar tranquilo y adopta una posición cómoda.",
      "Respira de manera natural, sin forzar la inhalación ni contener el aire.",
      "Dirige tu atención a la postura y a las sensaciones corporales.",
      "Practica breves periodos de concentración antes o después de entrenar.",
      "Estudia las diferencias entre las prácticas contemplativas y los conceptos técnicos específicos de cada tradición."
    ]
  },
  {
    keywords: ["esgrima", "fencing", "desplazamiento de esgrima", "guardia de esgrima"],
    title: "Fundamentos de esgrima",
    category: "Armas deportivas",
    level: "Principiante",
    steps: [
      "Investiga las diferencias entre florete, espada y sable.",
      "Estudia las reglas, las zonas válidas y las convenciones de cada modalidad.",
      "Practica la postura y los desplazamientos básicos sin arma al principio.",
      "Utiliza únicamente equipamiento deportivo apropiado en una instalación preparada.",
      "Aprende el manejo del arma con un entrenador cualificado."
    ]
  }
];

function normalizeDeepText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeSearchUrl(base, query) {
  return `${base}${encodeURIComponent(query)}`;
}

function findTechniqueGuide(query) {
  const normalizedQuery = normalizeDeepText(query);

  const matches = techniqueGuides
    .map((guide) => {
      const matchingKeywords = guide.keywords
        .map(normalizeDeepText)
        .filter((keyword) => normalizedQuery.includes(keyword));

      return {
        guide,
        score: matchingKeywords.reduce(
          (total, keyword) => total + keyword.length,
          0
        ),
        matchCount: matchingKeywords.length
      };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.score - a.score);

  if (matches.length) {
    return matches[0].guide;
  }

  return {
    title: `Guía de investigación: ${query}`,
    category: "Investigación",
    level: "Por determinar",
    steps: [
      `Toda tecnica queda bajo su responsabilidad.`
    ]
  };
}

function renderDeepCard({ eyebrow, title, description, links }) {
  return `
    <article class="deep-card">
      <span class="eyebrow">${escapeHTML(eyebrow)}</span>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(description)}</p>
      <div class="deep-links">
        ${links.map((link) => `
          <a
            href="${escapeHTML(link.url)}"
            target="_blank"
            rel="noopener noreferrer">
            ${escapeHTML(link.label)} ↗
          </a>
        `).join("")}
      </div>
    </article>
  `;
}

$("#deep-search-form")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = $("#deep-query");
  const results = $("#deep-results");

  if (!input || !results) return;

  const query = input.value.trim();

  if (!query) {
    results.innerHTML = `
      <div class="empty-state">
        <h4>Escribe un tema para investigar</h4>
        <p>
          Prueba con nombres de técnicas, disciplinas, formas,
          escuelas o conceptos marciales.
        </p>
      </div>
    `;
    return;
  }

  if (query.length > 160) {
    results.innerHTML = `
      <div class="empty-state">
        <h4>La búsqueda es demasiado larga</h4>
        <p>Resume el tema en un máximo de 160 caracteres.</p>
      </div>
    `;
    return;
  }

  const guide = findTechniqueGuide(query);

  const videoQuery = `${query} martial arts technique instruction`;
  const researchQuery = `${query} martial arts`;
  const academicQuery = `${query} martial arts history technique`;

  const cards = [
    {
      eyebrow: "01 — DEMOSTRACIONES",
      title: "Videos y explicaciones visuales",
      description:
        "Encuentra demostraciones, clases y explicaciones. Revisa la experiencia del instructor y contrasta las técnicas antes de practicarlas.",
      links: [
        {
          label: "Buscar en YouTube",
          url: makeSearchUrl(
            "https://www.youtube.com/results?search_query=",
            videoQuery
          )
        }
      ]
    },
    {
      eyebrow: "02 — INVESTIGACIÓN",
      title: "Historia y contexto marcial",
      description:
        "Explora la terminología, los orígenes, las escuelas y las aplicaciones documentadas del tema.",
      links: [
        {
          label: "Buscar en Google",
          url: makeSearchUrl(
            "https://www.google.com/search?q=",
            researchQuery
          )
        },
        {
          label: "Consultar Wikipedia",
          url: makeSearchUrl(
            "https://en.wikipedia.org/w/index.php?search=",
            query
          )
        }
      ]
    },
    {
      eyebrow: "03 — FUENTES ACADÉMICAS",
      title: "Artículos y publicaciones",
      description:
        "Busca estudios, investigaciones históricas y publicaciones especializadas. Comprueba autores, fechas, referencias y metodología.",
      links: [
        {
          label: "Google Scholar",
          url: makeSearchUrl(
            "https://scholar.google.com/scholar?q=",
            academicQuery
          )
        },
        {
          label: "Internet Archive",
          url: makeSearchUrl(
            "https://archive.org/search?query=",
            query
          )
        }
      ]
    },
    {
      eyebrow: "04 — GUÍA ORIENTATIVA",
      title: guide.title,
      description:
        `Categoría: ${guide.category}. Nivel: ${guide.level}.`,
      links: []
    }
  ];

  results.innerHTML = `
    <div class="deep-results-heading">
      <span class="eyebrow">RESULTADOS DE PROFUNDIZACIÓN</span>
      <h2>${escapeHTML(query)}</h2>
      <p>
        Recursos de consulta y una guía inicial relacionada con tu búsqueda.
      </p>
    </div>

    ${cards.slice(0, 3).map(renderDeepCard).join("")}

    <article class="deep-card">
      <span class="eyebrow">${escapeHTML(cards[3].eyebrow)}</span>
      <h3>${escapeHTML(guide.title)}</h3>
      <p>${escapeHTML(cards[3].description)}</p>
      <ol class="technique-entry">
        ${guide.steps.map((step) =>
          `<li>${escapeHTML(step)}</li>`
        ).join("")}
      </ol>
      <p class="safety-note">
        </p>
    </article>
  `;

  results.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

ensureTrainingControls();

populateDisciplineOptions("");

renderQuizQuestion();
displayReflection();
showView("login");

if (!window.MAI_DISCIPLINES) {
  console.warn(
    "MAI: no se encontró el catálogo. Añade martial-arts-data.js antes de app.js."
  );
}

if (!window.MAIEngine) {
  console.warn(
    "MAI: no se encontró el motor de recomendaciones. Añade discipline-engine.js antes de app.js."
  );
}

if (!window.MAITrainingEngine) {
  console.warn(
    "MAI: no se encontró el motor de entrenamiento. Añade training-engine.js antes de app.js."
  );
}

console.info("MAI: interfaz inicializada correctamente.");

(() => {
  "use strict";

  if (window.__maiMartialLabInitialized) return;
  window.__maiMartialLabInitialized = true;

  const $ = (selector) => document.querySelector(selector);

  function maiLabEscapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function maiLabEmpty(message) {
    return `<li class="lab-empty">${maiLabEscapeHTML(message)}</li>`;
  }

  function maiLabEntry(title, detail = "") {
    return `
      <li class="lab-entry">
        <div>
          <strong>${maiLabEscapeHTML(title)}</strong>
          ${detail ? `<small>${maiLabEscapeHTML(detail)}</small>` : ""}
        </div>
      </li>
    `;
  }

  function maiLabListen(selector, eventName, callback) {
    const element = $(selector);
    if (element) element.addEventListener(eventName, callback);
    return element;
  }

  function maiLabShowMessage(element, message) {
    if (!element) return;
    element.textContent = message;
  }

  class MAIHistoryNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  class MAIPracticeLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    append(value) {
      const node = new MAIHistoryNode(value);

      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        this.tail = node;
      }

      this.length++;
    }

    clear() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    toArray() {
      const result = [];
      let current = this.head;

      while (current) {
        result.push(current.value);
        current = current.next;
      }

      return result;
    }
  }

  const maiPracticeHistory = new MAIPracticeLinkedList();

  function renderMAIPracticeHistory() {
    const list = $("#lab-history-list");
    if (!list) return;

    const entries = maiPracticeHistory.toArray();

    if (!entries.length) {
      list.innerHTML = maiLabEmpty(
        "Tu diario está vacío. Registra tu primera práctica."
      );
      return;
    }

    list.innerHTML = entries
      .slice()
      .reverse()
      .map((entry) => maiLabEntry(entry.text, entry.date))
      .join("");
  }

  maiLabListen("#lab-history-form", "submit", (event) => {
    event.preventDefault();

    const input = $("#lab-history-input");
    const value = input?.value.trim();

    if (!value) {
      input?.focus();
      return;
    }

    maiPracticeHistory.append({
      text: value,
      date: new Date().toLocaleString("es-CO", {
        dateStyle: "short",
        timeStyle: "short"
      })
    });

    renderMAIPracticeHistory();

    input.value = "";
    input.focus();
  });

  maiLabListen("#lab-history-clear", "click", () => {
    maiPracticeHistory.clear();
    renderMAIPracticeHistory();
  });

  renderMAIPracticeHistory();

  const maiResearchStack = [];

  function renderMAIStack() {
    const list = $("#lab-stack-list");
    if (!list) return;

    if (!maiResearchStack.length) {
      list.innerHTML = maiLabEmpty(
        "No hay técnicas pendientes de repaso."
      );
      return;
    }

    list.innerHTML = maiResearchStack
      .slice()
      .reverse()
      .map((technique, index) =>
        maiLabEntry(
          `${index === 0 ? "⬆️ Próxima: " : ""}${technique}`,
          index === 0 ? "Está en la cima de la pila" : "Pendiente de repaso"
        )
      )
      .join("");
  }

  maiLabListen("#lab-stack-form", "submit", (event) => {
    event.preventDefault();

    const input = $("#lab-stack-input");
    const value = input?.value.trim();

    if (!value) {
      input?.focus();
      return;
    }

    maiResearchStack.push(value);
    renderMAIStack();

    input.value = "";
    input.focus();
  });

  maiLabListen("#lab-stack-pop", "click", () => {
    const removed = maiResearchStack.pop();
    renderMAIStack();

    if (removed) {
      maiLabShowMessage(
        $("#lab-stack-status"),
        `Técnica retirada de la pila: ${removed}`
      );
    } else {
      maiLabShowMessage(
        $("#lab-stack-status"),
        "La pila está vacía."
      );
    }
  });

  renderMAIStack();

  class MAIPracticeQueue {
    constructor() {
      this.items = [];
    }

    enqueue(value) {
      this.items.push(value);
    }

    dequeue() {
      return this.items.shift() ?? null;
    }

    get length() {
      return this.items.length;
    }
  }

  const maiTrainingQueue = new MAIPracticeQueue();

  function renderMAIQueue() {
    const list = $("#lab-queue-list");
    if (!list) return;

    if (!maiTrainingQueue.length) {
      list.innerHTML = maiLabEmpty(
        "No hay técnicas esperando turno."
      );
      return;
    }

    list.innerHTML = maiTrainingQueue.items
      .map((technique, index) =>
        maiLabEntry(
          `${index + 1}. ${technique}`,
          index === 0 ? "Siguiente en entrenarse" : "En espera"
        )
      )
      .join("");
  }

  maiLabListen("#lab-queue-form", "submit", (event) => {
    event.preventDefault();

    const input = $("#lab-queue-input");
    const value = input?.value.trim();

    if (!value) {
      input?.focus();
      return;
    }

    maiTrainingQueue.enqueue(value);
    renderMAIQueue();

    input.value = "";
    input.focus();
  });

  maiLabListen("#lab-queue-next", "click", () => {
    const next = maiTrainingQueue.dequeue();
    renderMAIQueue();

    maiLabShowMessage(
      $("#lab-queue-status"),
      next
        ? `Turno completado: ${next}`
        : "La cola está vacía."
    );
  });

  renderMAIQueue();

  const maiLearningTree = {
    name: "Artes marciales",
    description: "Punto de partida",
    children: [
      {
        name: "Golpeo",
        description: "Técnicas de puños y piernas",
        children: [
          {
            name: "Boxeo",
            description: "Puños, guardia y desplazamiento",
            children: []
          },
          {
            name: "Taekwondo",
            description: "Patadas, distancia y coordinación",
            children: []
          }
        ]
      },
      {
        name: "Agarres y proyecciones",
        description: "Control, equilibrio y derribos",
        children: [
          {
            name: "Judo",
            description: "Proyecciones y control",
            children: []
          },
          {
            name: "Jiu-jitsu brasileño",
            description: "Control en el suelo y sumisiones",
            children: []
          }
        ]
      },
      {
        name: "Armas tradicionales",
        description: "Manejo técnico y prácticas seguras",
        children: [
          {
            name: "Kendo",
            description: "Esgrima japonesa con shinai",
            children: []
          }
        ]
      }
    ]
  };

  function renderMAITreeNode(node) {
    const childrenHTML = node.children?.length
      ? `<div class="lab-tree-children">
          ${node.children.map(renderMAITreeNode).join("")}
        </div>`
      : "";

    return `
      <div class="lab-tree-node">
        <strong>${maiLabEscapeHTML(node.name)}</strong>
        <span>${maiLabEscapeHTML(node.description || "")}</span>
        ${childrenHTML}
      </div>
    `;
  }

  function renderMAITree() {
    const tree = $("#lab-learning-tree");
    if (!tree) return;

    tree.innerHTML = renderMAITreeNode(maiLearningTree);
  }

  renderMAITree();

  const maiDisciplineGraph = {
    "Boxeo": ["Kickboxing", "MMA"],
    "Kickboxing": ["Boxeo", "Muay Thai", "MMA"],
    "Muay Thai": ["Kickboxing", "MMA"],
    "Judo": ["Jiu-jitsu brasileño", "MMA"],
    "Jiu-jitsu brasileño": ["Judo", "MMA"],
    "Taekwondo": ["Karate", "Kickboxing"],
    "Karate": ["Taekwondo", "Kickboxing"],
    "Kendo": ["Aikido"],
    "Aikido": ["Kendo"],
    "MMA": ["Boxeo", "Kickboxing", "Muay Thai", "Judo", "Jiu-jitsu brasileño"]
  };

  function renderMAIGraphOptions() {
    const select = $("#lab-graph-select");
    if (!select) return;

    if (select.options.length <= 1) {
      const disciplines = Object.keys(maiDisciplineGraph);

      disciplines.forEach((discipline) => {
        const option = document.createElement("option");
        option.value = discipline;
        option.textContent = discipline;
        select.appendChild(option);
      });
    }
  }

  function renderMAIGraph() {
    const select = $("#lab-graph-select");
    const results = $("#lab-graph-results");

    if (!select || !results) return;

    const selected = select.value;
    const connections = maiDisciplineGraph[selected];

    if (!connections) {
      results.innerHTML = maiLabEmpty(
        "Selecciona una disciplina para explorar sus conexiones."
      );
      return;
    }

    results.innerHTML = connections.length
      ? connections.map((discipline) =>
          maiLabEntry(
            discipline,
            `Conexión directa con ${selected}`
          )
        ).join("")
      : maiLabEmpty("No se encontraron conexiones.");
  }

  renderMAIGraphOptions();

  maiLabListen("#lab-graph-select", "change", renderMAIGraph);

  renderMAIGraph();

  function initializeMAIMartialLab() {
    renderMAIPracticeHistory();
    renderMAIStack();
    renderMAIQueue();
    renderMAITree();
    renderMAIGraphOptions();
    renderMAIGraph();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeMAIMartialLab,
      { once: true }
    );
  } else {
    initializeMAIMartialLab();
  }
})();