import animate from "./src/scripts/animate";

const goToTopElement = document.querySelector(".go-to-top");
const goToTopText = goToTopElement.querySelector(".go-to-top__text");
const figuresSection = document.querySelector(".figures");

function animateFigure(figure, data) {
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

  animate({
    timing: (progress) => Math.sqrt(1 - Math.pow(progress - 1, 2)),
    callback: (progress) => {
      figureProgressNumber.textContent =
        Math.ceil(progress * data.value) + (data.isPercent ? "%" : "");
      figureProgressBar.setAttribute(
        "stroke-dashoffset",
        `${figureCircumference - progress * maxLength}px`
      );
    },
    duration: 2000,
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
      animateFigures();
      observer.disconnect();
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

const videoPlayerElement = document.querySelector(".video__player");
const playVideoButton = videoPlayerElement.querySelector(".video__play-button");
const muteVideoButton = videoPlayerElement.querySelector(".video__mute-button");

function toggleVideo(videoPlayerElement) {
  const video = videoPlayerElement.querySelector("video");

  if (video.paused) {
    video.play();
    playVideoButton.style.opacity = 0;
  } else {
    video.pause();
    playVideoButton.style.opacity = 1;
  }
}

function toggleVideoSound(videoPlayerElement) {
  const video = videoPlayerElement.querySelector("video");

  if (video.muted) {
    video.muted = false;

    videoPlayerElement.querySelector(".video__mute-button-icon").style.display =
      "block";
    videoPlayerElement.querySelector(
      ".video__unmute-button-icon"
    ).style.display = "none";
  } else {
    video.muted = true;

    videoPlayerElement.querySelector(".video__mute-button-icon").style.display =
      "none";
    videoPlayerElement.querySelector(
      ".video__unmute-button-icon"
    ).style.display = "block";
  }
}

videoPlayerElement.addEventListener("click", () =>
  toggleVideo(videoPlayerElement)
);

muteVideoButton.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleVideoSound(videoPlayerElement);
});
