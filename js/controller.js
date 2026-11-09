import { state, save } from "./state.js";
import { writeSave } from "./storage.js";
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
import { playSound } from "./audio.js";

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

  const level = state.currentCase.level;
  const accused = state.currentCase.suspects[state.selectedSuspectIndex];
  const murderer = state.currentCase.suspects.find(function(s) { return s.guilty; });

  if (accused.guilty) {
    playSound("win");
    save.casesSolved = save.casesSolved + 1;
    save.totalRating = save.totalRating + 100;
    save.currentLevel = level + 1;
    writeSave(save);
    showResult(
      "<strong>CASE CLOSED.</strong><br>" +
      accused.name + " was the killer. +100 rating.",
      true
    );
  } else {
    playSound("lose");
    save.casesFailed = save.casesFailed + 1;
    save.totalRating = save.totalRating + 10;
    writeSave(save);
    showResult(
      "<strong>CASE COLD.</strong><br>" +
      accused.name + " was innocent. The killer was <strong>" +
      murderer.name + "</strong>.",
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

  state.timerId = setInterval(function() {
    state.timeRemaining = state.timeRemaining - 1;
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
  playSound("lose");
  save.casesFailed = save.casesFailed + 1;
  writeSave(save);

  const murderer = state.currentCase.suspects.find(function(s) { return s.guilty; });
  showResult(
    "<strong>TIME'S UP.</strong><br>The killer was <strong>" +
    murderer.name + "</strong>.",
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
