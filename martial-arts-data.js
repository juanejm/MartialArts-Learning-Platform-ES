/*Juan Esteban JM*/
"use strict";

window.MAI_DISCIPLINES = [
  // =====================================================
  // BOXEO Y COMBATE DE PIE
  // =====================================================
  {
    name: "Boxeo",
    origin: "Reino Unido / tradición internacional",
    period: "Moderno; antecedentes antiguos",
    tags: ["striking", "fitness", "competition"],
    focus: "Puños, defensa, desplazamientos y condición física",
    contact: "Alto en combate; adaptable en entrenamiento",
    equipment: "Guantes, vendas y protector bucal",
    description: "Combate de puños centrado en la distancia, la defensa y el desplazamiento."
  },
  {
    name: "Savate",
    origin: "Francia",
    period: "Moderno; siglos XVIII–XIX",
    tags: ["striking", "kicking", "french", "competition"],
    focus: "Puños y patadas con calzado específico",
    contact: "Variable",
    equipment: "Calzado y guantes según modalidad",
    description: "Arte de combate francés que combina técnicas de puño y patada."
  },
  {
    name: "Canne de combat",
    origin: "Francia",
    period: "Moderno; siglo XIX",
    tags: ["weapons", "french", "competition", "fitness"],
    focus: "Combate deportivo con bastón ligero",
    contact: "Controlado en la modalidad deportiva",
    equipment: "Bastón y protecciones",
    description: "Disciplina francesa de esgrima con bastón, practicada como deporte."
  },
  {
    name: "Muay Thai",
    origin: "Tailandia",
    period: "Tradición histórica; deporte moderno",
    tags: ["striking", "thai", "fitness", "competition"],
    focus: "Puños, patadas, rodillas, codos y clinch",
    contact: "Alto en combate",
    equipment: "Guantes y protecciones según práctica",
    description: "Arte de combate tailandés conocido por el uso de ocho puntos de contacto."
  },
  {
    name: "Muay Boran",
    origin: "Tailandia",
    period: "Tradición histórica",
    tags: ["striking", "thai", "traditional", "selfdefense"],
    focus: "Técnicas tradicionales de combate tailandés",
    contact: "Depende de la escuela",
    equipment: "Variable",
    description: "Nombre paraguas para tradiciones de combate tailandesas anteriores o paralelas al Muay Thai deportivo moderno."
  },
  {
    name: "Lethwei",
    origin: "Myanmar",
    period: "Tradición histórica; deporte moderno",
    tags: ["striking", "fitness", "competition"],
    focus: "Combate de pie con puños, piernas, codos, rodillas y cabeza en ciertas reglas",
    contact: "Muy alto en competición tradicional",
    equipment: "Depende de las reglas",
    description: "Deporte de combate birmano de contacto intenso; requiere especial atención a sus riesgos."
  },
  {
    name: "Pradal Serey",
    origin: "Camboya",
    period: "Tradición histórica; deporte moderno",
    tags: ["striking", "fitness", "competition"],
    focus: "Puños, patadas, codos y rodillas",
    contact: "Alto en combate",
    equipment: "Protecciones según modalidad",
    description: "Deporte de combate camboyano con similitudes y diferencias respecto a otros sistemas regionales."
  },
  {
    name: "Bokator",
    origin: "Camboya",
    period: "Tradición histórica; recuperación moderna",
    tags: ["striking", "grappling", "traditional", "weapons"],
    focus: "Golpes, controles, formas y técnicas con armas en algunas escuelas",
    contact: "Variable",
    equipment: "Variable",
    description: "Tradición marcial camboyana que combina métodos de combate, formas y elementos culturales."
  },
  {
    name: "Kun Khmer",
    origin: "Camboya",
    period: "Tradicional y deportivo",
    tags: ["striking", "fitness", "competition"],
    focus: "Combate de pie",
    contact: "Alto en combate",
    equipment: "Guantes y protecciones según reglas",
    description: "Nombre utilizado para el boxeo tradicional camboyano y sus modalidades deportivas."
  },
  {
    name: "Kickboxing",
    origin: "Japón / Estados Unidos y desarrollo internacional",
    period: "Moderno; siglo XX",
    tags: ["striking", "kicking", "fitness", "competition"],
    focus: "Puños y patadas bajo reglamentos deportivos",
    contact: "Variable",
    equipment: "Guantes y protecciones",
    description: "Familia de deportes de combate con reglas que varían según la organización."
  },
  {
    name: "Shoot boxing",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["striking", "grappling", "competition", "fitness"],
    focus: "Golpes, clinch y ciertas acciones de derribo o sumisión según reglamento",
    contact: "Alto en competición",
    equipment: "Equipo deportivo",
    description: "Deporte japonés que combina el golpeo con elementos de agarre bajo reglas específicas."
  },
  {
    name: "Sanda",
    origin: "China",
    period: "Moderno; con antecedentes tradicionales",
    tags: ["chinese", "striking", "grappling", "fitness", "competition"],
    focus: "Puños, patadas y proyecciones deportivas",
    contact: "Alto en competición",
    equipment: "Protecciones según reglamento",
    description: "Combate deportivo chino que combina técnicas de pie y derribos."
  },
  {
    name: "Sanshou tradicional",
    origin: "China",
    period: "Tradicional / moderno según escuela",
    tags: ["chinese", "striking", "grappling", "traditional"],
    focus: "Métodos chinos de combate y aplicación",
    contact: "Variable",
    equipment: "Variable",
    description: "Término usado de distintas maneras para métodos de combate chinos; conviene comprobar qué sistema enseña cada escuela."
  },

  // =====================================================
  // ARTES MARCIALES JAPONESAS
  // =====================================================
  {
    name: "Karate",
    origin: "Okinawa, Japón",
    period: "Tradición histórica; sistematización moderna",
    tags: ["japanese", "striking", "traditional", "competition"],
    focus: "Golpes, defensas, desplazamientos y formas",
    contact: "Variable según estilo y escuela",
    equipment: "Uniforme; protecciones según práctica",
    description: "Familia de estilos de Okinawa y Japón, con diferencias técnicas y pedagógicas."
  },
  {
    name: "Shotokan",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["japanese", "striking", "traditional", "competition"],
    focus: "Técnica, posiciones, kihon, kata y kumite",
    contact: "Variable",
    equipment: "Uniforme y protecciones según práctica",
    description: "Uno de los estilos de karate más difundidos internacionalmente."
  },
  {
    name: "Goju-ryu",
    origin: "Okinawa, Japón",
    period: "Tradición sistematizada en época moderna",
    tags: ["japanese", "striking", "traditional", "flow"],
    focus: "Técnicas de mano, respiración, formas y trabajo cercano",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Estilo de karate de Okinawa que combina métodos duros y suaves."
  },
  {
    name: "Shito-ryu",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["japanese", "striking", "traditional", "competition"],
    focus: "Kata, fundamentos y combate",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Estilo de karate conocido por su amplio repertorio de formas."
  },
  {
    name: "Wado-ryu",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["japanese", "striking", "traditional", "flow"],
    focus: "Desplazamientos, evasión, golpes y principios de jujutsu",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Estilo japonés de karate que incorpora principios de evasión y desplazamiento."
  },
  {
    name: "Kyokushin",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["japanese", "striking", "fitness", "competition"],
    focus: "Karate de contacto, acondicionamiento y combate",
    contact: "Alto en ciertas modalidades",
    equipment: "Protecciones según reglamento",
    description: "Estilo de karate reconocido por su entrenamiento exigente y combate de contacto."
  },
  {
    name: "Kobudo de Okinawa",
    origin: "Okinawa, Japón",
    period: "Tradición histórica",
    tags: ["japanese", "weapons", "traditional"],
    focus: "Armas tradicionales de Okinawa",
    contact: "Variable",
    equipment: "Armas de práctica",
    description: "Familia de tradiciones que estudia armas como bo, sai y tonfa."
  },
  {
    name: "Judo",
    origin: "Japón",
    period: "Moderno; 1882",
    tags: ["japanese", "grappling", "competition", "fitness"],
    focus: "Proyecciones, inmovilizaciones y control",
    contact: "Alto en práctica deportiva",
    equipment: "Judogi y tatami",
    description: "Arte marcial y deporte centrado en el desequilibrio, las proyecciones y el control."
  },
  {
    name: "Jujutsu japonés",
    origin: "Japón",
    period: "Tradición histórica",
    tags: ["japanese", "grappling", "selfdefense", "traditional"],
    focus: "Agarres, controles, proyecciones y métodos de defensa",
    contact: "Variable",
    equipment: "Depende de la escuela",
    description: "Familia amplia de sistemas japoneses; cada escuela puede tener un programa muy diferente."
  },
  {
    name: "Aikido",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["japanese", "traditional", "flow", "selfdefense"],
    focus: "Desplazamiento, equilibrio y redirección",
    contact: "Generalmente controlado",
    equipment: "A veces bokken y jo de práctica",
    description: "Arte japonés centrado en movimientos circulares, controles y práctica cooperativa."
  },
  {
    name: "Aikijujutsu",
    origin: "Japón",
    period: "Tradición histórica; escuelas modernas",
    tags: ["japanese", "grappling", "traditional", "selfdefense"],
    focus: "Controles articulares, desequilibrios y métodos de escuela",
    contact: "Variable",
    equipment: "Depende de la escuela",
    description: "Familia de sistemas de jujutsu que enfatizan principios de control y desequilibrio."
  },
  {
    name: "Daito-ryu Aiki-jujutsu",
    origin: "Japón",
    period: "Tradición histórica documentada en época moderna",
    tags: ["japanese", "grappling", "traditional", "selfdefense"],
    focus: "Controles, inmovilizaciones y principios de aiki",
    contact: "Variable",
    equipment: "Depende de la escuela",
    description: "Escuela japonesa de jujutsu asociada históricamente con el desarrollo de varias artes modernas."
  },
  {
    name: "Kendo",
    origin: "Japón",
    period: "Tradición de espada; deporte moderno",
    tags: ["japanese", "weapons", "traditional", "competition", "fitness"],
    focus: "Esgrima japonesa con shinai",
    contact: "Contacto deportivo con protecciones",
    equipment: "Shinai, bogu y uniforme",
    description: "Disciplina moderna de espada japonesa con reglas, etiqueta y práctica formal."
  },
  {
    name: "Kenjutsu",
    origin: "Japón",
    period: "Histórico; escuelas tradicionales activas",
    tags: ["japanese", "weapons", "traditional"],
    focus: "Métodos de espada de distintas escuelas",
    contact: "Depende de la escuela y del equipo",
    equipment: "Espadas de práctica o sustitutos seguros",
    description: "Término general para tradiciones japonesas de manejo de espada."
  },
  {
    name: "Iaido",
    origin: "Japón",
    period: "Tradición de espada; práctica moderna",
    tags: ["japanese", "weapons", "traditional", "flow"],
    focus: "Desenvainado, control postural y formas",
    contact: "Normalmente sin combate libre",
    equipment: "Espada de práctica; equipo según nivel",
    description: "Arte japonés de desenvainado y ejecución de formas con énfasis en control y precisión."
  },
  {
    name: "Battojutsu",
    origin: "Japón",
    period: "Histórico; escuelas tradicionales",
    tags: ["japanese", "weapons", "traditional"],
    focus: "Métodos de desenvainado y corte en escuelas específicas",
    contact: "Práctica formal; depende de la escuela",
    equipment: "Equipo especializado y supervisión",
    description: "Familia de prácticas japonesas relacionadas con el desenvainado y el corte."
  },
  {
    name: "Sojutsu",
    origin: "Japón",
    period: "Histórico; escuelas tradicionales",
    tags: ["japanese", "weapons", "traditional"],
    focus: "Lanza japonesa",
    contact: "Variable",
    equipment: "Armas de práctica",
    description: "Tradición japonesa de lanza, conservada en determinadas escuelas."
  },
  {
    name: "Naginatajutsu",
    origin: "Japón",
    period: "Histórico; práctica tradicional y deportiva",
    tags: ["japanese", "weapons", "traditional", "competition"],
    focus: "Manejo de naginata",
    contact: "Variable",
    equipment: "Naginata de práctica y protecciones",
    description: "Arte de manejo de arma de asta japonesa."
  },
  {
    name: "Kyudo",
    origin: "Japón",
    period: "Tradición histórica; práctica moderna",
    tags: ["japanese", "weapons", "traditional", "flow"],
    focus: "Arquería japonesa, postura, respiración y precisión",
    contact: "Sin combate corporal",
    equipment: "Arco y equipo de arquería",
    description: "Arte japonés del arco que combina técnica, etiqueta y entrenamiento mental."
  },
  {
    name: "Sumo",
    origin: "Japón",
    period: "Tradición histórica; deporte moderno",
    tags: ["japanese", "grappling", "competition", "fitness"],
    focus: "Equilibrio, empuje, agarres y derribo fuera del círculo",
    contact: "Alto en competición",
    equipment: " mawashi y dohyo",
    description: "Deporte de combate japonés con una larga tradición ceremonial y deportiva."
  },
  {
    name: "Shorinji Kempo",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["japanese", "striking", "grappling", "traditional", "selfdefense"],
    focus: "Golpes, controles y formación filosófica",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Sistema japonés moderno que combina técnicas de golpeo y control."
  },
  {
    name: "Ninjutsu",
    origin: "Japón",
    period: "Histórico; interpretaciones modernas",
    tags: ["japanese", "traditional", "selfdefense", "weapons"],
    focus: "Tradiciones asociadas a escuelas históricas de ninjutsu",
    contact: "Variable",
    equipment: "Depende de la escuela",
    description: "Conjunto de tradiciones históricas y escuelas modernas; las afirmaciones históricas deben evaluarse caso por caso."
  },
  {
    name: "Tantojutsu",
    origin: "Japón",
    period: "Histórico; escuelas tradicionales",
    tags: ["japanese", "weapons", "traditional"],
    focus: "Estudio tradicional del tanto",
    contact: "Variable",
    equipment: "Sustitutos de práctica seguros",
    description: "Práctica japonesa tradicional asociada al manejo del tanto."
  },

  // =====================================================
  // ARTES MARCIALES CHINAS
  // =====================================================
  {
    name: "Kung fu / Wushu tradicional",
    origin: "China",
    period: "Tradiciones históricas diversas",
    tags: ["chinese", "traditional", "striking", "flow", "weapons"],
    focus: "Familias de estilos, formas, golpeo y armas",
    contact: "Muy variable",
    equipment: "Depende del estilo",
    description: "Términos amplios para numerosas tradiciones marciales chinas; no designan un sistema único."
  },
  {
    name: "Wing Chun",
    origin: "China meridional",
    period: "Tradición transmitida; sistematización moderna",
    tags: ["chinese", "striking", "selfdefense"],
    focus: "Combate cercano, estructura y economía de movimiento",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Estilo chino centrado en la distancia corta, la estructura y la sensibilidad táctil."
  },
  {
    name: "Tai chi / Taijiquan",
    origin: "China",
    period: "Tradición histórica",
    tags: ["chinese", "traditional", "flow"],
    focus: "Movimiento, equilibrio, coordinación y formas",
    contact: "Normalmente bajo en práctica general",
    equipment: "Ninguno para fundamentos",
    description: "Arte chino con prácticas de salud, forma y aplicaciones marciales según la escuela."
  },
  {
    name: "Baguazhang",
    origin: "China",
    period: "Siglo XIX y desarrollos posteriores",
    tags: ["chinese", "traditional", "flow", "selfdefense"],
    focus: "Desplazamientos circulares, cambios de dirección y formas",
    contact: "Variable",
    equipment: "Generalmente ninguno para fundamentos",
    description: "Arte interno chino conocido por el trabajo circular y los cambios de palma."
  },
  {
    name: "Xingyiquan",
    origin: "China",
    period: "Tradición histórica documentada en época moderna",
    tags: ["chinese", "traditional", "striking"],
    focus: "Movimientos lineales, coordinación corporal y formas",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Arte interno chino con movimientos directos y principios de coordinación."
  },
  {
    name: "Bajiquan",
    origin: "China",
    period: "Tradición histórica",
    tags: ["chinese", "traditional", "striking", "selfdefense"],
    focus: "Potencia a corta distancia y estructura corporal",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Estilo chino conocido por técnicas de corta distancia y movimientos explosivos."
  },
  {
    name: "Choy Li Fut",
    origin: "China meridional",
    period: "Siglo XIX",
    tags: ["chinese", "traditional", "striking", "weapons"],
    focus: "Golpes circulares, desplazamientos y formas",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Sistema tradicional chino con amplio repertorio de técnicas y formas."
  },
  {
    name: "Hung Gar",
    origin: "China meridional",
    period: "Tradición histórica",
    tags: ["chinese", "traditional", "striking", "weapons"],
    focus: "Posturas, golpeo, formas y acondicionamiento",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Estilo tradicional del sur de China."
  },
  {
    name: "Baguazhang Cheng",
    origin: "China",
    period: "Siglo XIX–XX",
    tags: ["chinese", "traditional", "flow"],
    focus: "Trabajo circular dentro de la rama asociada a Cheng Tinghua",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Rama de Baguazhang vinculada a una línea histórica específica."
  },
  {
    name: "Praying Mantis / Tanglangquan",
    origin: "China",
    period: "Tradición histórica",
    tags: ["chinese", "traditional", "striking"],
    focus: "Técnicas de manos, coordinación y formas",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Familia de estilos chinos inspirados nominalmente en los movimientos de la mantis."
  },
  {
    name: "Baihequan / Grulla Blanca",
    origin: "China meridional",
    period: "Tradición histórica",
    tags: ["chinese", "traditional", "striking", "flow"],
    focus: "Estructura, manos, respiración y formas",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Familia de tradiciones chinas con ramas y genealogías diferentes."
  },
  {
    name: "Lama Pai",
    origin: "China",
    period: "Tradición transmitida en época moderna",
    tags: ["chinese", "traditional", "striking"],
    focus: "Golpeo de larga distancia y métodos tradicionales",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Tradición marcial china transmitida en determinadas líneas."
  },
  {
    name: "Shuai Jiao",
    origin: "China",
    period: "Tradición histórica",
    tags: ["chinese", "grappling", "competition", "fitness"],
    focus: "Derribos, agarres y desequilibrio",
    contact: "Alto en práctica deportiva",
    equipment: "Uniforme según escuela",
    description: "Familia de lucha china centrada en proyecciones y derribos."
  },
  {
    name: "Qinna",
    origin: "China",
    period: "Tradición histórica",
    tags: ["chinese", "grappling", "selfdefense", "traditional"],
    focus: "Principios de control y manipulación articular",
    contact: "Debe practicarse de forma controlada",
    equipment: "Ninguno",
    description: "Término para métodos de captura y control presentes en distintas tradiciones chinas."
  },
  {
    name: "Chin Na",
    origin: "China",
    period: "Tradición histórica",
    tags: ["chinese", "grappling", "selfdefense", "traditional"],
    focus: "Controles, agarres y escapes",
    contact: "Controlado",
    equipment: "Ninguno",
    description: "Transcripción alternativa de Qinna; no siempre representa una escuela independiente."
  },
  {
    name: "Baji / Pigua",
    origin: "China",
    period: "Tradición histórica",
    tags: ["chinese", "traditional", "striking"],
    focus: "Combinación de métodos de Baji y Pigua en algunas líneas",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Familia o combinación de métodos tradicionales chinos, cuya práctica varía por linaje."
  },
  {
    name: "Liuhebafa",
    origin: "China",
    period: "Tradición transmitida en época moderna",
    tags: ["chinese", "traditional", "flow"],
    focus: "Coordinación corporal, secuencias y movimiento fluido",
    contact: "Variable",
    equipment: "Ninguno para fundamentos",
    description: "Arte interno chino menos difundido que combina principios de movimiento y formas."
  },
  {
    name: "Yiquan",
    origin: "China",
    period: "Moderno; siglo XX",
    tags: ["chinese", "traditional", "flow", "fitness"],
    focus: "Posturas, intención, estructura y entrenamiento perceptivo",
    contact: "Variable",
    equipment: "Ninguno para fundamentos",
    description: "Sistema chino moderno que enfatiza el trabajo de postura y la intención."
  },

  // =====================================================
  // ARTES MARCIALES COREANAS
  // =====================================================
  {
    name: "Taekwondo",
    origin: "Corea",
    period: "Moderno; siglo XX",
    tags: ["korean", "kicking", "striking", "competition", "fitness"],
    focus: "Patadas, velocidad, formas y combate deportivo",
    contact: "Variable",
    equipment: "Dobok y protecciones según práctica",
    description: "Arte marcial coreano conocido por sus técnicas de pierna y modalidades deportivas."
  },
  {
    name: "Hapkido",
    origin: "Corea",
    period: "Moderno; siglo XX",
    tags: ["korean", "selfdefense", "grappling", "traditional"],
    focus: "Controles, desplazamientos, patadas y defensa personal",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Sistema coreano con métodos de control y técnicas de golpeo."
  },
  {
    name: "Tang Soo Do",
    origin: "Corea",
    period: "Moderno; siglo XX",
    tags: ["korean", "striking", "kicking", "traditional"],
    focus: "Golpes, patadas, formas y disciplina",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Arte marcial coreano con influencias y linajes diversos."
  },
  {
    name: "Hwa Rang Do",
    origin: "Corea",
    period: "Sistema moderno con reivindicaciones históricas",
    tags: ["korean", "traditional", "grappling", "selfdefense"],
    focus: "Técnicas diversas de golpeo, control y formas",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Sistema moderno que presenta una combinación amplia de métodos; sus afirmaciones de continuidad antigua deben evaluarse críticamente."
  },
  {
    name: "Gongkwon Yusul",
    origin: "Corea",
    period: "Moderno; siglo XXI",
    tags: ["korean", "grappling", "striking", "competition"],
    focus: "Golpeo, lucha y transiciones",
    contact: "Variable",
    equipment: "Según práctica",
    description: "Sistema coreano moderno que integra combate de pie y lucha."
  },
  {
    name: "Ssireum",
    origin: "Corea",
    period: "Tradición histórica; deporte moderno",
    tags: ["korean", "grappling", "competition", "fitness"],
    focus: "Lucha tradicional y derribos",
    contact: "Alto en competición",
    equipment: "Satba y área de lucha",
    description: "Lucha coreana tradicional centrada en agarres y derribos."
  },
  {
    name: "Taekkyeon",
    origin: "Corea",
    period: "Tradición histórica",
    tags: ["korean", "kicking", "flow", "traditional"],
    focus: "Pasos rítmicos, patadas y desequilibrio",
    contact: "Variable",
    equipment: "Generalmente ninguno para fundamentos",
    description: "Tradición coreana reconocida por sus desplazamientos fluidos y técnicas de pierna."
  },

  // =====================================================
  // ARTES DEL SUDESTE ASIÁTICO Y FILIPINAS
  // =====================================================
  {
    name: "Arnis",
    origin: "Filipinas",
    period: "Tradición histórica; sistemas modernos",
    tags: ["weapons", "selfdefense", "traditional"],
    focus: "Bastón, coordinación, manos vacías y desplazamientos",
    contact: "Variable",
    equipment: "Bastones de entrenamiento y protección",
    description: "Nombre ampliamente usado para artes marciales filipinas."
  },
  {
    name: "Eskrima / Eskrima filipina",
    origin: "Filipinas",
    period: "Tradición histórica",
    tags: ["weapons", "selfdefense", "traditional"],
    focus: "Bastón, espada y daga según la escuela",
    contact: "Variable",
    equipment: "Equipo de práctica apropiado",
    description: "Familia de métodos filipinos con diferencias importantes entre linajes."
  },
  {
    name: "Kali",
    origin: "Filipinas",
    period: "Tradición y sistemas modernos",
    tags: ["weapons", "selfdefense", "traditional"],
    focus: "Armas de entrenamiento, coordinación y métodos de manos vacías",
    contact: "Variable",
    equipment: "Material de entrenamiento seguro",
    description: "Nombre utilizado por diversas escuelas para tradiciones marciales filipinas."
  },
  {
    name: "Pencak Silat",
    origin: "Indonesia y región malaya",
    period: "Tradiciones históricas",
    tags: ["selfdefense", "traditional", "grappling", "striking", "weapons"],
    focus: "Golpes, barridos, controles, formas y armas según la escuela",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Familia amplia de artes marciales del archipiélago malayo."
  },
  {
    name: "Bersilat",
    origin: "Región malaya",
    period: "Tradición histórica",
    tags: ["traditional", "selfdefense", "flow"],
    focus: "Prácticas tradicionales malayas relacionadas con silat",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Término relacionado con tradiciones regionales; la denominación exacta depende del contexto."
  },
  {
    name: "Bando",
    origin: "Myanmar",
    period: "Tradición histórica; sistematización moderna",
    tags: ["traditional", "selfdefense", "striking"],
    focus: "Métodos birmanos de defensa y combate",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Término utilizado para sistemas marciales birmanos con variantes regionales."
  },
  {
    name: "Banshay",
    origin: "Myanmar",
    period: "Tradición histórica",
    tags: ["weapons", "traditional"],
    focus: "Armas tradicionales birmanas",
    contact: "Variable",
    equipment: "Armas de práctica",
    description: "Tradición birmana asociada al manejo de armas."
  },
  {
    name: "Naban",
    origin: "Myanmar",
    period: "Tradición histórica",
    tags: ["grappling", "traditional", "fitness"],
    focus: "Lucha y agarres tradicionales",
    contact: "Variable",
    equipment: "Según modalidad",
    description: "Tradición de lucha birmana con prácticas que varían por región."
  },
  {
    name: "Vovinam",
    origin: "Vietnam",
    period: "Moderno; siglo XX",
    tags: ["traditional", "striking", "grappling", "kicking", "competition"],
    focus: "Golpes, patadas, proyecciones, formas y defensa",
    contact: "Variable",
    equipment: "Uniforme y protecciones según práctica",
    description: "Arte marcial vietnamita moderno con un programa técnico amplio."
  },
  {
    name: "Võ cổ truyền",
    origin: "Vietnam",
    period: "Tradiciones históricas diversas",
    tags: ["traditional", "striking", "weapons", "selfdefense"],
    focus: "Escuelas tradicionales vietnamitas",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Denominación amplia para tradiciones marciales vietnamitas."
  },
  {
    name: "Bokator camboyano",
    origin: "Camboya",
    period: "Tradición histórica; recuperación moderna",
    tags: ["traditional", "striking", "grappling", "weapons"],
    focus: "Métodos de combate y repertorios tradicionales",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Se conserva como una tradición marcial camboyana; las reconstrucciones históricas requieren distinguir documentación y tradición oral."
  },

  // =====================================================
  // ARTES DEL SUR DE ASIA
  // =====================================================
  {
    name: "Kalaripayattu",
    origin: "Kerala, India",
    period: "Tradición histórica",
    tags: ["traditional", "weapons", "flow", "striking"],
    focus: "Formas corporales, armas, movilidad y métodos tradicionales",
    contact: "Variable",
    equipment: "Según etapa y escuela",
    description: "Tradición marcial india con sistemas de entrenamiento regionales."
  },
  {
    name: "Silambam",
    origin: "Tamil Nadu, India",
    period: "Tradición histórica",
    tags: ["traditional", "weapons", "fitness"],
    focus: "Bastón, coordinación y desplazamientos",
    contact: "Variable",
    equipment: "Bastón de práctica",
    description: "Arte tradicional tamil conocido por el manejo del bastón."
  },
  {
    name: "Gatka",
    origin: "Punjab, India",
    period: "Tradición histórica; práctica moderna",
    tags: ["traditional", "weapons", "flow"],
    focus: "Esgrima tradicional sij y manejo de armas de práctica",
    contact: "Variable",
    equipment: "Armas de práctica y protecciones",
    description: "Tradición marcial asociada especialmente a la cultura sij."
  },
  {
    name: "Malla-yuddha",
    origin: "India",
    period: "Antiguo; fuentes históricas",
    tags: ["traditional", "grappling", "fitness"],
    focus: "Lucha tradicional india",
    contact: "Variable",
    equipment: "Depende de la práctica",
    description: "Término histórico para formas de lucha descritas en fuentes del sur de Asia."
  },
  {
    name: "Pehlwani / Kushti",
    origin: "Sur de Asia",
    period: "Tradición histórica; formas modernas",
    tags: ["grappling", "traditional", "fitness"],
    focus: "Lucha, fuerza, agarres y acondicionamiento",
    contact: "Alto en combate",
    equipment: "Según tradición",
    description: "Tradición de lucha del sur de Asia con influencias y desarrollos históricos diversos."
  },
  {
    name: "Thang-Ta",
    origin: "Manipur, India",
    period: "Tradición histórica",
    tags: ["traditional", "weapons", "flow"],
    focus: "Métodos tradicionales con espada y lanza",
    contact: "Variable",
    equipment: "Armas de práctica",
    description: "Tradición marcial manipuri con trabajo de armas y movimiento."
  },

  // =====================================================
  // ARTES MARCIALES BRASILEÑAS Y LATINOAMERICANAS
  // =====================================================
  {
    name: "Jiu-jitsu brasileño",
    origin: "Brasil",
    period: "Moderno; siglo XX",
    tags: ["brazilian", "grappling", "competition", "fitness"],
    focus: "Lucha en el suelo, control posicional y sumisiones",
    contact: "Variable; alto en combate deportivo",
    equipment: "Kimono opcional según modalidad",
    description: "Sistema de grappling con variantes con y sin kimono."
  },
  {
    name: "Luta Livre",
    origin: "Brasil",
    period: "Moderno; siglo XX",
    tags: ["brazilian", "grappling", "competition", "fitness"],
    focus: "Lucha de sumisión, control y transiciones",
    contact: "Alto en práctica deportiva",
    equipment: "Habitualmente sin kimono",
    description: "Sistema brasileño de lucha y sumisión."
  },
  {
    name: "Capoeira",
    origin: "Brasil",
    period: "Tradición afrobrasileña; reconocimiento moderno",
    tags: ["brazilian", "flow", "kicking", "traditional", "fitness"],
    focus: "Juego, ritmo, esquivas, patadas y acrobacia progresiva",
    contact: "Variable",
    equipment: "Ropa de práctica; instrumentos en rodas tradicionales",
    description: "Práctica afrobrasileña que integra movimiento, música, cultura y juego marcial."
  },
  {
    name: "Vale Tudo",
    origin: "Brasil",
    period: "Moderno; siglo XX",
    tags: ["brazilian", "striking", "grappling", "competition"],
    focus: "Combate con reglas históricamente menos restrictivas",
    contact: "Muy alto históricamente",
    equipment: "Variable",
    description: "Formato histórico de combate, no una única disciplina técnica estandarizada."
  },
  {
    name: "MMA",
    origin: "Desarrollo internacional; influencias múltiples",
    period: "Moderno; siglo XX–XXI",
    tags: ["striking", "grappling", "fitness", "competition"],
    focus: "Integración de golpeo, lucha y suelo",
    contact: "Alto en combate",
    equipment: "Guantes y protecciones según práctica",
    description: "Deporte de combate que integra disciplinas bajo un reglamento definido."
  },

  // =====================================================
  // LUCHA, GRAPPLING Y DEPORTES DE COMBATE
  // =====================================================
  {
    name: "Lucha olímpica",
    origin: "Tradición internacional; deporte moderno",
    period: "Antigua tradición de lucha; reglamentos modernos",
    tags: ["grappling", "fitness", "competition"],
    focus: "Derribos, control y puntuación deportiva",
    contact: "Alto en competición",
    equipment: "Maillot y colchoneta",
    description: "Incluye principalmente las modalidades olímpicas de lucha libre y grecorromana."
  },
  {
    name: "Lucha grecorromana",
    origin: "Europa; deporte moderno",
    period: "Moderno con referencia clásica",
    tags: ["grappling", "fitness", "competition"],
    focus: "Agarres y proyecciones por encima de la cintura",
    contact: "Alto en competición",
    equipment: "Equipo deportivo",
    description: "Modalidad de lucha deportiva que restringe ataques a las piernas."
  },
  {
    name: "Lucha libre olímpica",
    origin: "Desarrollo internacional",
    period: "Deporte moderno",
    tags: ["grappling", "fitness", "competition"],
    focus: "Derribos y control usando también ataques a las piernas",
    contact: "Alto en competición",
    equipment: "Equipo deportivo",
    description: "Modalidad olímpica de lucha con técnicas de ataque a piernas permitidas."
  },
  {
    name: "Sambo",
    origin: "Unión Soviética",
    period: "Moderno; siglo XX",
    tags: ["grappling", "selfdefense", "competition", "fitness"],
    focus: "Derribos, control y llaves según modalidad",
    contact: "Variable",
    equipment: "Chaqueta y equipo según modalidad",
    description: "Sistema de combate con modalidades deportivas y de combate."
  },
  {
    name: "Combat Sambo",
    origin: "Unión Soviética",
    period: "Moderno; siglo XX",
    tags: ["grappling", "striking", "selfdefense", "competition"],
    focus: "Golpeo y lucha bajo reglamentos específicos",
    contact: "Alto en competición",
    equipment: "Protecciones según reglas",
    description: "Modalidad de sambo que incluye técnicas de golpeo además de lucha."
  },
  {
    name: "Catch wrestling",
    origin: "Reino Unido",
    period: "Moderno; siglos XIX–XX",
    tags: ["grappling", "competition", "fitness"],
    focus: "Lucha, control y sumisiones",
    contact: "Alto en práctica deportiva",
    equipment: "Equipo de lucha",
    description: "Tradición de lucha que influyó en varias formas de grappling moderno."
  },
  {
    name: "Lucha collar-and-elbow",
    origin: "Irlanda",
    period: "Histórico; siglos XVIII–XIX",
    tags: ["grappling", "traditional", "competition"],
    focus: "Agarres y derribos de lucha tradicional",
    contact: "Variable",
    equipment: "Según reconstrucción",
    description: "Tradición histórica irlandesa de lucha, actualmente menos extendida."
  },
  {
    name: "Glima",
    origin: "Islandia y tradición nórdica",
    period: "Histórico; práctica moderna",
    tags: ["grappling", "traditional", "competition"],
    focus: "Agarres, equilibrio y derribos",
    contact: "Variable",
    equipment: "Según modalidad",
    description: "Tradición nórdica de lucha con variantes y reglas propias."
  },
  {
    name: "Schwingen",
    origin: "Suiza",
    period: "Tradición histórica; deporte moderno",
    tags: ["grappling", "traditional", "competition", "fitness"],
    focus: "Derribos y lucha con agarres de vestimenta",
    contact: "Alto en competición",
    equipment: "Pantalón de lucha tradicional",
    description: "Deporte tradicional suizo de lucha."
  },
  {
    name: "Bökh",
    origin: "Mongolia",
    period: "Tradición histórica",
    tags: ["grappling", "traditional", "competition", "fitness"],
    focus: "Derribos, equilibrio y control",
    contact: "Alto en competición",
    equipment: "Vestimenta tradicional de lucha",
    description: "Lucha tradicional mongola."
  },
  {
    name: "Kurash",
    origin: "Asia Central; Uzbekistán",
    period: "Tradición histórica; deporte moderno",
    tags: ["grappling", "traditional", "competition"],
    focus: "Proyecciones y lucha con agarres de chaqueta",
    contact: "Alto en competición",
    equipment: "Uniforme de competición",
    description: "Tradición de lucha de Asia Central con reglamentos deportivos."
  },
  {
    name: "Pankration",
    origin: "Grecia antigua",
    period: "Antiguo; reconstrucciones modernas",
    tags: ["traditional", "striking", "grappling", "competition"],
    focus: "Combate antiguo que combinaba golpeo y lucha",
    contact: "Depende de la reconstrucción moderna",
    equipment: "Variable",
    description: "Disciplina de combate de la Antigüedad griega; la práctica actual es una reconstrucción, no una transmisión uniforme e ininterrumpida."
  },

  // =====================================================
  // ARTES EUROPEAS HISTÓRICAS Y ESGRIMA
  // =====================================================
  {
    name: "HEMA",
    origin: "Europa",
    period: "Fuentes medievales y modernas; recreación contemporánea",
    tags: ["weapons", "traditional", "competition", "fencing"],
    focus: "Estudio histórico de sistemas europeos de combate",
    contact: "Variable; se usan protecciones en combate",
    equipment: "Espadas de práctica y equipo protector",
    description: "Movimiento contemporáneo de estudio y práctica de artes marciales europeas históricas."
  },
  {
    name: "Esgrima histórica alemana",
    origin: "Territorios germánicos",
    period: "Fuentes medievales y renacentistas",
    tags: ["weapons", "traditional", "fencing"],
    focus: "Interpretación práctica de tratados históricos",
    contact: "Variable",
    equipment: "Armas de práctica y protecciones",
    description: "Familia de sistemas reconstruidos a partir de fuentes históricas europeas."
  },
  {
    name: "Kunst des Fechtens",
    origin: "Territorios germánicos",
    period: "Medieval y renacentista",
    tags: ["weapons", "traditional", "fencing"],
    focus: "Tradiciones históricas de esgrima germánica",
    contact: "Variable",
    equipment: "Equipo de práctica",
    description: "Término asociado a tradiciones y fuentes históricas de esgrima de habla alemana."
  },
  {
    name: "Esgrima italiana histórica",
    origin: "Italia",
    period: "Renacimiento y época moderna temprana",
    tags: ["weapons", "traditional", "fencing"],
    focus: "Espada, daga y sistemas históricos de esgrima",
    contact: "Variable",
    equipment: "Equipo de práctica y protección",
    description: "Familia de métodos documentados en tratados italianos históricos."
  },
  {
    name: "Esgrima deportiva",
    origin: "Europa; deporte internacional",
    period: "Moderno",
    tags: ["weapons", "fencing", "competition", "fitness"],
    focus: "Florete, espada y sable deportivos",
    contact: "Controlado por reglamento y protecciones",
    equipment: "Arma deportiva, máscara y traje protector",
    description: "Deporte de combate con tres armas reglamentarias."
  },
  {
    name: "Bartitsu",
    origin: "Reino Unido",
    period: "Finales del siglo XIX y comienzos del XX",
    tags: ["traditional", "selfdefense", "grappling", "striking"],
    focus: "Método ecléctico de defensa personal",
    contact: "Variable en reconstrucción moderna",
    equipment: "Depende de la práctica",
    description: "Sistema histórico que combinó métodos de combate europeos y asiáticos."
  },
  {
    name: "Pugilismo clásico",
    origin: "Europa",
    period: "Histórico; siglos XVIII–XIX",
    tags: ["traditional", "striking", "fitness"],
    focus: "Boxeo histórico y sus reglamentos antiguos",
    contact: "Variable en reconstrucción",
    equipment: "Según práctica",
    description: "Estudio histórico de formas antiguas de boxeo; no equivale exactamente al boxeo actual."
  },
  {
    name: "Ringen",
    origin: "Europa central",
    period: "Medieval y renacentista",
    tags: ["grappling", "traditional", "selfdefense"],
    focus: "Lucha cuerpo a cuerpo en fuentes históricas",
    contact: "Variable en práctica moderna",
    equipment: "Según reconstrucción",
    description: "Término histórico para tradiciones europeas de lucha, documentadas en tratados."
  },
  {
    name: "Juego del palo",
    origin: "Islas Canarias, España",
    period: "Tradición regional",
    tags: ["weapons", "traditional", "flow"],
    focus: "Juego tradicional con palo",
    contact: "Variable según modalidad",
    equipment: "Palo de práctica",
    description: "Tradición canaria con diferentes variantes regionales."
  },
  {
    name: "Garrote venezolano",
    origin: "Venezuela",
    period: "Tradición regional",
    tags: ["weapons", "traditional", "selfdefense"],
    focus: "Manejo tradicional del garrote",
    contact: "Variable",
    equipment: "Garrote de práctica",
    description: "Tradición regional de manejo de palo; su transmisión varía entre comunidades."
  },

  // =====================================================
  // SISTEMAS MODERNOS DE AUTODEFENSA Y COMBATE
  // =====================================================
  {
    name: "Krav Maga",
    origin: "Israel",
    period: "Moderno; siglo XX",
    tags: ["selfdefense", "striking", "grappling", "fitness"],
    focus: "Prevención, escape y respuesta ante amenazas",
    contact: "Variable según entrenamiento",
    equipment: "Según práctica",
    description: "Sistema moderno de autodefensa; la calidad y el enfoque dependen de la organización."
  },
  {
    name: "Defendo",
    origin: "Canadá",
    period: "Moderno; siglo XX",
    tags: ["selfdefense", "grappling", "striking"],
    focus: "Autodefensa y control",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Sistema moderno de defensa personal con historia propia."
  },
  {
    name: "Jeet Kune Do",
    origin: "Estados Unidos",
    period: "Moderno; siglo XX",
    tags: ["striking", "selfdefense", "grappling"],
    focus: "Adaptación, economía de movimiento y entrenamiento interdisciplinar",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Enfoque marcial desarrollado por Bruce Lee; existen interpretaciones y linajes diversos."
  },
  {
    name: "Kajukenbo",
    origin: "Hawái, Estados Unidos",
    period: "Moderno; siglo XX",
    tags: ["selfdefense", "striking", "grappling", "traditional"],
    focus: "Métodos combinados de golpeo y control",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Sistema híbrido desarrollado en Hawái."
  },
  {
    name: "Chun Kuk Do",
    origin: "Estados Unidos",
    period: "Moderno; siglo XX",
    tags: ["traditional", "striking", "selfdefense"],
    focus: "Programa marcial híbrido",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Sistema moderno con un programa propio y componentes de distintas tradiciones."
  },
  {
    name: "American Kenpo",
    origin: "Estados Unidos",
    period: "Moderno; siglo XX",
    tags: ["striking", "selfdefense", "traditional"],
    focus: "Combinaciones, defensa personal y secuencias técnicas",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Sistema moderno de kenpo desarrollado en Estados Unidos."
  },
  {
    name: "Combat Hapkido",
    origin: "Corea / desarrollo internacional moderno",
    period: "Moderno",
    tags: ["selfdefense", "grappling", "traditional"],
    focus: "Defensa personal y controles",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Interpretación moderna de métodos de hapkido; no es idéntica a todas las escuelas de hapkido."
  },
  {
    name: "Defensa personal civil",
    origin: "Internacional",
    period: "Contemporáneo",
    tags: ["selfdefense", "fitness"],
    focus: "Prevención, límites, escape y gestión de riesgos",
    contact: "Debe priorizar prácticas seguras",
    equipment: "Ninguno para fundamentos",
    description: "Entrenamiento práctico de prevención y respuesta segura; la calidad depende del programa y del instructor."
  },

  // =====================================================
  // ARTES DE MOVIMIENTO, SALUD Y SISTEMAS HÍBRIDOS
  // =====================================================
  {
    name: "Capoeira Angola",
    origin: "Brasil",
    period: "Tradición afrobrasileña",
    tags: ["brazilian", "flow", "traditional"],
    focus: "Juego, musicalidad, estrategia y movimiento",
    contact: "Variable",
    equipment: "Según roda",
    description: "Línea de capoeira que enfatiza el juego estratégico y elementos tradicionales."
  },
  {
    name: "Capoeira Regional",
    origin: "Brasil",
    period: "Moderno; siglo XX",
    tags: ["brazilian", "flow", "kicking", "fitness"],
    focus: "Secuencias, movilidad y juego marcial",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Línea moderna de capoeira asociada a una metodología de enseñanza específica."
  },
  {
    name: "Systema",
    origin: "Rusia",
    period: "Moderno; varias escuelas contemporáneas",
    tags: ["selfdefense", "flow", "traditional"],
    focus: "Movimiento, respiración, percepción y defensa",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Nombre usado por diversos sistemas modernos; conviene evaluar la metodología y sus afirmaciones."
  },
  {
    name: "Defensa personal basada en escenarios",
    origin: "Internacional",
    period: "Contemporáneo",
    tags: ["selfdefense", "fitness"],
    focus: "Prevención, toma de decisiones y escape",
    contact: "Debe ser progresivo y controlado",
    equipment: "Según ejercicios",
    description: "Enfoque educativo centrado en escenarios, seguridad y decisiones, no una tradición única."
  },
  {
    name: "Shintaido",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["japanese", "flow", "traditional"],
    focus: "Movimiento corporal, respiración y expresión marcial",
    contact: "Generalmente bajo",
    equipment: "Ninguno para fundamentos",
    description: "Práctica japonesa moderna que combina movimiento, principios marciales y desarrollo corporal."
  },
  {
    name: "Bujinkan Budo Taijutsu",
    origin: "Japón",
    period: "Sistema moderno con escuelas de linaje histórico",
    tags: ["japanese", "traditional", "selfdefense", "weapons"],
    focus: "Movimiento corporal, métodos tradicionales y armas de práctica",
    contact: "Variable",
    equipment: "Según escuela",
    description: "Organización moderna que reúne tradiciones de varias escuelas japonesas; la documentación histórica varía entre ellas."
  },

  // =====================================================
  // TRADICIONES ANTIGUAS: ENFOQUE HISTÓRICO
  // =====================================================
  {
    name: "Pankration griego antiguo",
    origin: "Grecia antigua",
    period: "Antiguo",
    tags: ["traditional", "striking", "grappling"],
    focus: "Combate de golpeo y lucha descrito en fuentes antiguas",
    contact: "Reconstrucción moderna variable",
    equipment: "Según reconstrucción",
    description: "Disciplina antigua estudiada mediante fuentes históricas y reconstrucciones contemporáneas."
  },
  {
    name: "Gladiatura romana",
    origin: "Roma antigua",
    period: "Antiguo",
    tags: ["weapons", "traditional", "fencing"],
    focus: "Estudio histórico de combate de gladiadores",
    contact: "Reconstrucción moderna con equipo de seguridad",
    equipment: "Réplicas y protecciones modernas",
    description: "Campo de estudio histórico y recreación experimental; no debe confundirse con un arte moderno estandarizado."
  },
  {
    name: "Pancracio moderno",
    origin: "Internacional",
    period: "Moderno; reconstrucciones y deportes",
    tags: ["striking", "grappling", "competition"],
    focus: "Combate deportivo inspirado parcialmente en tradiciones antiguas",
    contact: "Según reglamento",
    equipment: "Según modalidad",
    description: "Nombre utilizado por organizaciones modernas con reglas propias; no equivale automáticamente al pankration antiguo."
  },
  {
    name: "Lucha tradicional europea",
    origin: "Europa",
    period: "Histórico y regional",
    tags: ["grappling", "traditional", "competition"],
    focus: "Agarres, derribos y juegos de lucha regionales",
    contact: "Variable",
    equipment: "Según tradición",
    description: "Categoría para tradiciones regionales que necesitan identificarse por país o comunidad."
  },
  {
    name: "Lucha tradicional africana",
    origin: "Diversas regiones de África",
    period: "Tradiciones históricas y contemporáneas",
    tags: ["grappling", "traditional", "competition", "fitness"],
    focus: "Lucha, agarres y derribos regionales",
    contact: "Variable",
    equipment: "Según tradición",
    description: "Categoría de exploración; incluye tradiciones diferentes que deben registrarse individualmente por región."
  },
  {
    name: "Dambe",
    origin: "Hausa, África occidental",
    period: "Tradición histórica; práctica moderna",
    tags: ["striking", "traditional", "competition"],
    focus: "Combate tradicional de golpeo",
    contact: "Alto en competición tradicional",
    equipment: "Según tradición y evento",
    description: "Práctica de combate asociada a comunidades hausa, especialmente en Nigeria y países vecinos."
  },
  {
    name: "Laamb",
    origin: "Senegal",
    period: "Tradición histórica; deporte moderno",
    tags: ["grappling", "striking", "traditional", "competition"],
    focus: "Lucha senegalesa; algunas modalidades incluyen golpeo",
    contact: "Variable según reglas",
    equipment: "Según modalidad",
    description: "Deporte tradicional senegalés con importantes dimensiones culturales."
  },
  {
    name: "Nuba wrestling",
    origin: "Sudán",
    period: "Tradición regional",
    tags: ["grappling", "traditional", "competition"],
    focus: "Lucha tradicional de comunidades nuba",
    contact: "Variable",
    equipment: "Según tradición",
    description: "Familia de prácticas de lucha asociadas a comunidades de las montañas Nuba."
  },
  {
    name: "Engolo",
    origin: "Angola",
    period: "Tradición regional",
    tags: ["flow", "kicking", "traditional"],
    focus: "Juego de movimiento, patadas y esquivas",
    contact: "Variable",
    equipment: "Ninguno para fundamentos",
    description: "Tradición angoleña estudiada por su relación cultural e histórica con prácticas afroatlánticas."
  },
  {
    name: "Moraingy",
    origin: "Madagascar",
    period: "Tradición regional",
    tags: ["striking", "traditional", "competition"],
    focus: "Combate tradicional de golpeo",
    contact: "Variable",
    equipment: "Según tradición",
    description: "Práctica de combate de Madagascar con variantes regionales."
  },
  {
    name: "Bokh mongol",
    origin: "Mongolia",
    period: "Tradición histórica",
    tags: ["grappling", "traditional", "competition"],
    focus: "Lucha tradicional",
    contact: "Alto en competición",
    equipment: "Vestimenta tradicional",
    description: "Variante de denominación frecuente para la lucha mongola; se normaliza aquí como Bökh."
  },
  {
    name: "Malla-yuddha histórico",
    origin: "India",
    period: "Antiguo; fuentes históricas",
    tags: ["grappling", "traditional"],
    focus: "Lucha descrita en textos y tradiciones del sur de Asia",
    contact: "Reconstrucción variable",
    equipment: "Según práctica",
    description: "Entrada histórica para investigar fuentes, terminología y continuidades regionales."
  },

  // =====================================================
  // MODERNAS Y DE NICHO
  // =====================================================
  {
    name: "10th Planet Jiu-Jitsu",
    origin: "Estados Unidos",
    period: "Moderno; siglo XXI",
    tags: ["grappling", "brazilian", "competition"],
    focus: "Grappling sin kimono y sistema de entrenamiento específico",
    contact: "Variable",
    equipment: "Habitualmente sin kimono",
    description: "Sistema contemporáneo de jiu-jitsu sin kimono, no una tradición independiente antigua."
  },
  {
    name: "Submission wrestling",
    origin: "Internacional",
    period: "Moderno",
    tags: ["grappling", "competition", "fitness"],
    focus: "Control, escapes y sumisiones",
    contact: "Variable",
    equipment: "Normalmente sin kimono",
    description: "Categoría deportiva que reúne distintos enfoques de lucha de sumisión."
  },
  {
    name: "Combat wrestling",
    origin: "Japón",
    period: "Moderno",
    tags: ["grappling", "striking", "competition"],
    focus: "Combate híbrido y lucha bajo reglas específicas",
    contact: "Variable",
    equipment: "Según reglamento",
    description: "Nombre usado por formatos y sistemas de combate con reglas propias; hay que identificar la organización concreta."
  },
  {
    name: "Shoot wrestling",
    origin: "Japón",
    period: "Moderno; siglo XX",
    tags: ["grappling", "striking", "competition"],
    focus: "Lucha híbrida y métodos de combate deportivo",
    contact: "Variable",
    equipment: "Según modalidad",
    description: "Familia de prácticas y formatos japoneses que influyeron en varias disciplinas híbridas."
  },
  {
    name: "Combat jiu-jitsu",
    origin: "Estados Unidos",
    period: "Contemporáneo",
    tags: ["grappling", "striking", "competition"],
    focus: "Grappling con reglas que permiten ciertos golpes",
    contact: "Variable según reglamento",
    equipment: "Según organización",
    description: "Formato deportivo moderno derivado del grappling, con reglas particulares."
  },
  {
    name: "Tricking marcial",
    origin: "Internacional",
    period: "Contemporáneo",
    tags: ["kicking", "flow", "fitness"],
    focus: "Patadas acrobáticas, giros y control corporal",
    contact: "Normalmente sin combate",
    equipment: "Superficie de práctica apropiada",
    description: "Práctica acrobática contemporánea con influencias de artes marciales y gimnasia."
  },
  {
    name: "Parkour marcial",
    origin: "Internacional",
    period: "Contemporáneo",
    tags: ["flow", "fitness"],
    focus: "Desplazamiento y superación de obstáculos",
    contact: "Sin combate",
    equipment: "Entorno seguro",
    description: "Categoría de entrenamiento físico y desplazamiento, no un arte marcial tradicional por sí mismo."
  }
];

