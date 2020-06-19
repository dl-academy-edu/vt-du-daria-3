console.log ("form2");
let wrapper = document.querySelector(".slider__wrapper");
let innerWrapper = document.querySelector(".slider__inner-wrapper");
let slides = document.querySelectorAll(".slider_slide");
let buttonBack = document.querySelector(".button-prev_back");
let buttonNext = document.querySelector(".button-next_next");
let pagination = document.querySelector(".button-panel__pagination");

let shearWidth = +getComputedStyle(wrapper).width.split("px")[0];
console.log ("Widtx = ", shearWidth);

let numberSlides = innerWrapper.querySelectorAll(".slider_slide").length - 1;
console.log (numberSlides);

let activeSlide = 0;

let dots = [];


function addWidthSlides() {
  shearWidth = +getComputedStyle(wrapper).width.split("px")[0];
  for(let i=0; i < slides.length; i++ ) {
    slides[i].style.width = shearWidth + "px";
  }
};

addWidthSlides();


function setActiveSlide(index) {
  innerWrapper.style.transition = "margin-left .5s"; 
  if (index < 0 || index > numberSlides) {
  return; 
}
  if (index === 0) {
    buttonBack.setAttribute("disabled", "disabled");
  } 

  if (index === numberSlides) {
    buttonNext.setAttribute("disabled", "disabled");
  }

  dots[activeSlide].classList.remove("button-panel__dot_active");

  if (activeSlide - index > 0) {
    buttonNext.removeAttribute("disabled");
  }
  if (activeSlide - index < 0) {
    buttonBack.removeAttribute("disabled");
  }

  dots[index].classList.add("button-panel__dot_active");
  
  innerWrapper.style.marginLeft ="-" + shearWidth*index + "px";
  activeSlide = index; 

}

function init(){
  for(let i = 0; i < slides.length; i++){
    let dot = document.createElement ("button");
    dot.classList.add ("button-panel__dot"); 

    if (i === activeSlide){
      dot.classList.add ("button-panel__dot_active");
    }

    dot.addEventListener("click", function() {
      setActiveSlide(i); //
    })

    dots[dots.length] = dot;

    pagination.insertAdjacentElement("beforeend", dot); 
 }
}
init();


buttonNext.addEventListener("click", function() {
  const index = activeSlide + 1;
  setActiveSlide(index); 

  console.log("index получен от кнопки", index);
});

buttonBack.addEventListener("click", function() {
   const index = activeSlide - 1;
   setActiveSlide(index);
});

window.addEventListener("resize", function() {
  innerWrapper.style.transition = "";
  addWidthSlides();
  setActiveSlide(activeSlide);
});

//******************************************************************************* */
let mySwiper = new Swiper ('.swiper-container', {

  direction: 'horizontal',

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  thumbs: {
    swiper: thumbsSwiper,
  },
})

let thumbsSwiper = new Swiper('.swiper-container-thumbs', {
  slidesPerView: 3,
});
