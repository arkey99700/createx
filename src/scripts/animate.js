export default function animate({ timing, callback, duration }) {
  let startTime;

  requestAnimationFrame(function animate(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    let progress = (currentTime - startTime) / duration;

    if (progress > 1) {
      progress = 1;
    }

    progress = timing(progress);

    callback(progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  });
}
