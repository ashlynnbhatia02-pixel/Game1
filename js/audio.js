/* ============================================================
   js/audio.js
   Sound manager. Handles the browser autoplay policy by
   unlocking audio on the first user interaction.
   ============================================================ */

let audioContext = null;
let unlocked = false;

const sounds = {
  typewriter: "assets/audio/typewriter.mp3",
  paper:      "assets/audio/paper.mp3",
  win:        "assets/audio/win.mp3",
  lose:       "assets/audio/lose.mp3",
  select:     "assets/audio/select.mp3"
};

// Preload <audio> elements so the first play isn't laggy.
const buffers = {};

function preload() {
  Object.entries(sounds).forEach(([name, path]) => {
    const audio = new Audio(path);
    audio.preload = "auto";
    audio.volume = 0.6;
    buffers[name] = audio;
  });
}

// Called on first user gesture. Creates AudioContext and plays
// a silent sample to unlock the audio pipeline.
export function unlockAudio() {
  if (unlocked) return;
  unlocked = true;

  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // A 1-sample silent buffer is enough to unlock.
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const src = audioContext.createBufferSource();
    src.buffer = buffer;
    src.connect(audioContext.destination);
    src.start(0);
  } catch (e) {
    console.warn("AudioContext unlock failed:", e);
  }
}

// Play a sound by name. Safe to call before unlock — it will
// silently no-op rather than throw.
export function playSound(name) {
  if (!unlocked) return;
  const audio = buffers[name];
  if (!audio) return;

  // Clone so rapid repeats can overlap (select ticks, clue clicks).
  const clone = audio.cloneNode();
  clone.volume = audio.volume;
  clone.play().catch(() => {
    // Browser refused — usually because user hasn't interacted yet.
    // We already guard with `unlocked`, so this is a rare edge case.
  });
}

// Hook: call this once from main.js
export function initAudio() {
  preload();

  // Unlock on the very first interaction of any kind.
  const unlock = () => {
    unlockAudio();
    document.removeEventListener("pointerdown", unlock);
    document.removeEventListener("keydown", unlock);
  };
  document.addEventListener("pointerdown", unlock, { once: false });
  document.addEventListener("keydown", unlock, { once: false });
}
