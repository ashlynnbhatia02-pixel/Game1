/* ============================================================
   js/controller.js
   Game actions + timer. Input binding lives in input.js.
   ============================================================ */

import { state } from "./state.js";
import {
  renderAll,
  renderClues,
  renderSuspects,
  renderAccuseButton,
  renderFooter,
  renderTabs,
  renderTimer,
  showResult,
  clearResult,
  getElements
} from "./renderer.js";
import { loadFirstCase, loadNextCase } from "./case.js";

export function readClue(index) {
  if (state.gameOver) return;
  state.cluesRead.add(index);
  renderClues();
}

export function selectSuspect(index) {
  if (state.gameOver) return;
  state.selectedSuspectIndex = index;
  renderSuspects();
  renderAccuseButton();
}

export function setActiveTab(tabName) {
  state.activeTab = tabName;
  renderTabs();
}

export function cycleTab(direction) {
  const tabs = ["evidence", "suspects"];
  const current = tabs.indexOf(state.activeTab);
  const next = (current + direction + tabs.length) % tabs.length;
  setActiveTab(tabs[next]);
}

export function accuse() {
  if (state.gameOver || state.selectedSuspectIndex === null) return;

  state.gameOver = true;
  stopTimer();

  const accused = state.currentCase.suspects[state.selectedSuspectIndex];
  const murderer = state.currentCase.suspects.find(s => s.guilty);

  if (accused.guilty) {
    showResult(
      `<strong>CASE CLOSED.</strong><br>
       ${accused.name} was the killer. Every clue pointed to them.
       Justice is served.`,
      true
    );
  } else {
    showResult(
      `<strong>CASE COLD.</strong><br>
       ${accused.name} was innocent. The real killer was
       <strong>${murderer.name}</strong>. He slipped away while you chased the wrong lead.`,
      false
    );
  }

  renderAccuseButton();
  renderFooter();
  renderTimer();
}

export function startTimer() {
  const limit = state.currentCase.timeLimit || 0;
  if (!limit) { renderTimer(); return; }

  state.timeRemaining = limit;
  renderTimer();

  state.timerId = setInterval(() => {
    state.timeRemaining -= 1;
    renderTimer();
    if (state.timeRemaining <= 0) timeOut();
  }, 1000);
}

export function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function timeOut() {
  stopTimer();
  if (state.gameOver) return;
  state.gameOver = true;
  const murderer = state.currentCase.suspects.find(s => s.guilty);
  showResult(
    `<strong>TIME'S UP.</strong><br>
     The killer was <strong>${murderer.name}</strong>. The case goes cold.`,
    false
  );
  renderAccuseButton();
  renderFooter();
  renderTimer();
}

export function advanceToNextCase() {
  const next = loadNextCase();
  if (!next) return;
  clearResult();
  renderAll();
  startTimer();
}

export function startGame() {
  loadFirstCase();
  renderAll();
  startTimer();
}