(() => {
  "use strict";

  const catalog = window.MAI_DISCIPLINES;

  if (!Array.isArray(catalog)) {
    throw new Error("MAI: no se encontró un catálogo válido.");
  }

  const CANONICAL_NAMES = {
    "chin na": "Qinna",
    "bokator camboyano": "Bokator",
    "bokh mongol": "Bökh",
    "malla-yuddha histórico": "Malla-yuddha",
    "pankration griego antiguo": "Pankration"
  };

  const HISTORICAL_NAMES = new Set([
    "pankration",
    "gladiatura romana",
    "lucha collar-and-elbow",
    "ringen",
    "pugilismo clásico",
    "esgrima histórica alemana",
    "kunst des fechtens",
    "esgrima italiana histórica",
    "malla-yuddha",
    "lucha tradicional europea",
    "lucha tradicional africana"
  ]);

  const COMPETITION_FORMATS = new Set([
    "mma",
    "vale tudo",
    "pancracio moderno",
    "combat jiu-jitsu",
    "submission wrestling",
    "lucha olímpica",
    "lucha grecorromana",
    "lucha libre olímpica",
    "esgrima deportiva"
  ]);

  const TRAINING_METHODS = new Set([
    "defensa personal civil",
    "defensa personal basada en escenarios",
    "tricking marcial",
    "parkour marcial"
  ]);

  const CATEGORIES = new Set([
    "lucha tradicional europea",
    "lucha tradicional africana",
    "kung fu / wushu tradicional",
    "võ cổ truyền",
    "lucha olímpica"
  ]);

  const normalizeText = value =>
    typeof value === "string"
      ? value.trim().replace(/\s+/g, " ")
      : "";

  const normalizeKey = value =>
    normalizeText(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  function inferType(item) {
    const key = normalizeKey(item.name);

    if (TRAINING_METHODS.has(key)) return "training_method";
    if (HISTORICAL_NAMES.has(key)) return "historical_practice";
    if (COMPETITION_FORMATS.has(key)) return "competition_format";
    if (CATEGORIES.has(key)) return "category";

    if (
      /^(shotokan|goju-ryu|shito-ryu|wado-ryu|kyokushin|capoeira angola|capoeira regional|american kenpo|combat hapkido|combat sambo|10th planet jiu-jitsu|baguazhang cheng)$/.test(key)
    ) {
      return "style";
    }

    if (item.tags.includes("competition")) {
      return "combat_sport";
    }

    return "martial_art";
  }

  function inferCombatType(item) {
    const tags = item.tags;
    const key = normalizeKey(item.name);

    if (
      key.includes("parkour") ||
      key.includes("tricking") ||
      key.includes("shintaido") ||
      key.includes("tai chi") ||
      key.includes("taijiquan")
    ) {
      return "movement_or_form";
    }

    if (tags.includes("weapons") && (
      tags.includes("striking") ||
      tags.includes("grappling") ||
      tags.includes("selfdefense")
    )) {
      return "mixed";
    }

    if (tags.includes("weapons") || tags.includes("fencing")) {
      return "weapon_based";
    }

    if (tags.includes("striking") && tags.includes("grappling")) {
      return "mixed";
    }

    if (tags.includes("grappling")) return "grappling";
    if (tags.includes("striking") || tags.includes("kicking")) {
      return "striking";
    }

    return "varied";
  }

  function inferContactLevel(contact) {
    const value = normalizeKey(contact);

    if (
      value.includes("sin combate") ||
      value.includes("normalmente sin combate") ||
      value.includes("generalmente bajo")
    ) {
      return "none_or_low";
    }

    if (
      value.includes("muy alto") ||
      value.includes("muy intensa")
    ) {
      return "very_high";
    }

    if (value.includes("alto")) return "high";

    if (
      value.includes("controlado") ||
      value.includes("controlada")
    ) {
      return "controlled";
    }

    if (
      value.includes("bajo") ||
      value.includes("normalmente sin combate")
    ) {
      return "low";
    }

    return "variable";
  }

  for (const item of catalog) {
    item.name = normalizeText(item.name);
    item.origin = normalizeText(item.origin);
    item.period = normalizeText(item.period);
    item.focus = normalizeText(item.focus);
    item.contact = normalizeText(item.contact);
    item.equipment = normalizeText(item.equipment);
    item.description = normalizeText(item.description);

    item.tags = [...new Set(
      (Array.isArray(item.tags) ? item.tags : [])
        .map(tag => normalizeKey(tag))
        .filter(Boolean)
    )];

    item.aliases = Array.isArray(item.aliases)
      ? [...new Set(item.aliases.map(normalizeText).filter(Boolean))]
      : [];

    item.relatedEntries = Array.isArray(item.relatedEntries)
      ? item.relatedEntries
      : [];

    item.type = item.type || inferType(item);
    item.combatType = item.combatType || inferCombatType(item);
    item.contactLevel = item.contactLevel || inferContactLevel(item.contact);

    item.includesWeapons = item.tags.includes("weapons");

    item.searchName = normalizeKey(item.name);

    const canonical = CANONICAL_NAMES[normalizeKey(item.name)];

    if (canonical) {
      item.aliases = [...new Set([...item.aliases, item.name])];
      item.name = canonical;
      item.searchName = normalizeKey(canonical);
    }
  }

  const sumo = catalog.find(
    item => normalizeKey(item.name) === "sumo"
  );

  if (sumo) {
    sumo.equipment = "Mawashi y dohyo";
  }

  const merged = new Map();

  for (const item of catalog) {
    const key = normalizeKey(item.name);
    const existing = merged.get(key);

    if (!existing) {
      merged.set(key, item);
      continue;
    }

    existing.aliases = [...new Set([
      ...existing.aliases,
      ...item.aliases,
      item.name
    ])];

    existing.tags = [...new Set([
      ...existing.tags,
      ...item.tags
    ])];

    existing.relatedEntries.push({
      name: item.name,
      origin: item.origin,
      period: item.period,
      focus: item.focus,
      contact: item.contact,
      equipment: item.equipment,
      description: item.description
    });
  }

  window.MAI_DISCIPLINES = [...merged.values()];

  window.MAIDataValidator = {
    validate() {
      const errors = [];
      const warnings = [];
      const names = new Set();

      window.MAI_DISCIPLINES.forEach((item, index) => {
        const label = `Entrada ${index + 1}`;

        if (!item.name) {
          errors.push(`${label}: falta el nombre.`);
        }

        if (names.has(normalizeKey(item.name))) {
          errors.push(`Nombre duplicado: ${item.name}.`);
        }

        names.add(normalizeKey(item.name));

        for (const field of [
          "origin",
          "period",
          "focus",
          "contact",
          "equipment",
          "description"
        ]) {
          if (!item[field]) {
            warnings.push(`${item.name}: falta el campo "${field}".`);
          }
        }

        if (!Array.isArray(item.tags)) {
          errors.push(`${item.name}: las etiquetas no son válidas.`);
        }

        if (!item.type) {
          errors.push(`${item.name}: falta el tipo de registro.`);
        }
      });

      return {
        valid: errors.length === 0,
        total: window.MAI_DISCIPLINES.length,
        errors,
        warnings
      };
    },

    findByName(name) {
      const query = normalizeKey(name);

      return window.MAI_DISCIPLINES.find(item =>
        normalizeKey(item.name) === query ||
        item.aliases.some(alias => normalizeKey(alias) === query)
      ) || null;
    },

    filterByType(type) {
      return window.MAI_DISCIPLINES.filter(
        item => item.type === type
      );
    },

    filterByCombatType(combatType) {
      return window.MAI_DISCIPLINES.filter(
        item => item.combatType === combatType
      );
    },

    search(query) {
      const term = normalizeKey(query);

      if (!term) return [];

      return window.MAI_DISCIPLINES.filter(item =>
        normalizeKey(item.name).includes(term) ||
        item.aliases.some(alias => normalizeKey(alias).includes(term)) ||
        normalizeKey(item.origin).includes(term) ||
        normalizeKey(item.focus).includes(term) ||
        item.tags.some(tag => normalizeKey(tag).includes(term))
      );
    }
  };

  console.info(
    `MAI: ${window.MAI_DISCIPLINES.length} fichas normalizadas.`
  );

  const result = window.MAIDataValidator.validate();

  if (!result.valid) {
    console.error("MAI: errores de validación", result.errors);
  }

  if (result.warnings.length) {
    console.warn("MAI: advertencias del catálogo", result.warnings);
  }
})();