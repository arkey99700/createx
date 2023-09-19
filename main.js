const goToTopElement = document.querySelector(".go-to-top");
const goToTopText = goToTopElement.querySelector(".go-to-top__text");
const goToTopButton = goToTopElement.querySelector(".go-to-top__button");
const figuresSection = document.querySelector(".figures");

function animateFigure(figure, data) {
  const animationDuration = 2500;
  const figureProgressBar = figure.querySelector(".figures__item-progress-bar");
  const figureProgressNumber = figure.querySelector(".figures__item-value");
  const figureCircumference = 2 * Math.PI * 74;
  const maxLength = (data.value * figureCircumference) / data.maxValue;
  figureProgressBar.setAttribute(
    "stroke-dasharray",
    `${figureCircumference}px`
  );
  figureProgressBar.setAttribute(
    "stroke-dashoffset",
    `${figureCircumference}px`
  );

  let startTime;

  requestAnimationFrame(function animationTick(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    let progress = (currentTime - startTime) / animationDuration;

    if (progress > 1) progress = 1;

    progress = 1 - Math.pow(1 - progress, 4);

    figureProgressNumber.textContent =
      Math.ceil(progress * data.value) + (data.isPercent ? "%" : "");
    figureProgressBar.setAttribute(
      "stroke-dashoffset",
      `${figureCircumference - progress * maxLength}px`
    );

    if (progress < 1) {
      requestAnimationFrame(animationTick);
    }
  });
}

function animateFigures() {
  const limits = [
    { value: 98, maxValue: 98, isPercent: true },
    { value: 20, maxValue: 27 },
    { value: 9452, maxValue: 12000 },
    { value: 100, maxValue: 100, isPercent: true },
  ];
  const figuresElements = document.querySelectorAll(".figures__item");

  figuresElements.forEach((figure, index) => {
    animateFigure(figure, limits[index]);
  });
}

function figuresObserverCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        animateFigures();
        observer.disconnect();
      }, 200);
    }
  });
}

const figuresObserver = new IntersectionObserver(figuresObserverCallback);
figuresObserver.observe(figuresSection);

window.addEventListener("scroll", () => {
  const rect = document.body.getBoundingClientRect();

  if (rect.top < -window.innerHeight / 2) {
    goToTopElement.style.opacity = 1;

    if (Math.floor(rect.bottom) - window.innerHeight === 0) {
      goToTopText.style.opacity = 1;
    } else {
      goToTopText.style.opacity = 0;
    }
  } else {
    goToTopElement.style.opacity = 0;
  }
});
