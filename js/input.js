/* ============================================================
   js/input.js  — WEEK 4 FINAL
   ============================================================ */

import { state } from "./state.js";
import {
  selectSuspect,
  accuse,
  cycleTab,
  setActiveTab,
  advanceToNextCase,
  readClue
} from "./controller.js";
import { playSound } from "./audio.js";

const SWIPE_THRESHOLD = 50;
const SWIPE_MAX_TIME  = 600;

let attached = false;

export function attachInputHandlers() {
  if (attached) return;
  attached = true;

  console.log("[input] attaching handlers");
  document.addEventListener("click", handleClick);
  attachSwipeHandlers();
  attachKeyboardHandlers();
}

function handleClick(e) {
  const tab = e.target.closest(".tab");
  if (tab) {
    e.preventDefault();
    console.log("[input] TAB CLICKED:", tab.dataset.tab);
    playSound("paper");
    setActiveTab(tab.dataset.tab);
    return;
  }

  const clue = e.target.closest(".clues li");
  if (clue) {
    console.log("[input] CLUE CLICKED:", clue.dataset.clueIndex);
    playSound("typewriter");
    readClue(Number(clue.dataset.clueIndex));
    return;
  }

  const suspect = e.target.closest(".suspect");
  if (suspect) {
    console.log("[input] SUSPECT CLICKED:", suspect.dataset.suspectIndex);
    playSound("select");
    selectSuspect(Number(suspect.dataset.suspectIndex));
    return;
  }

  if (e.target.closest("#accuseBtn")) {
    console.log("[input] ACCUSE CLICKED");
    accuse();
    return;
  }

  if (e.target.closest("#nextCaseBtn")) {
    console.log("[input] NEXT CASE CLICKED");
    advanceToNextCase();
    return;
  }
}

function attachSwipeHandlers() {
  const panels = document.getElementById("tabPanels");
  if (!panels) return;

  let startX = 0, startY = 0, startTime = 0, tracking = false;

  panels.addEventListener("touchstart", (e) => {
    const t = e.changedTouches[0];
    startX = t.clientX;
    startY = t.clientY;
    startTime = Date.now();
    tracking = true;
  }, { passive: true });

  panels.addEventListener("touchend", (e) => {
    if (!tracking) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    const dt = Date.now() - startTime;

    if (dt > SWIPE_MAX_TIME) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (Math.abs(dy) > Math.abs(dx)) return;

    cycleTab(dx > 0 ? -1 : 1);
  }, { passive: true });
}

function attachKeyboardHandlers() {
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (state.gameOver) {
      if (e.key.toLowerCase() === "r") advanceToNextCase();
      return;
    }

    const n = Number(e.key);
    if (n >= 1 && n <= state.currentCase.suspects.length) {
      selectSuspect(n - 1);
      return;
    }

    if (e.key === "Enter") {
      accuse();
      return;
    }

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      cycleTab(e.key === "ArrowRight" ? 1 : -1);
      return;
    }

    if (e.key.toLowerCase() === "e") setActiveTab("evidence");
    if (e.key.toLowerCase() === "s") setActiveTab("suspects");
  });
}
