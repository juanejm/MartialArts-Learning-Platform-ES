/*Juan Esteban JM*/
"use strict";

window.MAIEngine = (() => {
  const TAG_WEIGHTS = {
    selfdefense: 1.5,
    grappling: 1.35,
    striking: 1.35,
    kicking: 1.25,
    traditional: 1.1,
    flow: 1.1,
    weapons: 1.15,
    fitness: 1.1,
    competition: 1.0,
    japanese: 1.15,
    korean: 1.15,
    chinese: 1.15,
    brazilian: 1.15,
    thai: 1.15,
    french: 1.1,
    fencing: 1.1,
    general: 0.8
  };

  const TAG_GROUPS = {
    striking: ["striking", "thai"],
    kicking: ["kicking"],
    grappling: ["grappling"],
    selfdefense: ["selfdefense"],
    flow: ["flow"],
    traditional: ["traditional"],
    weapons: ["weapons"],
    fitness: ["fitness", "competition"],
    japanese: ["japanese"],
    korean: ["korean"],
    chinese: ["chinese"],
    brazilian: ["brazilian"],
    thai: ["thai"],
    french: ["french"],
    fencing: ["fencing"]
  };

  function getDisciplines() {
    return Array.isArray(window.MAI_DISCIPLINES)
      ? window.MAI_DISCIPLINES
      : [];
  }

  function collectPreferences(questions, answers) {
    const preferences = {};

    questions.forEach((question, questionIndex) => {
      const selectedIndex = answers[questionIndex];
      const selectedOption = question?.options?.[selectedIndex];

      if (!selectedOption?.scores) return;

      Object.entries(selectedOption.scores).forEach(([tag, value]) => {
        preferences[tag] = (preferences[tag] || 0) + Number(value || 0);
      });
    });

    return preferences;
  }

  function disciplineScore(discipline, preferences) {
    let score = 0;
    const tags = new Set(discipline.tags || []);

    Object.entries(preferences).forEach(([preference, value]) => {
      const weight = TAG_WEIGHTS[preference] || 1;

      if (tags.has(preference)) {
        score += value * weight;
        return;
      }

      const equivalentTags = TAG_GROUPS[preference] || [];

      if (equivalentTags.some((tag) => tags.has(tag))) {
        score += value * weight * 0.45;
      }
    });

    return score;
  }

  function scoreAll(questions, answers) {
    const disciplines = getDisciplines();
    const preferences = collectPreferences(questions, answers);

    if (!disciplines.length) {
      console.error("MAI: no se ha cargado el catálogo de artes marciales.");
      return [];
    }

    const scored = disciplines.map((discipline) => ({
      ...discipline,
      score: disciplineScore(discipline, preferences)
    }));

    scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

    const maxScore = Math.max(...scored.map((item) => item.score), 1);

    return scored.map((item) => ({
      ...item,
      compatibility: Math.round((item.score / maxScore) * 100)
    }));
  }

  function recommend(questions, answers) {
    const ranked = scoreAll(questions, answers);

    if (!ranked.length) return [];

    const positive = ranked.filter((item) => item.score > 0);
    const candidates = positive.length ? positive : ranked;

    return candidates;
  }

  function findByName(name) {
    const normalized = String(name || "").trim().toLocaleLowerCase("es");

    return getDisciplines().find(
      (discipline) => discipline.name.toLocaleLowerCase("es") === normalized
    ) || null;
  }

  function search(query) {
    const normalized = String(query || "").trim().toLocaleLowerCase("es");

    if (!normalized) return [];

    return getDisciplines().filter((discipline) => {
      const searchable = [
        discipline.name,
        discipline.origin,
        discipline.period,
        discipline.focus,
        discipline.description,
        ...(discipline.tags || [])
      ].join(" ").toLocaleLowerCase("es");

      return searchable.includes(normalized);
    });
  }

  function addDiscipline(discipline) {
    if (!discipline || !discipline.name) {
      throw new Error("La disciplina debe tener un nombre.");
    }

    const catalog = getDisciplines();
    const existing = findByName(discipline.name);

    if (existing) return existing;

    const newDiscipline = {
      name: String(discipline.name).trim(),
      origin: discipline.origin || "Por investigar",
      period: discipline.period || "Sin clasificar",
      tags: Array.isArray(discipline.tags) ? discipline.tags : ["traditional"],
      focus: discipline.focus || "Enfoque pendiente de documentar",
      contact: discipline.contact || "Por verificar",
      equipment: discipline.equipment || "Por verificar",
      description: discipline.description || "Información pendiente de ampliar."
    };

    catalog.push(newDiscipline);
    return newDiscipline;
  }

  return {
    recommend,
    scoreAll,
    findByName,
    search,
    addDiscipline,
    collectPreferences
  };
})();