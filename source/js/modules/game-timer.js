import {animateDuration} from "./utils";

const gameTimer = (timerMinutes) => {
  const container = document.querySelector(`.game__counter`);
  const [minutes, seconds] = container.querySelectorAll(`span`);
  let animation = null;

  document.body.addEventListener(`screenChanged`, ({detail}) => {
    if (detail.screenName === `game`) {
      const remaining = timerMinutes * 60 * 1000;

      animation = animateDuration((elapsed) => {
        const time = new Date(Math.floor(remaining - elapsed));

        minutes.textContent = time.getMinutes().toString().padStart(2, `0`);
        seconds.textContent = time.getSeconds().toString().padStart(2, `0`);
      }, remaining);
    } else if (animation) {
      animation.cancel();
    }
  });
};

export default () => {
  gameTimer(5);
};
