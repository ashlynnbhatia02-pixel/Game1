const KEY = "coldcase_save_v1";
const DEFAULT = { currentLevel: 1, totalRating: 0, casesSolved: 0, casesFailed: 0 };

export function loadSave() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
  } catch { return { ...DEFAULT }; }
}

export function writeSave(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}
