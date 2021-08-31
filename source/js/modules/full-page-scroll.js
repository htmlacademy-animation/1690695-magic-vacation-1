import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;
    this.SCREEN_ANIMATION_TIMEOUT = 1000;
    this.FOOTER_ANIMATION_TIMEOUT = 500;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  toogleDisplay() {
    this.changeVisibilityDisplay();
    this.emitChangeDisplayEvent();
  }

  changePageDisplay() {
    const currentScreen = document.querySelector(`.screen.active`);
    this.changeActiveMenuItem();

    switch (this.screenElements[this.activeScreen].id) {
      case `prizes`:
        if (currentScreen && currentScreen.id === `story`) {
          const animationBackground = document.querySelector(`.animation-background`);

          animationBackground.classList.add(`active`);
          setTimeout(() => {
            this.toogleDisplay();
            animationBackground.classList.remove(`active`);
          }, this.SCREEN_ANIMATION_TIMEOUT);
        }
        break;
      case `rules`:
        const prizeFooter = document.querySelector(`.screen--prizes .screen__footer-note`);

        prizeFooter.classList.add(`fade-out`);
        setTimeout(() => {
          this.toogleDisplay();
          prizeFooter.classList.remove(`fade-out`);
        }, this.FOOTER_ANIMATION_TIMEOUT);
        break;
      case `game`:
        const rulesFooter = document.querySelector(`.screen--rules .screen__disclaimer`);

        rulesFooter.classList.add(`fade-out`);
        setTimeout(() => {
          this.toogleDisplay();
          rulesFooter.classList.remove(`fade-out`);
        }, this.FOOTER_ANIMATION_TIMEOUT);
        break;
      default:
        this.toogleDisplay();
    }

  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
