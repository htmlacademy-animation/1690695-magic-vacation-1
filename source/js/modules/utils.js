export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const animateDuration = (render, duration) => {
  let id = null;

  const promise = new Promise((resolve) => {
    const start = Date.now();

    (function tick() {
      const elapsed = Date.now() - start;

      if (elapsed > duration) {
        render(duration);
        resolve();
      } else {
        id = requestAnimationFrame(tick);
        render(elapsed);
      }
    })();
  });

  promise.cancel = () => cancelAnimationFrame(id);

  return promise;
};


// animation using raf (render function parameter is progress from 0 to 1)
export const animateProgress = (render, duration) => new Promise((resolve) => {
  const start = Date.now();
  (function loop() {
    const p = (Date.now() - start) / duration;
    if (p > 1) {
      render(1);
      // set that animation end
      resolve();
    } else {
      requestAnimationFrame(loop);
      render(p);
    }
  }());
})
