const prizeSvgPathAnimationDur = `0.5s`;
const gapSize = 5;

export const addPrizeSvgPathAnimation = (el) => {
  const totalLength = el.getTotalLength();
  const dashSize = (totalLength - 3 * gapSize) / 3;
  el.insertAdjacentHTML(
      `afterbegin`,
      `<animate attributeName="stroke-dasharray" from="${gapSize}, ${dashSize}" to="${totalLength/3}, 0" dur=${prizeSvgPathAnimationDur} fill="freeze"/>
           <animate attributeName="stroke-dashoffset" from="-${dashSize}" to="0" dur=${prizeSvgPathAnimationDur} fill="freeze"/>`
  );
};

export const startPrizeSvgAnimation = (el) => {
  let svg = el.querySelector(`.result__title-animated`);
  let isFailedResult = svg.classList.contains(`failed-result`);

  if (svg) {
    Array.from(svg.children).forEach((path, index) => {
      if (isFailedResult) {
        setTimeout(() => {
          path.classList.add(`start-translate`);
        }, 80 * (index + 1));
      }
      Array.from(path.children).forEach((animation) => {
        animation.beginElement();
      });
    });
  }
};
