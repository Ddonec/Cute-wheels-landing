const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const sliderCont = document.querySelector(".product-into-slider-container");
const sliderWidthContainer = document.querySelector(".product-slider-container");
const paginationItems = document.querySelectorAll(".pagination-indicator-ss > div");

const pag1 = document.querySelector(".pag-1");
const pag2 = document.querySelector(".pag-2");
const pag3 = document.querySelector(".pag-3");

let widthSlider = sliderWidthContainer.clientWidth;
let count = 1;
let isPaused = false;
let secundomer = 0;
let interval;
let touchStartPozition;

sliderCont.addEventListener("touchstart", function (event) {
   touchStartPozition = event.touches[0].clientX;
   isPaused = true;
});

sliderCont.addEventListener("touchend", function (event) {
   if (touchStartPozition !== undefined) {
      const touchEndX = event.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartPozition;

      if (deltaX > 0) {
         console.log("свайп вправо");
         resetInterval();
         switchSlide("left");
      } else if (deltaX < 0) {
         console.log("свайп влево");
         resetInterval();
         switchSlide("right");
      } else {
         console.log("нет свайпа");
      }
      isPaused = false;
      touchStartPozition = undefined;
   }
});

function switchSlide(direction) {
   if (interval) {
      clearInterval(interval);
      secundomer = 0;
   }

   if (direction === "left") {
      count = count === 1 ? 10 : count - 1;
   } else {
      count = count === 10 ? 1 : count + 1;
   }

   updateSlider();
   resetInterval();
}

function updateSlider() {
   sliderCont.style.transform = "translateX(-" + widthSlider * (count - 1) + "px)";
   updatePagination();
}

function updatePagination() {
   for (let i = 1; i <= 10; i++) {
      const pag = document.querySelector(".pag-" + i);
      if (i === count) {
         pag.classList.add("pagactive");
      } else {
         pag.classList.remove("pagactive");
      }
   }
}

function resetInterval() {
   secundomer = 0;
   clearInterval(interval);
   interval = setInterval(function () {
      if (!isPaused) {
         secundomer += 100;
         if (secundomer >= 6000) {
            secundomer = 0;
            switchSlide("right");
         }
      }
   }, 100);
}

resetInterval();

window.addEventListener("resize", function () {
   widthSlider = sliderWidthContainer.clientWidth;
   updateSlider();
});

leftArrow.addEventListener("click", function () {
   switchSlide("left");
});

rightArrow.addEventListener("click", function () {
   switchSlide("right");
});

paginationItems.forEach(function (paginationItem, index) {
   paginationItem.addEventListener("click", function () {
      count = index + 1;
      updateSlider();
      resetInterval();
   });
});
