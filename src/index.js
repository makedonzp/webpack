import "../css/style.css";
import "../css/zero_styles.css";
import "../scss/style.scss";
const images = [
  {
    url: "./images/banner_first_slide.jpg",
  },
  {
    url: "./images/banner_second_slide.jpg",
  },
  {
    url: "./images/banner_third_slide.jpg",
  },
];

//                               ПЕРЕМЕННЫЕ

let count = 0;
const sliderLine = document.querySelector(".slider_line");
const widthOffset = document.querySelector(".slider").clientWidth;
sliderLine.style.width = 3 * widthOffset + "px";
sliderLine.style.left = "-" + widthOffset + "px";
let dots = [];
let mainDotsBlock = document.querySelector(".main_dots_block");

//                        СТАРТОВАЯ СТРАНИЦА

// цикл отрисовки картинок в разметке html

function initPage() {
  let img = document.createElement("img");
  img.src = `${images[count].url}`;
  img.classList.add("images");
  sliderLine.append(img);
  for (let i = 0; i < images.length; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dots");
    mainDotsBlock.append(dot);
    dots.push(dot);
  }
  dots[count].classList.add("active_dot");
  nextImageGenerate();
  prevImageGenerate();
}
initPage();

//                                ФУНКЦИОНАЛ

// логика для элемента управления пролистывания вперед

function nextImageGenerate() {
  let nextImage = count + 1;
  if (nextImage > images.length - 1) {
    nextImage = 0;
  }
  let img = document.createElement("img");
  img.src = `${images[nextImage].url}`;
  img.classList.add("images");
  sliderLine.append(img);
}
function prevImageGenerate() {
  let prevImage = count - 1;
  if (prevImage < 0) {
    prevImage = images.length - 1;
  }
  let img = document.createElement("img");
  img.src = `${images[prevImage].url}`;
  img.classList.add("images");
  sliderLine.prepend(img);
}

function playNext() {
  count++;
  if (count >= images.length) {
    count = 0;
  }
  nextImageGenerate();
  sliderLine.style.left = "-" + widthOffset + "px";
  document.querySelector(".slider_line img").remove();
  for (let i = 0; i < images.length; i++) {
    document.querySelectorAll(".dots");
    dots[i].classList.remove("active_dot");
  }
  dots[count].classList.add("active_dot");
}
function playPrev() {
  count--;
  if (count < 0) {
    count = images.length - 1;
  }
  prevImageGenerate();
  document.querySelector(".slider_line img:last-child").remove();
  for (let i = 0; i < images.length; i++) {
    document.querySelectorAll(".dots");
    dots[i].classList.remove("active_dot");
  }
  dots[count].classList.add("active_dot");
}

let autoplay = setInterval(playNext, 2500);

let box = document.querySelector(".slider_line");

box.addEventListener("mouseover", () => {
  clearInterval(autoplay);
});
box.addEventListener("mouseleave", () => {
  autoplay = setInterval(playNext, 2500);
});
mainDotsBlock.addEventListener("mouseover", () => {
  clearInterval(autoplay);
});
mainDotsBlock.addEventListener("mouseleave", () => {
  autoplay = setInterval(playNext, 2500);
});

for (let j = 0; j < dots.length; j++) {
  dots[j].addEventListener("click", () => {
    for (let i = 0; i < images.length; i++) {
      dots[i].classList.remove("active_dot");
    }
    dots[j].classList.add("active_dot");
  });
}
