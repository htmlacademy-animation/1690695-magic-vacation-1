import {delay} from "./utils";
import AnimatedNumbers from "./animated-numbers";

const primaryAward = document.getElementById(`primary-award`);
const secondaryAward = document.getElementById(`secondary-award`);
const additionalAward = document.getElementById(`additional-award`);

const numbers = new AnimatedNumbers({
  elements: `.prizes .prizes__desc b`,
  duration: 800,
  delay: 300
});


export const startPrizesAnimation = async () => {
  numbers.animate();
  primaryAward.src = `img/primary-award.svg?${new Date().getTime()}`;
  await delay(4000);
  secondaryAward.src = `img/secondary-award.svg?${new Date().getTime()}`;
  await delay(2500);
  additionalAward.src = `img/additional-award.svg?${new Date().getTime()}`;
};
