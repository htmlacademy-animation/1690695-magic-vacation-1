import TextAnimation from "./text-animation";

const TITLES = [
  {
    name: `intro-title`,
    selector: `.intro__title`,
    duration: 400,
    delay: 300,
    screenName: `top`,
    activeClass: `active-text`,
    transitionProperty: `transform`,
    noWords: false,
  },
  {
    name: `intro-date`,
    selector: `.intro__date`,
    duration: 400,
    delay: 700,
    screenName: `top`,
    activeClass: `active-text`,
    transitionProperty: `transform`,
    noWords: true,
  },
  {
    name: `prizes`,
    selector: `.prizes__title`,
    duration: 400,
    screenName: `prizes`,
    activeClass: `active-text`,
    transitionProperty: `transform`,
    noWords: true,
  },
  {
    name: `story`,
    selector: `.slider__item-title`,
    duration: 400,
    screenName: `story`,
    activeClass: `active-text`,
    transitionProperty: `transform`,
    noWords: true,
  },
  {
    name: `rules`,
    selector: `.rules__title`,
    duration: 400,
    screenName: `rules`,
    activeClass: `active-text`,
    transitionProperty: `transform`,
    noWords: true,
  },
  {
    name: `game`,
    selector: `.game__title`,
    duration: 400,
    screenName: `game`,
    activeClass: `active-text`,
    transitionProperty: `transform`,
    noWords: true,
  }
];

export default class TextAnimationChange {
  constructor() {
    this.prevScreen = null;
    this.currentScreen = null;
    this.handleChangeScreen = this.handleChangeScreen.bind(this);
  }

  init() {
    document.body.addEventListener(`screenChanged`, this.handleChangeScreen);
    TITLES.forEach((item) => {
      if (window.location.hash.substring(1) === item.screenName || !window.location.hash) {
        this.runAnimation(item);
      }
    });
  }

  runAnimation(item) {
    if (!this[item.name]) {
      this[item.name] = new TextAnimation(item.selector, item.duration, item.activeClass, item.transitionProperty, item.noWords);
    }

    setTimeout(() => {
      this[item.name].runAnimation();
    }, item.delay || 100);
  }

  handleChangeScreen(e) {
    this.prevScreen = this.currentScreen;
    this.currentScreen = e.detail.screenName;

    TITLES.forEach((item) => {
      if (this.prevScreen === item.screenName || !this.prevScreen) {
        this[item.name].destroyAnimation();
      }
      if (e.detail.screenName === item.screenName) {
        this.runAnimation(item);
      }
    });
  }
}
