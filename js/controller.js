/* ============================================================
   js/controller.js
   Handles user input. Every input method (mouse, touch,
   keyboard) will eventually route through these functions.
   ============================================================ */

import { state } from "./state.js";
import {
  renderAll,
  renderClues,
  renderSuspects,
  renderAccuseButton,
  renderFooter,
  showResult,
  clearResult,
  getElements
} from "./renderer.js";
import { loadFirstCase, loadNextCase } from "./case.js";

export function attachHandlers() {
  const els = getElements();

  els.clues.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    readClue(Number(li.dataset.clueIndex));
  });

  els.suspects.addEventListener("click", (e) => {
    const card = e.target.closest(".suspect");
    if (!card) return;
    selectSuspect(Number(card.dataset.suspectIndex));
  });

  els.accuseBtn.addEventListener("click", accuse);

  els.nextCaseBtn.addEventListener("click", () => {
    const next = loadNextCase();
    if (!next) return;
    clearResult();
    renderAll();
  });
}

function readClue(index) {
  if (state.gameOver) return;
  state.cluesRead.add(index);
  renderClues();
}

function selectSuspect(index) {
  if (state.gameOver) return;
  state.selectedSuspectIndex = index;
  renderSuspects();
  renderAccuseButton();
}

function accuse() {
  if (state.gameOver || state.selectedSuspectIndex === null) return;

  state.gameOver = true;

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
}

export function startGame() {
  loadFirstCase();
  attachHandlers();
  renderAll();
}
