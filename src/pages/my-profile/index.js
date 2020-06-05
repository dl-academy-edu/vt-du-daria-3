/***Change password***************************************************************************/
var modalEditpsw = document.querySelector(".modalEditpsw-bg_js");
var buttonOpenEditpsw = document.querySelector(".change__psw_js");
var buttonCloseEditpsw = document.querySelector(".modalEditpsw-window__close_js");
var input3 = document.querySelector(".modalEditpsw-window__input_js");

function modalAdd(){
  modalEditpsw.classList.remove("modalEditpsw-bg_close");
  input3.focus();
}

function modalRem(){
  modalEditpsw.classList.add("modalEditpsw-bg_close");
  buttonOpenEditpsw.focus();
}

buttonOpenEditpsw.addEventListener("click", modalAdd);
buttonCloseEditpsw.addEventListener("click", modalRem);
  

window.addEventListener("keydown", function (event) {
  if(!modalEditpsw.classList.contains("modalEditpsw-bg_close") && event.code==="Escape"){
    modalEditpsw.classList.add("modalEditpsw-bg_close");
    buttonOpenEditpsw.focus();
  }
});

/***Change other data**************************************************************************/
var modalEditDate = document.querySelector(".modalEditDate-bg_js");
var buttonOpenEditDate = document.querySelector(".change__data_js");
var buttonCloseEditDate = document.querySelector(".modalEditDate-window__close_js");
var input4 = document.querySelector(".modalEditDate-window__input_js");

buttonOpenEditDate.addEventListener("click", function(){
  modalEditDate.classList.remove("modalEditDate-bg_close");
    input4.focus();
});

buttonCloseEditDate.addEventListener("click",function(){
  modalEditDate.classList.add("modalEditDate-bg_close");
  buttonOpenEditDate.focus();
});
  
window.addEventListener("keydown", function (event) {
  if(!modalEditDate.classList.contains("modalEditDate-bg_close") && event.code==="Escape"){
    modalEditDate.classList.add("modalEditDate-bg_close");
    buttonOpenEditDate.focus();
  }
});
