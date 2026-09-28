/* ============================================================
   js/case.js
   Loads cases by level. Week 5+: load based on progress.
   Week 10: load the daily seeded case.
   ============================================================ */

import { state, resetStateForCase } from "./state.js";
import { getCaseByLevel, CASES } from "../data/cases.js";

export function loadCaseByLevel(level) {
  const caseData = getCaseByLevel(level);
  resetStateForCase(caseData);
  return caseData;
}

export function loadFirstCase() {
  return loadCaseByLevel(1);
}

export function loadNextCase() {
  const nextLevel = state.currentCase.level + 1;
  if (nextLevel > CASES.length) return null;
  return loadCaseByLevel(nextLevel);
}
