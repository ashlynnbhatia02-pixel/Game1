/* ============================================================
   js/renderer.js
   Pure rendering: reads state, writes DOM. No game logic.
   ============================================================ */

import { state } from "./state.js";
import { getTotalLevels } from "../data/cases.js";

const els = {
  caseTitle:   document.getElementById("caseTitle"),
  caseId:      document.getElementById("caseId"),
  scene:       document.getElementById("scene"),
  clues:       document.getElementById("clues"),
  suspects:    document.getElementById("suspects"),
  accuseBtn:   document.getElementById("accuseBtn"),
  result:      document.getElementById("result"),
  levelLabel:  document.getElementById("levelLabel"),
  nextCaseBtn: document.getElementById("nextCaseBtn")
};

export function renderAll() {
  renderHeader();
  renderScene();
  renderClues();
  renderSuspects();
  renderAccuseButton();
  renderFooter();
}

function renderHeader() {
  const c = state.currentCase;
  if (!c) return;
  els.caseTitle.textContent = c.title;
  els.caseId.textContent =
    `CASE FILE #${String(c.level).padStart(4, "0")} · LEVEL ${c.level}`;
}

function renderScene() {
  els.scene.innerHTML = state.currentCase.scene;
}

function renderClues() {
  els.clues.innerHTML = "";
  state.currentCase.clues.forEach((text, i) => {
    const li = document.createElement("li");
    li.textContent = text;
    if (state.cluesRead.has(i)) li.classList.add("read");
    li.dataset.clueIndex = i;
    els.clues.appendChild(li);
  });
}

function renderSuspects() {
  els.suspects.innerHTML = "";
  state.currentCase.suspects.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "suspect";
    if (state.selectedSuspectIndex === i) card.classList.add("selected");
    card.dataset.suspectIndex = i;
    card.innerHTML = `
      <div class="avatar">${s.avatar}</div>
      <div class="name">${s.name}</div>
      <div class="role">${s.role}</div>
    `;
    els.suspects.appendChild(card);
  });
}

function renderAccuseButton() {
  els.accuseBtn.disabled =
    state.gameOver || state.selectedSuspectIndex === null;
}

function renderFooter() {
  const total = getTotalLevels();
  els.levelLabel.textContent =
    `Level ${state.currentCase.level} of ${total}`;
  els.nextCaseBtn.hidden = !state.gameOver;
}

export function showResult(html, isWin) {
  els.result.classList.add("show");
  els.result.classList.remove("win", "lose");
  els.result.classList.add(isWin ? "win" : "lose");
  els.result.innerHTML = html;
}

export function clearResult() {
  els.result.classList.remove("show", "win", "lose");
  els.result.innerHTML = "";
}

export function getElements() {
  return els;
}
