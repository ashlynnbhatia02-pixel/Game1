const KEY = "coldcase_save_v1";

const DEFAULT_SAVE = {
  currentLevel: 1,
  bestRating: 0,
  totalRating: 0,
  casesSolved: 0,
  casesFailed: 0,
  streak: 0,
  bestStreak: 0,
  levelScores: {}
};

export function loadSave() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_SAVE };
    return { ...DEFAULT_SAVE, ...JSON.parse(raw) };
  } catch (e) {
    return { ...DEFAULT_SAVE };
  }
}

export function writeSave(save) {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
  } catch (e) {}
}

export function clearSave() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {}
}
