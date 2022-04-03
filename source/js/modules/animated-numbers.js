import {animateProgress} from './utils';


export default class AnimatedNumbers {
  constructor(options) {
    this.animations = [];
    this.elements = document.querySelectorAll(options.elements);
    this.delay = options.delay || 0;
    this.duration = options.duration || 1000;
    this.durationAttenuation = options.durationAttenuation || 0;
  }


  animate() {
    this.clear();
    this.stopAllAnimations();

    this.timeout = setTimeout(() => {
      this.startAllAnimtions();
    }, this.delay);
  }


  clear() {
    this.elements.forEach((number) => {
      number.innerHTML = `0`;
    });
  }


  startAllAnimtions() {
    this.stopAllAnimations();

    this.elements.forEach((number) => {
      const numberStopCount = parseInt(number.dataset.animateCount, 10) || 0;
      const currentCount = parseInt(number.dataset.initialCount, 10) || 0;

      setTimeout(() => {
        this.startAnimationForNumber(
          number,
          numberStopCount,
          this.duration,
          currentCount,
          parseInt(number.dataset.animateFps, 10) || 12);
      }, number.dataset.durationAttenuation || 0);

    });
  }


  startAnimationForNumber(element, stopCount, duration, currentCount, fps) {
    const fpsInterval = 1000 / fps;
    let now;
    let then = Date.now();
    let elapsed;

    const animation = animateProgress((progress) => {
      now = Date.now();
      elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        element.innerHTML = currentCount.toString();

        currentCount = Math.ceil(progress * stopCount);
      }
    }, duration);

    animation.then(() => {
      element.innerHTML = stopCount;
    });
  }


  stopAllAnimations() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    if (this.animations.length) {
      this.animations.forEach((raf) => cancelAnimationFrame(raf));
    }

    this.animations = [];
  }
}
