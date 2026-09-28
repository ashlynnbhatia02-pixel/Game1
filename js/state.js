/* ============================================================
   js/state.js
   Single source of truth. Week 5: saved to localStorage.
   Week 8: synced to Supabase.
   ============================================================ */

export const state = {
  currentCase: null,
  selectedSuspectIndex: null,
  cluesRead: new Set(),
  gameOver: false
};

export function resetStateForCase(caseData) {
  state.currentCase = caseData;
  state.selectedSuspectIndex = null;
  state.cluesRead = new Set();
  state.gameOver = false;
}
