/*Juan Esteban JM*/
"use strict";

window.MAITrainingEngine = (() => {

  const VERSION = "1.0.0";

  const LEVELS = {
    basic: {
      label: "Básico",
      rounds: 2,
      workSeconds: 30,
      restSeconds: 45,
      intensity: "baja a moderada",
      effort: 5,
      technicalComplexity: 1,
      conditioningMultiplier: 0.8
    },
    intermediate: {
      label: "Intermedio",
      rounds: 3,
      workSeconds: 40,
      restSeconds: 35,
      intensity: "moderada",
      effort: 6,
      technicalComplexity: 2,
      conditioningMultiplier: 1
    },
    advanced: {
      label: "Avanzado",
      rounds: 4,
      workSeconds: 50,
      restSeconds: 30,
      intensity: "moderada a alta",
      effort: 7,
      technicalComplexity: 3,
      conditioningMultiplier: 1.15
    }
  };

  const GOALS = {
    technique: {
      label: "Técnica",
      technicalWeight: 3,
      conditioningWeight: 1,
      mobilityWeight: 1
    },
    fitness: {
      label: "Condición física",
      technicalWeight: 1,
      conditioningWeight: 3,
      mobilityWeight: 1
    },
    mobility: {
      label: "Movilidad y coordinación",
      technicalWeight: 1,
      conditioningWeight: 1,
      mobilityWeight: 3
    },
    discipline: {
      label: "Constancia y disciplina",
      technicalWeight: 2,
      conditioningWeight: 2,
      mobilityWeight: 1
    }
  };

  const EQUIPMENT = {
    none: {
      label: "Sin material",
      allowed: ["none", "floor", "wall"],
      description:
        "Se priorizan ejercicios individuales que no necesitan equipo."
    },
    basic: {
      label: "Material básico",
      allowed: [
        "none", "floor", "wall", "mat", "rope",
        "band", "light_weights", "timer"
      ],
      description:
        "Se permiten elementos básicos, siempre que sean apropiados."
    },
    bag: {
      label: "Saco o equipo específico",
      allowed: [
        "none", "floor", "wall", "mat", "rope",
        "band", "light_weights", "timer", "bag",
        "punching_pads", "gloves", "partner",
        "weapon_trainer", "specialized"
      ],
      description:
        "Se permite equipo especializado cuando el ejercicio lo requiere."
    }
  };

  const SESSION_MINUTES = [20, 30, 45, 60, 75, 90];

  const FAMILY_LABELS = {
    striking: "Golpeo con manos",
    kicking: "Patadas y golpeo con piernas",
    mixed_striking: "Golpeo mixto",
    grappling: "Agarres, controles y lucha",
    throws: "Proyecciones y derribos",
    ground: "Trabajo en suelo",
    traditional: "Práctica tradicional",
    weapons: "Armas y disciplinas armadas",
    fencing: "Esgrima y combate con armas",
    movement: "Movimiento, fluidez y coordinación",
    selfdefense: "Defensa personal",
    general: "Preparación física general"
  };

  const EXERCISES = [

    {
      id: "warm_march",
      name: "Marcha activa",
      type: "warmup",
      family: ["general"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Marcha a ritmo progresivo, mueve los brazos y aumenta suavemente la temperatura corporal.",
      purpose: "Elevar gradualmente la temperatura corporal."
    },
    {
      id: "warm_jog",
      name: "Trote suave en el sitio",
      type: "warmup",
      family: ["general"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Trota suavemente sin buscar velocidad. Reduce el impacto si lo necesitas.",
      purpose: "Preparar el sistema cardiovascular."
    },
    {
      id: "warm_jacks",
      name: "Saltos de apertura controlados",
      type: "warmup",
      family: ["general"],
      equipment: ["none"],
      levels: [2, 3],
      minutes: 2,
      risk: "low",
      instructions:
        "Abre y cierra brazos y piernas a un ritmo cómodo. Puedes hacerlo sin saltar.",
      purpose: "Activar el cuerpo completo."
    },
    {
      id: "warm_joints",
      name: "Movilidad articular progresiva",
      type: "warmup",
      family: ["general", "movement"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Moviliza cuello sin círculos forzados, hombros, muñecas, caderas, rodillas y tobillos.",
      purpose: "Preparar articulaciones para el trabajo posterior."
    },
    {
      id: "warm_footwork",
      name: "Desplazamientos suaves",
      type: "warmup",
      family: ["striking", "kicking", "mixed_striking", "fencing"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Avanza, retrocede y desplázate lateralmente manteniendo equilibrio y control.",
      purpose: "Preparar pies, postura y orientación espacial."
    },
    {
      id: "warm_shadow",
      name: "Sombra técnica suave",
      type: "warmup",
      family: ["striking", "kicking", "mixed_striking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Realiza movimientos técnicos en el aire, sin potencia máxima y sin bloquear las articulaciones.",
      purpose: "Conectar coordinación, postura y respiración."
    },
    {
      id: "warm_balance",
      name: "Equilibrio dinámico",
      type: "warmup",
      family: ["movement", "kicking", "traditional", "weapons"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Alterna apoyos, cambios de peso y pasos lentos. Usa una pared como apoyo si hace falta.",
      purpose: "Activar control postural y estabilidad."
    },

    {
      id: "strike_guard",
      name: "Guardia y postura",
      type: "technique",
      family: ["striking", "mixed_striking", "selfdefense"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Practica una postura equilibrada, manos en guardia y mentón relajado. Adapta la guardia a tu disciplina.",
      purpose: "Establecer una base estable y proteger la postura."
    },
    {
      id: "strike_jab",
      name: "Jab al aire",
      type: "technique",
      family: ["striking", "mixed_striking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Extiende el brazo de forma controlada, mantén el hombro activo y regresa a la guardia sin bloquear el codo.",
      purpose: "Coordinar extensión, recuperación y equilibrio."
    },
    {
      id: "strike_cross",
      name: "Recto posterior al aire",
      type: "technique",
      family: ["striking", "mixed_striking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Practica lentamente el movimiento del brazo y la rotación corporal sin forzar rodillas, cadera ni hombro.",
      purpose: "Trabajar coordinación y transferencia de peso."
    },
    {
      id: "strike_combinations",
      name: "Combinaciones de manos en sombra",
      type: "technique",
      family: ["striking", "mixed_striking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 5,
      risk: "low",
      instructions:
        "Combina dos o tres movimientos que ya conozcas. Mantén técnica limpia y vuelve a la guardia.",
      purpose: "Mejorar secuenciación y memoria motora."
    },
    {
      id: "strike_defense",
      name: "Defensa y recuperación de guardia",
      type: "technique",
      family: ["striking", "mixed_striking", "selfdefense"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Ensaya movimientos defensivos básicos en solitario, sin imaginar impactos que provoquen movimientos bruscos.",
      purpose: "Practicar control, posición y recuperación."
    },
    {
      id: "strike_bag",
      name: "Trabajo técnico en saco",
      type: "technique",
      family: ["striking", "mixed_striking"],
      equipment: ["bag", "gloves"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Usa vendas y guantes adecuados. Prioriza precisión y control; evita golpes máximos si no dominas la técnica.",
      purpose: "Aplicar movimientos al saco con control."
    },
    {
      id: "strike_pads",
      name: "Precisión con manoplas",
      type: "technique",
      family: ["striking", "mixed_striking"],
      equipment: ["punching_pads", "gloves", "partner"],
      levels: [2, 3],
      minutes: 4,
      risk: "moderate",
      partner: true,
      instructions:
        "Practica combinaciones acordadas con un compañero que sepa manejar las manoplas.",
      purpose: "Mejorar precisión y coordinación con un objetivo."
    },
    {
      id: "strike_shadow_rounds",
      name: "Asaltos de sombra técnica",
      type: "technique",
      family: ["striking", "mixed_striking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 5,
      risk: "low",
      instructions:
        "Alterna desplazamientos, defensas y combinaciones conocidas. No sacrifiques técnica por velocidad.",
      purpose: "Integrar habilidades en secuencias continuas."
    },

    {
      id: "kick_chamber",
      name: "Elevación y recogida controlada de rodilla",
      type: "technique",
      family: ["kicking", "mixed_striking", "traditional"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Eleva la rodilla solo hasta donde mantengas la pelvis estable; vuelve al apoyo sin perder equilibrio.",
      purpose: "Practicar la preparación y recuperación de una patada."
    },
    {
      id: "kick_front",
      name: "Patada frontal técnica al aire",
      type: "technique",
      family: ["kicking", "mixed_striking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Usa una altura cómoda, extiende sin bloquear la rodilla y recoge la pierna antes de apoyar.",
      purpose: "Desarrollar coordinación y control de la pierna."
    },
    {
      id: "kick_side",
      name: "Preparación de patada lateral",
      type: "technique",
      family: ["kicking", "traditional"],
      equipment: ["none", "wall"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Practica la posición de preparación y el equilibrio. Apóyate en una pared si aún no controlas la postura.",
      purpose: "Trabajar estabilidad y alineación corporal."
    },
    {
      id: "kick_low",
      name: "Mecánica básica de patada baja",
      type: "technique",
      family: ["kicking", "mixed_striking"],
      equipment: ["none"],
      levels: [2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Ensaya despacio el movimiento sin golpear personas ni articulaciones. Aprende primero la mecánica con un instructor.",
      purpose: "Familiarizarse con la coordinación de la patada."
    },
    {
      id: "kick_balance",
      name: "Equilibrio sobre una pierna",
      type: "technique",
      family: ["kicking", "movement", "traditional"],
      equipment: ["none", "wall"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Mantén la postura sobre una pierna durante periodos breves; alterna lados y usa apoyo cuando sea necesario.",
      purpose: "Mejorar estabilidad y control del apoyo."
    },
    {
      id: "kick_target",
      name: "Patadas controladas a objetivo",
      type: "technique",
      family: ["kicking", "mixed_striking"],
      equipment: ["punching_pads", "partner"],
      levels: [2, 3],
      minutes: 4,
      risk: "moderate",
      partner: true,
      instructions:
        "Usa un objetivo apropiado y un compañero informado. Empieza con baja potencia y distancia segura.",
      purpose: "Practicar distancia y precisión."
    },

    {
      id: "mixed_knees_shadow",
      name: "Mecánica de rodillazos en sombra",
      type: "technique",
      family: ["mixed_striking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Practica el movimiento sin contacto, con equilibrio y regreso controlado a la postura.",
      purpose: "Coordinar piernas, tronco y estabilidad."
    },
    {
      id: "mixed_elbow_shadow",
      name: "Trayectorias de codo en sombra",
      type: "technique",
      family: ["mixed_striking"],
      equipment: ["none"],
      levels: [2, 3],
      minutes: 3,
      risk: "moderate",
      instructions:
        "Practica únicamente al aire y con espacio libre. El uso de codos con compañero requiere instrucción y protección.",
      purpose: "Reconocer trayectorias técnicas sin contacto."
    },
    {
      id: "mixed_footwork",
      name: "Desplazamiento y cambio de ángulo",
      type: "technique",
      family: ["mixed_striking", "striking", "kicking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Combina pasos cortos, pivotes suaves y recuperación de la guardia.",
      purpose: "Mejorar movilidad y orientación."
    },

    {
      id: "grapple_stance",
      name: "Postura y desplazamiento de grappling",
      type: "technique",
      family: ["grappling", "throws"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Mantén una base estable, rodillas flexionadas sin dolor y movimientos cortos en varias direcciones.",
      purpose: "Desarrollar postura y control de distancia."
    },
    {
      id: "grapple_level",
      name: "Cambios de nivel controlados",
      type: "technique",
      family: ["grappling", "throws"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Flexiona cadera y rodillas con espalda controlada; evita bajar de forma brusca o cargar la zona lumbar.",
      purpose: "Practicar cambios de nivel y equilibrio."
    },
    {
      id: "grapple_sprawl",
      name: "Entrada y salida de base",
      type: "technique",
      family: ["grappling"],
      equipment: ["mat"],
      levels: [2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Practica solo una versión que ya conozcas, sobre superficie apropiada y sin caer de golpe sobre hombros o rodillas.",
      purpose: "Mejorar coordinación de base y recuperación."
    },
    {
      id: "grapple_technical_standup",
      name: "Levantada técnica individual",
      type: "technique",
      family: ["grappling", "ground", "selfdefense"],
      equipment: ["mat"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Desde una posición baja estable, practica levantarte manteniendo equilibrio y espacio. Usa una colchoneta.",
      purpose: "Practicar una transición controlada del suelo a la posición de pie."
    },
    {
      id: "grapple_bridge",
      name: "Puente de cadera controlado",
      type: "technique",
      family: ["grappling", "ground"],
      equipment: ["mat"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "moderate",
      instructions:
        "Desde el suelo, eleva la cadera dentro de un rango cómodo y baja lentamente. No cargues el cuello.",
      purpose: "Practicar movilidad de cadera y control del tronco."
    },
    {
      id: "grapple_hip_movement",
      name: "Desplazamiento de cadera en suelo",
      type: "technique",
      family: ["grappling", "ground"],
      equipment: ["mat"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Sobre una superficie acolchada, practica movimientos de cadera lentos y controlados, sin torsiones bruscas.",
      purpose: "Desarrollar movilidad útil para transiciones en suelo."
    },
    {
      id: "grapple_shrimp",
      name: "Desplazamiento lateral de cadera",
      type: "technique",
      family: ["grappling", "ground"],
      equipment: ["mat"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Practica desplazamientos cortos de cadera sobre colchoneta, cuidando rodillas, espalda y cuello.",
      purpose: "Mejorar movilidad y control en el suelo."
    },
    {
      id: "grapple_solo_flow",
      name: "Secuencia individual de movimientos de suelo",
      type: "technique",
      family: ["grappling", "ground", "movement"],
      equipment: ["mat"],
      levels: [1, 2, 3],
      minutes: 5,
      risk: "moderate",
      instructions:
        "Une movimientos de suelo que ya conozcas. Evita llaves, estrangulaciones o transiciones peligrosas practicadas sin compañero experto.",
      purpose: "Mejorar continuidad y memoria motora."
    },
    {
      id: "grapple_breakfall",
      name: "Preparación de caídas y seguridad",
      type: "technique",
      family: ["grappling", "throws", "traditional"],
      equipment: ["mat", "specialized"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "supervised",
      instructions:
        "La técnica de caída debe aprenderse con un instructor y colchonetas adecuadas. Sin supervisión, practica solo postura y preparación sin caer.",
      purpose: "Introducir principios de seguridad para las caídas."
    },
    {
      id: "grapple_throw_drill",
      name: "Mecánica preparatoria de proyecciones",
      type: "technique",
      family: ["throws", "grappling", "traditional"],
      equipment: ["partner", "mat", "specialized"],
      levels: [2, 3],
      minutes: 5,
      risk: "supervised",
      partner: true,
      instructions:
        "La entrada, el desequilibrio y la proyección con compañero requieren instructor, cooperación y colchonetas apropiadas.",
      purpose: "Estudiar principios de desequilibrio y posición."
    },
    {
      id: "grapple_grip",
      name: "Fuerza de agarre sin compañero",
      type: "conditioning",
      family: ["grappling", "throws", "weapons"],
      equipment: ["none", "towel", "light_weights"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Aprieta y suelta una toalla o realiza agarres isométricos suaves. Detente si aparece dolor en dedos o muñecas.",
      purpose: "Desarrollar resistencia básica de manos y antebrazos."
    },
    {
      id: "grapple_pummel",
      name: "Trabajo de posición de brazos con compañero",
      type: "technique",
      family: ["grappling"],
      equipment: ["partner", "mat"],
      levels: [2, 3],
      minutes: 4,
      risk: "moderate",
      partner: true,
      instructions:
        "Practica únicamente con un compañero cooperativo y con intensidad baja; no fuerces cuello ni articulaciones.",
      purpose: "Desarrollar sensibilidad posicional y coordinación."
    },

    {
      id: "weapon_footwork",
      name: "Desplazamientos de esgrima",
      type: "technique",
      family: ["weapons", "fencing"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Practica avances, retrocesos y recuperación de guardia sin cruzar los pies de forma descontrolada.",
      purpose: "Mejorar distancia, equilibrio y desplazamiento."
    },
    {
      id: "weapon_guard",
      name: "Posturas y guardias sin arma",
      type: "technique",
      family: ["weapons", "fencing", "traditional"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Ensaya posturas reconocidas de tu disciplina sin arma, manteniendo articulaciones relajadas y espacio libre.",
      purpose: "Memorizar posturas y transiciones."
    },
    {
      id: "weapon_wooden_solo",
      name: "Coordinación individual con arma de práctica",
      type: "technique",
      family: ["weapons", "fencing"],
      equipment: ["weapon_trainer"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Utiliza solo un simulador apropiado, en un espacio despejado y siguiendo formas que conozcas. Nunca uses armas reales.",
      purpose: "Coordinar postura, trayectoria y control del implemento."
    },
    {
      id: "weapon_forms",
      name: "Secuencia técnica individual",
      type: "technique",
      family: ["weapons", "fencing", "traditional"],
      equipment: ["none", "weapon_trainer"],
      levels: [1, 2, 3],
      minutes: 5,
      risk: "moderate",
      instructions:
        "Repite una secuencia de tu escuela a velocidad controlada. No inventes trayectorias ni practiques cortes cerca de otras personas.",
      purpose: "Mejorar memoria técnica y continuidad."
    },
    {
      id: "weapon_precision",
      name: "Precisión sobre objetivo seguro",
      type: "technique",
      family: ["weapons", "fencing"],
      equipment: ["weapon_trainer", "specialized"],
      levels: [2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Usa únicamente material de entrenamiento y un objetivo diseñado para ello, con espacio libre alrededor.",
      purpose: "Mejorar precisión y control del implemento."
    },
    {
      id: "weapon_partner",
      name: "Ejercicio de distancia con compañero",
      type: "technique",
      family: ["weapons", "fencing"],
      equipment: ["weapon_trainer", "partner", "specialized"],
      levels: [2, 3],
      minutes: 4,
      risk: "supervised",
      partner: true,
      instructions:
        "El trabajo con armas entre personas requiere protección específica, reglas claras y supervisión de un instructor.",
      purpose: "Estudiar distancia y sincronización en condiciones controladas."
    },

    {
      id: "movement_forms",
      name: "Práctica de formas o secuencias",
      type: "technique",
      family: ["traditional", "movement"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 5,
      risk: "low",
      instructions:
        "Repite una forma o secuencia que conozcas, prestando atención a postura, respiración, dirección y transiciones.",
      purpose: "Desarrollar memoria, coordinación y precisión."
    },
    {
      id: "movement_slow",
      name: "Secuencia lenta de coordinación",
      type: "technique",
      family: ["movement", "traditional"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 5,
      risk: "low",
      instructions:
        "Enlaza movimientos lentos con respiración tranquila, sin forzar rangos articulares.",
      purpose: "Mejorar control corporal y continuidad."
    },
    {
      id: "movement_pivots",
      name: "Pivotes y cambios de dirección",
      type: "technique",
      family: ["movement", "striking", "kicking", "fencing"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Realiza giros cortos, mantén la base estable y evita torsionar la rodilla sobre un pie fijo.",
      purpose: "Mejorar orientación y desplazamiento."
    },
    {
      id: "movement_coordination",
      name: "Coordinación de brazos y piernas",
      type: "technique",
      family: ["movement", "general", "traditional"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Combina pasos simples con movimientos de brazos; aumenta la complejidad solo cuando el patrón sea estable.",
      purpose: "Desarrollar coordinación motora."
    },
    {
      id: "movement_capoeira",
      name: "Secuencia básica de movimiento fluido",
      type: "technique",
      family: ["movement"],
      equipment: ["mat"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Practica movimientos fluidos de bajo impacto que ya domines. Deja acrobacias y movimientos invertidos para clases supervisadas.",
      purpose: "Trabajar ritmo, fluidez y orientación espacial."
    },

    {
      id: "self_awareness",
      name: "Conciencia situacional",
      type: "technique",
      family: ["selfdefense", "general"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Observa salidas, obstáculos y distancias en un entorno cotidiano. Prioriza evitar riesgos y pedir ayuda.",
      purpose: "Practicar prevención y evaluación del entorno."
    },
    {
      id: "self_boundary",
      name: "Comunicación de límites",
      type: "technique",
      family: ["selfdefense"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Practica decir con voz clara frases breves como 'detente' o 'necesito espacio', sin buscar confrontación.",
      purpose: "Reforzar comunicación, límites y desescalada."
    },
    {
      id: "self_distance",
      name: "Distancia y salida segura",
      type: "technique",
      family: ["selfdefense", "movement"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Ensaya dar pasos hacia una salida despejada manteniendo el equilibrio y evitando obstáculos.",
      purpose: "Practicar evasión y retirada segura."
    },
    {
      id: "self_guard",
      name: "Postura protectora y desplazamiento",
      type: "technique",
      family: ["selfdefense", "striking"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Practica una postura equilibrada con manos abiertas en posición no provocadora y espacio para retirarte.",
      purpose: "Combinar protección básica con desescalada."
    },

    {
      id: "cond_squat",
      name: "Sentadilla con peso corporal",
      type: "conditioning",
      family: ["general", "kicking", "grappling", "throws"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Baja solo hasta un rango cómodo, mantén los pies apoyados y las rodillas alineadas con los pies.",
      purpose: "Desarrollar fuerza funcional de piernas."
    },
    {
      id: "cond_lunge",
      name: "Zancadas controladas",
      type: "conditioning",
      family: ["general", "kicking", "movement"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Da un paso corto, baja de forma controlada y mantén el equilibrio. Sustituye por pasos atrás si lo necesitas.",
      purpose: "Trabajar fuerza unilateral y estabilidad."
    },
    {
      id: "cond_pushup",
      name: "Flexiones adaptadas",
      type: "conditioning",
      family: ["general", "striking", "mixed_striking", "grappling"],
      equipment: ["floor", "wall"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Haz flexiones contra la pared, sobre rodillas o en el suelo según tu nivel. Mantén el tronco alineado.",
      purpose: "Desarrollar fuerza de empuje."
    },
    {
      id: "cond_plank",
      name: "Plancha abdominal",
      type: "conditioning",
      family: ["general", "striking", "grappling", "throws"],
      equipment: ["floor", "mat"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Mantén el abdomen activo y respira. Reduce el tiempo o apoya las rodillas si pierdes la postura.",
      purpose: "Desarrollar estabilidad del tronco."
    },
    {
      id: "cond_deadbug",
      name: "Control abdominal en el suelo",
      type: "conditioning",
      family: ["general", "grappling", "ground"],
      equipment: ["floor", "mat"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Alterna lentamente brazo y pierna contrarios manteniendo la espalda cómoda y la respiración continua.",
      purpose: "Mejorar coordinación y control del tronco."
    },
    {
      id: "cond_mountain",
      name: "Escaladores a ritmo controlado",
      type: "conditioning",
      family: ["general", "striking", "grappling"],
      equipment: ["floor", "mat"],
      levels: [2, 3],
      minutes: 3,
      risk: "moderate",
      instructions:
        "Desde una posición de plancha estable, alterna rodillas sin hundir la espalda. Reduce velocidad si pierdes control.",
      purpose: "Trabajar resistencia y estabilidad."
    },
    {
      id: "cond_burpee_low",
      name: "Transición de pie a apoyo",
      type: "conditioning",
      family: ["general"],
      equipment: ["floor", "mat"],
      levels: [2, 3],
      minutes: 3,
      risk: "moderate",
      instructions:
        "Practica una transición controlada entre estar de pie y apoyar las manos; no necesitas saltar.",
      purpose: "Entrenar cambios de nivel y capacidad de trabajo."
    },
    {
      id: "cond_calf",
      name: "Elevaciones de talón",
      type: "conditioning",
      family: ["general", "kicking", "movement"],
      equipment: ["none", "wall"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Sube y baja los talones lentamente, usando una pared como apoyo si hace falta.",
      purpose: "Fortalecer pantorrillas y control del tobillo."
    },
    {
      id: "cond_bridge",
      name: "Puente de glúteos",
      type: "conditioning",
      family: ["general", "grappling", "ground"],
      equipment: ["floor", "mat"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Eleva la pelvis apretando glúteos y baja despacio. Evita arquear la espalda en exceso.",
      purpose: "Fortalecer la cadena posterior."
    },
    {
      id: "cond_shadow",
      name: "Ronda de movimiento continuo",
      type: "conditioning",
      family: ["striking", "kicking", "mixed_striking", "movement"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Alterna desplazamientos y técnicas conocidas a un ritmo que te permita mantener buena forma.",
      purpose: "Mejorar resistencia específica sin contacto."
    },
    {
      id: "cond_rope",
      name: "Cuerda de saltar",
      type: "conditioning",
      family: ["general", "striking", "mixed_striking"],
      equipment: ["rope"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Salta bajo y con ritmo cómodo sobre una superficie apropiada. Puedes sustituirlo por marcha si hay molestias.",
      purpose: "Desarrollar coordinación y resistencia cardiovascular."
    },
    {
      id: "cond_interval",
      name: "Intervalos de actividad y recuperación",
      type: "conditioning",
      family: ["general", "striking", "kicking", "mixed_striking"],
      equipment: ["none", "timer"],
      levels: [1, 2, 3],
      minutes: 5,
      risk: "low",
      instructions:
        "Alterna periodos breves de movimiento con recuperación. Mantén una intensidad compatible con tu nivel.",
      purpose: "Entrenar la capacidad de repetir esfuerzos."
    },
    {
      id: "cond_band",
      name: "Tracción con banda elástica",
      type: "conditioning",
      family: ["general", "grappling", "throws"],
      equipment: ["band"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Comprueba el estado de la banda y su anclaje. Realiza tracciones suaves sin tirones ni dolor.",
      purpose: "Fortalecer espalda y control escapular."
    },
    {
      id: "cond_rows",
      name: "Remo con carga ligera",
      type: "conditioning",
      family: ["general", "grappling", "throws"],
      equipment: ["light_weights"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "moderate",
      instructions:
        "Usa una carga ligera, espalda estable y recorrido cómodo. Evita balancear el tronco.",
      purpose: "Desarrollar fuerza de tracción."
    },

    {
      id: "mob_hips",
      name: "Movilidad de cadera",
      type: "mobility",
      family: ["movement", "kicking", "grappling", "general"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Realiza movimientos suaves de apertura y cierre de cadera dentro de un rango sin dolor.",
      purpose: "Mejorar movilidad útil para desplazamientos y patadas."
    },
    {
      id: "mob_ankles",
      name: "Movilidad de tobillos",
      type: "mobility",
      family: ["movement", "kicking", "general"],
      equipment: ["none", "wall"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Desplaza suavemente la rodilla hacia delante sobre el pie sin levantar el talón.",
      purpose: "Mejorar movilidad del tobillo."
    },
    {
      id: "mob_shoulders",
      name: "Movilidad de hombros y escápulas",
      type: "mobility",
      family: ["striking", "mixed_striking", "weapons", "general"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Realiza elevaciones, retracciones y círculos pequeños de hombros sin forzar el rango.",
      purpose: "Preparar el hombro para movimientos repetidos."
    },
    {
      id: "mob_wrists",
      name: "Movilidad suave de muñecas",
      type: "mobility",
      family: ["striking", "grappling", "weapons", "fencing"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Mueve las muñecas lentamente y evita cargar peso sobre ellas si existe molestia.",
      purpose: "Preparar las muñecas para agarres y movimientos de brazos."
    },
    {
      id: "mob_spine",
      name: "Movilidad torácica controlada",
      type: "mobility",
      family: ["movement", "striking", "mixed_striking", "general"],
      equipment: ["floor", "mat"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Realiza rotaciones suaves del tronco con pelvis estable y sin movimientos bruscos.",
      purpose: "Mejorar control de rotación."
    },
    {
      id: "mob_coordination",
      name: "Coordinación cruzada",
      type: "mobility",
      family: ["movement", "general", "traditional"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 4,
      risk: "low",
      instructions:
        "Alterna mano y rodilla contrarias, empezando despacio y aumentando la fluidez de forma gradual.",
      purpose: "Mejorar coordinación entre segmentos corporales."
    },

    {
      id: "cool_walk",
      name: "Marcha suave de recuperación",
      type: "cooldown",
      family: ["general"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 2,
      risk: "low",
      instructions:
        "Reduce gradualmente el ritmo y deja que la respiración se normalice.",
      purpose: "Facilitar la transición al reposo."
    },
    {
      id: "cool_breath",
      name: "Respiración lenta y controlada",
      type: "cooldown",
      family: ["general", "movement", "traditional"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 2,
      risk: "low",
      instructions:
        "Respira con calma, sin contener el aire ni forzar inspiraciones profundas.",
      purpose: "Recuperar una respiración tranquila."
    },
    {
      id: "cool_legs",
      name: "Movilidad suave de piernas",
      type: "cooldown",
      family: ["general", "kicking", "grappling"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 3,
      risk: "low",
      instructions:
        "Haz movimientos suaves de piernas y cadera. Evita rebotes y estiramientos dolorosos.",
      purpose: "Finalizar con movimientos de baja intensidad."
    },
    {
      id: "cool_shoulders",
      name: "Relajación de hombros y brazos",
      type: "cooldown",
      family: ["general", "striking", "weapons"],
      equipment: ["none"],
      levels: [1, 2, 3],
      minutes: 2,
      risk: "low",
      instructions:
        "Relaja brazos y hombros con movimientos pequeños y cómodos.",
      purpose: "Reducir tensión muscular tras la sesión."
    }
  ];

  const NAME_RULES = [
    {
      pattern: /\b(boxeo|boxing|pugilismo|bare.?knuckle)\b/i,
      families: ["striking"]
    },
    {
      pattern: /\b(taekwondo|tang soo do|tangsudo|hapkido)\b/i,
      families: ["kicking", "traditional"]
    },
    {
      pattern: /\b(karate|karate.?do|kyokushin|goju.?ryu|shotokan|shito.?ryu|wado.?ryu|shorin.?ryu)\b/i,
      families: ["striking", "kicking", "traditional"]
    },
    {
      pattern: /\b(muay thai|muay boran|lethwei|kun khmer|pradal serey|kickboxing|shoot boxing)\b/i,
      families: ["mixed_striking"]
    },
    {
      pattern: /\b(judo|jujutsu|jiu.?jitsu|brazilian jiu.?jitsu|bjj|luta livre|submission wrestling|10th planet)\b/i,
      families: ["grappling", "ground", "throws"]
    },
    {
      pattern: /\b(wrestling|lucha olimpica|lucha libre|shuai jiao|sambo|sumo)\b/i,
      families: ["grappling", "throws"]
    },
    {
      pattern: /\b(aikido|hapkido|systema|krav maga|defensa personal)\b/i,
      families: ["selfdefense", "traditional"]
    },
    {
      pattern: /\b(esgrima|fencing|kendo|kenjutsu|iaido|kyudo|canne de combat|hema|bartitsu)\b/i,
      families: ["weapons", "fencing"]
    },
    {
      pattern: /\b(arnis|eskrima|kali|pencak silat|silat|kobudo|bojutsu)\b/i,
      families: ["weapons", "traditional"]
    },
    {
      pattern: /\b(kung fu|wushu|wing chun|wing tsun|baguazhang|tai chi|taijiquan|xingyiquan|bajiquan)\b/i,
      families: ["traditional", "movement", "striking"]
    },
    {
      pattern: /\b(capoeira|tricking|parkour marcial)\b/i,
      families: ["movement", "kicking"]
    },
    {
      pattern: /\b(mma|mixed martial arts|pankration|combat sambo)\b/i,
      families: ["mixed_striking", "grappling", "ground"]
    },
    {
      pattern: /\b(kalaripayattu|silambam|dambe|laamb|gladiatura|gladiator)\b/i,
      families: ["traditional", "movement"]
    },
    {
      pattern: /\b(sum(o|ou)|lucha grecorromana|greco.?roman)\b/i,
      families: ["grappling", "throws"]
    }
  ];

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("es")
      .trim();
  }

  function getCatalog() {
    if (Array.isArray(window.MAI_DISCIPLINES)) {
      return window.MAI_DISCIPLINES;
    }

    return [];
  }

  function findDiscipline(name) {
    const normalized = normalizeText(name);

    return getCatalog().find(
      (item) => normalizeText(item.name) === normalized
    ) || null;
  }

  function inferFamilies(discipline) {
    const families = new Set();
    const tags = (discipline?.tags || []).map(normalizeText);
    const searchable = normalizeText([
      discipline?.name,
      discipline?.focus,
      discipline?.description,
      discipline?.equipment
    ].join(" "));

    const add = (...values) => values.forEach((value) => families.add(value));

    if (tags.some((tag) =>
      ["striking", "boxing", "punching"].includes(tag)
    )) add("striking");

    if (tags.some((tag) =>
      ["kicking", "taekwondo"].includes(tag)
    )) add("kicking");

    if (tags.includes("thai")) add("mixed_striking");

    if (tags.includes("grappling")) add("grappling", "ground");

    if (tags.includes("weapons")) add("weapons", "fencing");

    if (tags.includes("fencing")) add("fencing", "weapons");

    if (tags.includes("traditional")) add("traditional");

    if (tags.includes("flow")) add("movement");

    if (tags.includes("selfdefense")) add("selfdefense");

    if (
      tags.includes("fitness") ||
      tags.includes("competition")
    ) add("general");

    if (
      tags.includes("japanese") ||
      tags.includes("korean") ||
      tags.includes("chinese")
    ) add("traditional");

    if (/\b(throw|throws|projection|proyeccion|derribo|wrestling|lucha)\b/.test(searchable)) {
      add("throws", "grappling");
    }

    if (/\b(ground|suelo|submission|ne.?waza|par terre)\b/.test(searchable)) {
      add("ground", "grappling");
    }

    if (/\b(punch|boxeo|golpeo|strike|striking)\b/.test(searchable)) {
      add("striking");
    }

    if (/\b(kick|patada|kicking)\b/.test(searchable)) {
      add("kicking");
    }

    if (/\b(sword|sabre|saber|foil|arma|weapon|esgrima|fencing)\b/.test(searchable)) {
      add("weapons", "fencing");
    }

    NAME_RULES.forEach((rule) => {
      if (rule.pattern.test(discipline?.name || "")) {
        rule.families.forEach((family) => families.add(family));
      }
    });

    // Un perfil nunca queda sin una base utilizable.
    if (!families.size) add("general");

    return Array.from(families);
  }

  function getDisciplineProfile(name) {
    const discipline = typeof name === "string"
      ? findDiscipline(name)
      : name;

    if (!discipline) {
      return {
        name: String(name || "Disciplina no identificada"),
        foundInCatalog: false,
        families: ["general"],
        label: "Preparación física general",
        focus: "Perfil no disponible en el catálogo.",
        equipment: "No especificado",
        description:
          "Se utilizará una rutina general hasta disponer de información fiable."
      };
    }

    const families = inferFamilies(discipline);

    return {
      name: discipline.name,
      foundInCatalog: true,
      families,
      label: families.map(
        (family) => FAMILY_LABELS[family] || family
      ).join(" · "),
      focus: discipline.focus || "Enfoque no especificado.",
      equipment: discipline.equipment || "No especificado",
      description: discipline.description || "",
      tags: Array.isArray(discipline.tags) ? discipline.tags.slice() : [],
      origin: discipline.origin || "",
      period: discipline.period || ""
    };
  }

  function getEquipmentMode(value) {
    return EQUIPMENT[value] ? value : "none";
  }

  function exerciseAllowedByEquipment(exercise, equipmentMode) {
    const config = EQUIPMENT[getEquipmentMode(equipmentMode)];
    const allowed = new Set(config.allowed);

    return exercise.equipment.some((item) => allowed.has(item));
  }

  function getExercises(filters = {}) {
    const equipment = getEquipmentMode(filters.equipment || "none");
    const level = LEVELS[filters.level || "basic"] || LEVELS.basic;
    const type = filters.type || null;
    const families = Array.isArray(filters.families)
      ? filters.families
      : [];

    return EXERCISES.filter((exercise) => {
      if (type && exercise.type !== type) return false;

      if (!exerciseAllowedByEquipment(exercise, equipment)) return false;

      if (!exercise.levels.includes(level.technicalComplexity)) return false;

      if (
        families.length &&
        !exercise.family.some((family) => families.includes(family))
      ) return false;

      if (filters.excludeRisky && exercise.risk === "supervised") return false;

      if (filters.noPartner && exercise.partner) return false;

      return true;
    });
  }

  function hashString(value) {
    let hash = 2166136261;

    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    return hash >>> 0;
  }

  function createRandom(seed) {
    let state = seed >>> 0;

    return function random() {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleWithSeed(items, seed) {
    const result = items.slice();
    const random = createRandom(seed);

    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  function selectExercises({
    type,
    families,
    equipment,
    level,
    seed,
    count = 1,
    excludeIds = [],
    noPartner = true
  }) {
    const excluded = new Set(excludeIds);

    let candidates = getExercises({
      type,
      families,
      equipment,
      level,
      excludeRisky: true,
      noPartner
    }).filter((exercise) => !excluded.has(exercise.id));

    // Si una familia especializada no tiene suficiente contenido,
    // se complementa con preparación general segura.
    if (candidates.length < count) {
      const general = getExercises({
        type,
        equipment,
        level,
        excludeRisky: true,
        noPartner
      }).filter((exercise) =>
        !excluded.has(exercise.id) &&
        !candidates.some((item) => item.id === exercise.id)
      );

      candidates = candidates.concat(general);
    }

    return shuffleWithSeed(candidates, seed).slice(0, count);
  }

  function validateOptions(options = {}) {
    const errors = [];
    const warnings = [];

    const discipline = String(options.discipline || "").trim();
    const level = options.level || "basic";
    const days = Number(options.days ?? 3);
    const duration = Number(options.duration ?? 45);
    const goal = options.goal || "technique";
    const equipment = getEquipmentMode(options.equipment || "none");

    if (!discipline) {
      errors.push("Selecciona una disciplina.");
    }

    if (!LEVELS[level]) {
      errors.push("El nivel debe ser basic, intermediate o advanced.");
    }

    if (!Number.isInteger(days) || days < 2 || days > 5) {
      errors.push("La frecuencia debe estar entre 2 y 5 días por semana.");
    }

    if (!SESSION_MINUTES.includes(duration)) {
      errors.push(
        "La duración debe ser 20, 30, 45, 60, 75 o 90 minutos."
      );
    }

    if (!GOALS[goal]) {
      errors.push(
        "El objetivo debe ser technique, fitness, mobility o discipline."
      );
    }

    if (!EQUIPMENT[equipment]) {
      errors.push("El tipo de equipamiento no es válido.");
    }

    const profile = getDisciplineProfile(discipline);

    if (!profile.foundInCatalog) {
      warnings.push(
        "La disciplina no se encontró en el catálogo; se usará un perfil general."
      );
    }

    if (duration >= 75) {
      warnings.push(
        "Las sesiones largas deben incluir descansos, hidratación y ajuste de intensidad."
      );
    }

    if (level === "advanced") {
      warnings.push(
        "El nivel avanzado no sustituye una evaluación técnica ni la supervisión profesional."
      );
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      normalized: {
        discipline,
        level,
        days,
        duration,
        goal,
        equipment,
        variant: Math.max(0, Number(options.variant) || 0)
      }
    };
  }

  function getSessionEmphasis(goal, dayIndex, families) {
    const primaryFamily = families[dayIndex % families.length] || "general";

    if (goal === "technique") {
      return {
        name: "Técnica y control",
        technicalShare: 0.52,
        conditioningShare: 0.18,
        mobilityShare: 0.12,
        family: primaryFamily
      };
    }

    if (goal === "fitness") {
      return {
        name: "Condición física específica",
        technicalShare: 0.30,
        conditioningShare: 0.38,
        mobilityShare: 0.10,
        family: primaryFamily
      };
    }

    if (goal === "mobility") {
      return {
        name: "Movilidad y coordinación",
        technicalShare: 0.34,
        conditioningShare: 0.18,
        mobilityShare: 0.28,
        family: primaryFamily
      };
    }

    const rotation = [
      {
        name: "Fundamentos",
        technicalShare: 0.42,
        conditioningShare: 0.24,
        mobilityShare: 0.14
      },
      {
        name: "Práctica y resistencia",
        technicalShare: 0.32,
        conditioningShare: 0.34,
        mobilityShare: 0.14
      },
      {
        name: "Control y coordinación",
        technicalShare: 0.36,
        conditioningShare: 0.22,
        mobilityShare: 0.22
      },
      {
        name: "Consolidación técnica",
        technicalShare: 0.46,
        conditioningShare: 0.22,
        mobilityShare: 0.12
      },
      {
        name: "Sesión integrada",
        technicalShare: 0.36,
        conditioningShare: 0.30,
        mobilityShare: 0.14
      }
    ];

    return {
      ...rotation[dayIndex % rotation.length],
      family: primaryFamily
    };
  }

  function allocateMinutes(duration, goal, dayIndex) {
    const warmup = duration <= 30 ? 4 : duration <= 45 ? 6 : 8;
    const cooldown = duration <= 30 ? 3 : duration <= 45 ? 4 : 5;
    const main = Math.max(8, duration - warmup - cooldown);

    const emphasis = getSessionEmphasis(goal, dayIndex, ["general"]);
    const technical = Math.max(4, Math.round(main * emphasis.technicalShare));
    const conditioning = Math.max(3, Math.round(main * emphasis.conditioningShare));
    const mobility = Math.max(2, Math.round(main * emphasis.mobilityShare));
    const remainder = main - technical - conditioning - mobility;

    return {
      warmup,
      technical: technical + Math.max(0, remainder),
      conditioning,
      mobility,
      cooldown
    };
  }

  function buildBlock({
    id,
    title,
    type,
    minutes,
    exercises,
    note = ""
  }) {
    return {
      id,
      title,
      type,
      minutes,
      exercises: exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        minutes: exercise.minutes,
        instructions: exercise.instructions,
        purpose: exercise.purpose,
        equipment: exercise.equipment.slice(),
        risk: exercise.risk,
        partnerRequired: Boolean(exercise.partner)
      })),
      note
    };
  }

  function buildSession({
    dayIndex,
    options,
    profile,
    seed,
    week
  }) {
    const level = LEVELS[options.level];
    const families = profile.families;
    const emphasis = getSessionEmphasis(
      options.goal,
      dayIndex,
      families
    );

    const minutes = allocateMinutes(
      options.duration,
      options.goal,
      dayIndex
    );

    const weekIntensity = week === 1
      ? "aprendizaje y adaptación"
      : week === 2
        ? "consolidación"
        : week === 3
          ? "progresión moderada"
          : "integración y control";

    const warmup = selectExercises({
      type: "warmup",
      families,
      equipment: options.equipment,
      level: options.level,
      seed: seed + 11,
      count: 2
    });

    const technique = selectExercises({
      type: "technique",
      families: [emphasis.family, ...families],
      equipment: options.equipment,
      level: options.level,
      seed: seed + 23,
      count: options.duration >= 60 ? 3 : 2
    });

    const conditioning = selectExercises({
      type: "conditioning",
      families: [emphasis.family, ...families],
      equipment: options.equipment,
      level: options.level,
      seed: seed + 37,
      count: options.duration >= 60 ? 2 : 1
    });

    const mobility = selectExercises({
      type: "mobility",
      families,
      equipment: options.equipment,
      level: options.level,
      seed: seed + 41,
      count: options.duration >= 60 ? 2 : 1
    });

    const cooldown = selectExercises({
      type: "cooldown",
      families,
      equipment: options.equipment,
      level: options.level,
      seed: seed + 53,
      count: 2
    });

    const blocks = [
      buildBlock({
        id: "warmup",
        title: "1. Calentamiento",
        type: "warmup",
        minutes: minutes.warmup,
        exercises: warmup,
        note: "Empieza despacio y aumenta el ritmo de forma gradual."
      }),
      buildBlock({
        id: "technique",
        title: "2. Bloque técnico",
        type: "technique",
        minutes: minutes.technical,
        exercises: technique,
        note:
          "Prioriza precisión, equilibrio y control antes que velocidad o potencia."
      }),
      buildBlock({
        id: "conditioning",
        title: "3. Preparación física",
        type: "conditioning",
        minutes: minutes.conditioning,
        exercises: conditioning,
        note:
          "Mantén una intensidad que permita conservar la técnica."
      }),
      buildBlock({
        id: "mobility",
        title: "4. Movilidad y coordinación",
        type: "mobility",
        minutes: minutes.mobility,
        exercises: mobility,
        note:
          "Trabaja con amplitud cómoda y evita forzar las articulaciones."
      }),
      buildBlock({
        id: "cooldown",
        title: "5. Vuelta a la calma",
        type: "cooldown",
        minutes: minutes.cooldown,
        exercises: cooldown,
        note:
          "Reduce progresivamente la intensidad y normaliza la respiración."
      })
    ];

    return {
      day: dayIndex + 1,
      title: `Día ${dayIndex + 1} — ${emphasis.name}`,
      focus: emphasis.name,
      familyFocus: emphasis.family,
      duration: options.duration,
      level: level.label,
      goal: GOALS[options.goal].label,
      week,
      weekIntensity,
      effort: Math.min(
        8,
        level.effort + (week >= 3 && options.level !== "basic" ? 1 : 0)
      ),
      blocks,
      reminders: [
        "La calidad del movimiento importa más que completar repeticiones con mala técnica.",
        "Descansa cuando sea necesario y adapta el trabajo a tu condición física."
      ]
    };
  }

  function buildWeeklyProgression() {
    return [
      {
        week: 1,
        name: "Fundamentos y adaptación",
        guidance:
          "Aprende los movimientos, establece una rutina y utiliza una intensidad cómoda.",
        progression: "Prioriza técnica, control y familiarización."
      },
      {
        week: 2,
        name: "Consolidación",
        guidance:
          "Repite los fundamentos con mayor continuidad, manteniendo la misma técnica.",
        progression:
          "Reduce pausas solo si la ejecución sigue siendo estable."
      },
      {
        week: 3,
        name: "Progresión moderada",
        guidance:
          "Añade fluidez o una pequeña mejora de ritmo si la recuperación es adecuada.",
        progression:
          "No aumentes simultáneamente velocidad, duración e intensidad."
      },
      {
        week: 4,
        name: "Integración y evaluación",
        guidance:
          "Revisa postura, coordinación, constancia y recuperación.",
        progression:
          "Consolida lo aprendido; reduce la carga si notas fatiga acumulada."
      }
    ];
  }

  function generatePlan(options = {}) {
    const validation = validateOptions(options);

    if (!validation.valid) {
      return {
        success: false,
        version: VERSION,
        errors: validation.errors,
        warnings: validation.warnings,
        plan: null
      };
    }

    const normalized = validation.normalized;
    const profile = getDisciplineProfile(normalized.discipline);

    const seedText = [
      normalized.discipline,
      normalized.level,
      normalized.days,
      normalized.duration,
      normalized.goal,
      normalized.equipment,
      normalized.variant
    ].join("|");

    const baseSeed = hashString(seedText);

    const weeks = [];

    for (let week = 1; week <= 4; week += 1) {
      const sessions = [];

      for (let day = 0; day < normalized.days; day += 1) {
        const sessionSeed =
          baseSeed +
          (week * 1009) +
          (day * 97);

        sessions.push(buildSession({
          dayIndex: day,
          options: normalized,
          profile,
          seed: sessionSeed,
          week
        }));
      }

      weeks.push({
        week,
        progression: buildWeeklyProgression()[week - 1],
        sessions
      });
    }

    const plan = {
      title: `Plan MAI — ${profile.name}`,
      discipline: profile.name,
      disciplineProfile: profile,
      level: LEVELS[normalized.level].label,
      frequency: normalized.days,
      durationPerSession: normalized.duration,
      goal: GOALS[normalized.goal].label,
      equipment: EQUIPMENT[normalized.equipment].label,
      equipmentMode: normalized.equipment,
      variant: normalized.variant,
      weeks,
      safety: [],
      limitations: [ ],
      metadata: {
        version: VERSION,
        generatedLocally: true,
        requiresInternet: false,
        generatedAt: new Date().toISOString()
      }
    };

    return {
      success: true,
      version: VERSION,
      errors: [],
      warnings: validation.warnings,
      plan
    };
  }

  function generateVariant(options = {}) {
    const nextOptions = {
      ...options,
      variant: Math.max(0, Number(options.variant) || 0) + 1
    };

    return generatePlan(nextOptions);
  }

  function getSupportedFamilies() {
    return Object.entries(FAMILY_LABELS).map(([id, label]) => ({
      id,
      label
    }));
  }

  function getExerciseById(id) {
    return EXERCISES.find((exercise) => exercise.id === id) || null;
  }

  function getStatistics() {
    const byType = {};
    const byFamily = {};

    EXERCISES.forEach((exercise) => {
      byType[exercise.type] = (byType[exercise.type] || 0) + 1;

      exercise.family.forEach((family) => {
        byFamily[family] = (byFamily[family] || 0) + 1;
      });
    });

    return {
      version: VERSION,
      totalExercises: EXERCISES.length,
      totalCatalogDisciplines: getCatalog().length,
      exerciseTypes: byType,
      familyCoverage: byFamily,
      supportedLevels: Object.keys(LEVELS),
      supportedGoals: Object.keys(GOALS),
      supportedEquipment: Object.keys(EQUIPMENT),
      sessionDurations: SESSION_MINUTES.slice()
    };
  }

  return Object.freeze({
    version: VERSION,
    getCatalog,
    findDiscipline,
    getDisciplineProfile,
    getExercises,
    getExerciseById,
    getSupportedFamilies,
    getStatistics,
    validateOptions,
    generatePlan,
    generateVariant,
    constants: Object.freeze({
      LEVELS,
      GOALS,
      EQUIPMENT,
      SESSION_MINUTES,
      FAMILY_LABELS
    })
  });
})();