console.log("setting.js подключился");

/***Sign in***************************************************************************/
var modalSignIn = document.querySelector(".modalSign-bg_js");
var buttonOpenSignIn = document.querySelector(".sign_js");
var buttonCloseSignIn = document.querySelector(".modalSign-window__close_js");
var input1 = document.querySelector(".modalSign-window__input_js");

function modalAdd(){
  modalSignIn.classList.remove("modalSign-bg_close");
  input1.focus();
}

function modalRem(){
  modalSignIn.classList.add("modalSign-bg_close");
  buttonOpenSignIn.focus();
}

buttonOpenSignIn.addEventListener("click", modalAdd);
buttonCloseSignIn.addEventListener("click", modalRem);
  

window.addEventListener("keydown", function (event) {
  if(!modalSignIn.classList.contains("modalSign-bg_close") && event.code==="Escape"){
    modalSignIn.classList.add("modalSign-bg_close");
    buttonOpenSignIn.focus();
  }
});

/***Register**************************************************************************/
var modalReg = document.querySelector(".modalReg-bg_js");
var buttonOpenReg = document.querySelector(".register_js");
var buttonCloseReg = document.querySelector(".modalReg-window__close_js");
var input2 = document.querySelector(".modalReg-window__input_js");

buttonOpenReg.addEventListener("click", function(){
    modalReg.classList.remove("modalReg-bg_close");
    input2.focus();
});

buttonCloseReg.addEventListener("click",function(){
  modalReg.classList.add("modalReg-bg_close");
  buttonOpenReg.focus();
});
  
window.addEventListener("keydown", function (event) {
  if(!modalReg.classList.contains("modalReg-bg_close") && event.code==="Escape"){
    modalReg.classList.add("modalReg-bg_close");
    buttonOpenReg.focus();
  }
});

/***Send message**************************************************************************/
var modal = document.querySelector(".modal-bg_js");
var buttonOpen = document.querySelector(".footer__link_js");
var buttonClose = document.querySelector(".modal-window__close_js");
var input = document.querySelector(".modal-window__input_js");

buttonOpen.addEventListener("click", function(){
  modal.classList.remove("modal-bg_close");
  input.focus();
});

buttonClose.addEventListener("click",function(){
  modal.classList.add("modal-bg_close");
  buttonOpen.focus();
});

window.addEventListener("keydown", function (event) {
  if(!modal.classList.contains("modal-bg_close") && event.code==="Escape"){
    modal.classList.add("modal-bg_close");
    buttonOpen.focus();
  }
});

var buttonMobileHeader = document.querySelector(".menu__mobile_js");
var buttonCloseMobileHeader = document.querySelector(".mobile-header__close_js");
var mobileHeader = document.querySelector(".mobile-header");

//open
buttonMobileHeader.addEventListener("click",function(){
  mobileHeader.classList.add("mobile-header_open");
});

//close
buttonCloseMobileHeader.addEventListener("click", function(){
  mobileHeader.classList.remove("mobile-header_open");
});

//***button-fixed********************************************************************************/
(function(){

  let btnFix = document.querySelector(".btn-fixed_js");
  let timer;
  let scrolled;

	window.addEventListener('scroll', function(event){
		if (window.pageYOffset > 1500){
      btnFix.classList.remove("btn-fixed_hidden");
		}
		else if (window.pageYOffset < 1500) {
      btnFix.classList.add("btn-fixed_hidden");
		}
  });

  btnFix.addEventListener("click", function(){
    scrolled = window.pageYOffset;
    scrollUp();
  });
  
  function scrollUp(){
    if (scrolled > 0) {
      window.scrollTo(0, scrolled);
      scrolled = scrolled - 50;
      timer = setTimeout(scrollUp, 5);
    }
    else {
      clearTimeout(timer);
      window.scrollTo(0, 0);
    }
  }
})();

//**************************************/
function btnFixLeft(){
  let WW_width = document.documentElement.clientWidth; 
  console.log("ширина", WW_width);
  let btnFix = document.querySelector(".btn-fixed_js");
  console.log(btnFix);
  
  if (WW_width < 1400) {
    btnFix.style.left = (WW_width-100) + "px";
  }
}
btnFixLeft();

