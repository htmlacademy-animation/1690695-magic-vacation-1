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
