// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import TextAnimationChange from "./modules/text-animation-change";
import initGameTimer from "./modules/game-timer";
import Scene2DSeaCalf from './modules/scene-2d-sea-calf.js';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
initGameTimer();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const textAnimationChange = new TextAnimationChange();
textAnimationChange.init();

window.addEventListener(`load`, () => {
  document.body.classList.add(`loaded`);
});

const scene = new Scene2DSeaCalf();
