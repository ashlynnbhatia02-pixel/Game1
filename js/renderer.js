import { state } from "./state.js";

const els = {
  caseTitle:   document.getElementById("caseTitle"),
  caseId:      document.getElementById("caseId"),
  scene:       document.getElementById("scene"),
  clues:       document.getElementById("clues"),
  suspects:    document.getElementById("suspects"),
  accuseBtn:   document.getElementById("accuseBtn"),
  result:      document.getElementById("result"),
  levelLabel:  document.getElementById("levelLabel"),
  nextCaseBtn: document.getElementById("nextCaseBtn"),
  timer:       document.getElementById("timer"),
  timerValue:  document.getElementById("timerValue"),
  tabs:        document.querySelectorAll(".tab"),
  panels:      document.querySelectorAll(".tab-panel")
};

export function renderAll() {
  renderHeader();
  renderScene();
  renderTabs();
  renderClues();
  renderSuspects();
  renderAccuseButton();
  renderFooter();
  renderTimer();
}

function renderHeader() {
  const c = state.currentCase;
  if (!c) return;
  els.caseTitle.textContent = c.title;
  els.caseId.textContent =
    "CASE FILE #" + String(c.level).padStart(4, "0") + " · LEVEL " + c.level;
}

function renderScene() {
  els.scene.innerHTML = state.currentCase.scene;
}

export function renderTabs() {
  els.tabs.forEach(function(tab) {
    if (tab.dataset.tab === state.activeTab) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  els.panels.forEach(function(panel) {
    if (panel.dataset.panel === state.activeTab) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });
}

export function renderClues() {
  els.clues.innerHTML = "";
  state.currentCase.clues.forEach(function(clue, i) {
    const li = document.createElement("li");
    li.textContent = clue.text;
    if (state.cluesRead.has(i)) li.classList.add("read");
    if (clue.unreliable) li.classList.add("unreliable");
    li.dataset.clueIndex = i;
    els.clues.appendChild(li);
  });
}

export function renderSuspects() {
  els.suspects.innerHTML = "";
  state.currentCase.suspects.forEach(function(s, i) {
    const card = document.createElement("div");
    card.className = "suspect";
    if (state.selectedSuspectIndex === i) card.classList.add("selected");
    card.dataset.suspectIndex = i;
    card.innerHTML =
      '<div class="avatar">' + s.avatar + '</div>' +
      '<div class="name">' + s.name + '</div>' +
      '<div class="role">' + s.role + '</div>';
    els.suspects.appendChild(card);
  });
}

export function renderAccuseButton() {
  els.accuseBtn.disabled =
    state.gameOver || state.selectedSuspectIndex === null;
}

export function renderFooter() {
  els.levelLabel.textContent =
    "Level " + state.currentCase.level + " of " + state.totalLevels;
  els.nextCaseBtn.hidden = !state.gameOver;
}

export function renderTimer() {
  const limit = state.currentCase.timeLimit || 0;
  if (!limit || state.gameOver) {
    els.timer.hidden = true;
    return;
  }
  els.timer.hidden = false;
  els.timerValue.textContent = state.timeRemaining;
  if (state.timeRemaining <= 15) {
    els.timer.classList.add("warning");
  } else {
    els.timer.classList.remove("warning");
  }
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
