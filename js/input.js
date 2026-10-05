/* ============================================================
   js/input.js
   Centralized input: mouse clicks, swipe gestures, keyboard.
   ============================================================ */

import { state } from "./state.js";
import {
  selectSuspect,
  accuse,
  cycleTab,
  setActiveTab,
  startTimer
} from "./controller.js";
import { loadNextCase } from "./case.js";
import { renderAll, clearResult } from "./renderer.js";

const SWIPE_THRESHOLD = 50;
const SWIPE_MAX_TIME  = 600;

export function attachInputHandlers() {
  attachTabClicks();
  attachClueClicks();
  attachSuspectClicks();
  attachAccuseClick();
  attachNextCaseClick();
  attachSwipeHandlers();
  attachKeyboardHandlers();
}

/* ---------- Mouse clicks (desktop + touch both fire "click") ---------- */

function attachTabClicks() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveTab(tab.dataset.tab);
    });
  });
}

function attachClueClicks() {
  const cluesEl = document.getElementById("clues");
  cluesEl.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    readClueFromClick(li);
  });
}

function attachSuspectClicks() {
  const suspectsEl = document.getElementById("suspects");
  suspectsEl.addEventListener("click", (e) => {
    const card = e.target.closest(".suspect");
    if (!card) return;
    selectSuspect(Number(card.dataset.suspectIndex));
  });
}

function attachAccuseClick() {
  document.getElementById("accuseBtn").addEventListener("click", accuse);
}

function attachNextCaseClick() {
  document.getElementById("nextCaseBtn").addEventListener("click", () => {
    const next = loadNextCase();
    if (!next) return;
    clearResult();
    renderAll();
    startTimer();
  });
}

function readClueFromClick(li) {
  const index = Number(li.dataset.clueIndex);
  if (state.gameOver) return;
  state.cluesRead.add(index);
  li.classList.toggle("read");
}

/* ---------- Swipe (touch only) ---------- */

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

/* ---------- Keyboard (desktop) ---------- */

function attachKeyboardHandlers() {
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

    if (state.gameOver) {
      if (e.key.toLowerCase() === "r") {
        const next = loadNextCase();
        if (next) {
          clearResult();
          renderAll();
          startTimer();
        }
      }
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
