const goToTopElement = document.querySelector(".go-to-top");
const goToTopText = goToTopElement.querySelector(".go-to-top__text");
const goToTopButton = goToTopElement.querySelector(".go-to-top__button");

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

goToTopButton.addEventListener("click", () => {});
