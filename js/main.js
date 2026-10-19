import { startGame } from "./controller.js";
import { attachInputHandlers } from "./input.js";
import { initAudio } from "./audio.js";

startGame();
attachInputHandlers();
initAudio();
