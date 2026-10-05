/* ============================================================
   js/input.js
   Centralized input: swipe gestures + keyboard shortcuts.
   Every input method routes through controller actions, so
   adding a new input (gamepad?) later is a 5-line change.
   ============================================================ */

import { state } from "./state.js";
import {
  selectSuspect,
  accuse,
  cycleTab,
  setActiveTab
} from "./controller.js";
import { loadNextCase } from "./case.js";
import { renderAll, clearResult } from "./renderer.js";
import { startTimer } from "./controller.js";

const SWIPE_THRESHOLD = 50; // px
const SWIPE_MAX_TIME  = 600; // ms

export function attachInputHandlers() {
  attachSwipeHandlers();
  attachKeyboardHandlers();
}

/* ---------- Swipe ---------- */

function attachSwipeHandlers() {
  const panels = document.getElementById("tabPanels");
  if (!panels) return;

  let startX = 0, startY = 0, startTime = 0;
  let tracking = false;

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

    // Must be a horizontal swipe, quick, and long enough
    if (dt > SWIPE_MAX_TIME) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll, ignore

    // Swipe right = previous tab, swipe left = next tab
    cycleTab(dx > 0 ? -1 : 1);
  }, { passive: true });
}

/* ---------- Keyboard ---------- */

function attachKeyboardHandlers() {
  document.addEventListener("keydown", (e) => {
    // Ignore if typing into an input (future-proofing)
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

    // Number keys → select suspect
    const n = Number(e.key);
    if (n >= 1 && n <= state.currentCase.suspects.length) {
      selectSuspect(n - 1);
      return;
    }

    // Enter → accuse
    if (e.key === "Enter") {
      accuse();
      return;
    }

    // Arrow keys / Tab → switch tabs
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      cycleTab(e.key === "ArrowRight" ? 1 : -1);
      return;
    }

    // E / S shortcuts
    if (e.key.toLowerCase() === "e") setActiveTab("evidence");
    if (e.key.toLowerCase() === "s") setActiveTab("suspects");
  });
}
