// Step 1: Get DOM elements
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector(".carousel .time");
let overlayDom = document.getElementById("overlay");
let closeOverlayDom = document.getElementById("closeOverlay");
let backSolutionsDom = document.getElementById("backSolutions");
let navLinks = document.querySelectorAll(".nav-link"); // Sélectionner toutes les nav-links

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 30000; // 30 seconds for auto-slide

nextDom.onclick = function () {
  showSlider("next");
  resetAutoSlideTimer();
};

prevDom.onclick = function () {
  showSlider("prev");
  resetAutoSlideTimer();
};

let runTimeOut;
let autoSlideExecuted = false; // Flag to check if the auto-slide has been executed

let runNextAuto = setTimeout(() => {
  if (!autoSlideExecuted) {
    nextDom.click();
    autoSlideExecuted = true;
  }
}, timeAutoNext);

function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(".carousel .thumbnail .item");

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, timeRunning);

  clearTimeout(runNextAuto);
  runNextAuto = setTimeout(() => {
    next.click();
  }, timeAutoNext);
}

// Function to reset the auto-slide timer
function resetAutoSlideTimer() {
  clearTimeout(runNextAuto);
  if (!autoSlideExecuted) {
    runNextAuto = setTimeout(() => {
      if (!autoSlideExecuted) {
        nextDom.click();
        autoSlideExecuted = true;
      }
    }, timeAutoNext);
  }
}

// Function to fade in the overlay and change z-index
function fadeInOverlay() {
  overlayDom.classList.add("show");
  navLinks.forEach((link) => link.classList.add("black-font"));
}

// Function to fade out the overlay and reset z-index
function fadeOutOverlay() {
  overlayDom.classList.remove("show");
  navLinks.forEach((link) => link.classList.remove("black-font"));
}

// Add event listeners to the contact buttons
let contactButtons = document.getElementsByClassName("contactButton");
for (let i = 0; i < contactButtons.length; i++) {
  contactButtons[i].addEventListener("click", fadeInOverlay);
}

// Add event listener to the close button
closeOverlayDom.addEventListener("click", fadeOutOverlay);
backSolutionsDom.addEventListener("click", fadeOutOverlay);
