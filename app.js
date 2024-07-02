// Step 1: Get DOM elements
let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom ? carouselDom.querySelector(".carousel .list") : null;
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom ? thumbnailBorderDom.querySelectorAll(".item") : [];
let timeDom = document.querySelector(".carousel .time");
let overlayDom = document.getElementById("overlay");
let closeOverlayDom = document.getElementById("closeOverlay");
let backSolutionsDom = document.getElementById("backSolutions");
let navLinks = document.querySelectorAll(".nav-link a, .nav-link p"); // Sélectionner toutes les nav-links

if (thumbnailBorderDom && thumbnailItemsDom.length > 0) {
  thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
}

let timeRunning = 3000;
let timeAutoNext = 30000; // 30 seconds for auto-slide

if (nextDom) {
  nextDom.onclick = function () {
    showSlider("next");
    resetAutoSlideTimer();
  };
}

if (prevDom) {
  prevDom.onclick = function () {
    showSlider("prev");
    resetAutoSlideTimer();
  };
}

let runTimeOut;
let autoSlideExecuted = false; // Flag to check if the auto-slide has been executed

let runNextAuto = setTimeout(() => {
  if (!autoSlideExecuted && nextDom) {
    nextDom.click();
    autoSlideExecuted = true;
  }
}, timeAutoNext);

function showSlider(type) {
  console.log("Show slider:", type);
  let SliderItemsDom = SliderDom ? SliderDom.querySelectorAll(".carousel .list .item") : [];
  let thumbnailItemsDom = document.querySelectorAll(".carousel .thumbnail .item");

  if (type === "next" && SliderDom && thumbnailBorderDom) {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else if (SliderDom && thumbnailBorderDom) {
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
    nextDom.click();
  }, timeAutoNext);

  // Update text color based on the new slide
  handleSlideChange();
}

function resetAutoSlideTimer() {
  console.log("Reset auto slide timer");
  clearTimeout(runNextAuto);
  if (!autoSlideExecuted && nextDom) {
    runNextAuto = setTimeout(() => {
      if (!autoSlideExecuted) {
        nextDom.click();
        autoSlideExecuted = true;
      }
    }, timeAutoNext);
  }
}

// function handleSlideChange() {
//   const currentSlide = document.querySelector(".carousel .list .item:first-child img");
//   if (currentSlide) {
//     if (currentSlide.complete) {
//       updateTextColor(currentSlide);
//     } else {
//       currentSlide.addEventListener("load", () => updateTextColor(currentSlide));
//     }
//   }
// }

// Function to fade in the overlay and change z-index
function fadeInOverlay() {
  overlayDom.classList.add("show");
  navLinks.forEach((link) => link.classList.add("dark-font"));
}

// Function to fade out the overlay and reset z-index
function fadeOutOverlay() {
  overlayDom.classList.remove("show");
  navLinks.forEach((link) => link.classList.remove("dark-font"));
}

// Add event listeners to the contact buttons
let contactButtons = document.getElementsByClassName("contactButton");
for (let i = 0; i < contactButtons.length; i++) {
  contactButtons[i].addEventListener("click", fadeInOverlay);
}

// Add event listener to the element with ID "mention-contact"
let mentionContactButton = document.getElementById("mention-contact");
if (mentionContactButton) {
  mentionContactButton.addEventListener("click", function () {
    fadeInOverlay();
  });
}

// Add event listener to the close button
if (closeOverlayDom) {
  closeOverlayDom.addEventListener("click", fadeOutOverlay);
}

if (backSolutionsDom) {
  backSolutionsDom.addEventListener("click", fadeOutOverlay);
}
