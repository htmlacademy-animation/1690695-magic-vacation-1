import {delay} from "./utils";

const primaryAward = document.getElementById(`primary-award`);
const secondaryAward = document.getElementById(`secondary-award`);
const additionalAward = document.getElementById(`additional-award`);

export const startPrizesAnimation = async () => {
  primaryAward.src = `img/primary-award.svg?${new Date().getTime()}`;
  await delay(4000);
  secondaryAward.src = `img/secondary-award.svg?${new Date().getTime()}`;
  await delay(2500);
  additionalAward.src = `img/additional-award.svg?${new Date().getTime()}`;
};
