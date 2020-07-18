console.log("setting.js подключился");

let basePath = "https://academy.directlinedev.com";
//***fech*************************************************/
function sendReq({url, method="GET", body={}, headers={}}){
  let settings = { //объект и передадим методы (параметры)
    //в ключик метод положи переменную метод
    method,
    body,
    headers,
  };

  // if (method === "GET") {
  //   settings.body = undefined;
  // }
  return fetch (basePath + url, settings);
}

const loaderBox = document.querySelector(".loader-container_js");

function createLoader() {
  return`<div class='sk-fading-circle'>
  <div class='sk-circle sk-circle-1'></div>
  <div class='sk-circle sk-circle-2'></div>
  <div class='sk-circle sk-circle-3'></div>
  <div class='sk-circle sk-circle-4'></div>
  <div class='sk-circle sk-circle-5'></div>
  <div class='sk-circle sk-circle-6'></div>
  <div class='sk-circle sk-circle-7'></div>
  <div class='sk-circle sk-circle-8'></div>
  <div class='sk-circle sk-circle-9'></div>
  <div class='sk-circle sk-circle-10'></div>
  <div class='sk-circle sk-circle-11'></div>
  <div class='sk-circle sk-circle-12'></div>
  </div>`
}

/*header**Sign in modal***************************************************************************/
let modalSignIn = document.querySelector(".modalSign-bg_js");
let buttonOpenSignIn = document.querySelector(".sign_js");
let buttonCloseSignIn = document.querySelector(".modalSign-window__close_js");
let input1 = document.querySelector(".modalSign-window__input_js");

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

function closeModalSignInAfterLogin(){
  let timerId = setInterval (function() {
    modalRem();
  }, 1000)
}

//**send form Sign in modal**/
function SignInReg(event) {
  event.preventDefault();
  loaderBox.innerHTML = createLoader();
  let values =  getAllValuesFromForm(event.target);
  console.log("Sign in modal", values); //мы получили нашу форму теперь надо ее  оправлять
 // воспользуемся sendReqwest
  sendReq({
    url: "/api/users/login", 
    method: "POST", 
    body: JSON.stringify(values),
    headers:{
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  .then(function(response) {
    return response.json();//обязательно
  })
  .then(function (json){ //в случае успеха
    if (json.success) {
      let data = json.data;
      loaderBox.innerHTML = "";
      alert (`Пользователь c id ${data.userId} успешно аутентифицирован!`);
      localStorage.setItem("userId", data.userId);
      console.log("data.userId", data);
      closeModalSignInAfterLogin();
      updateToken(data.token); //запускаем функцию и принимать на входе token
    } else {
      throw json.errors
    }
  })
  .catch (function (errors) {
    loaderBox.innerHTML = "";
    setFormErrors(event.target, errors);
  });
}

modalSignIn.addEventListener("submit", function (event) {
  SignInReg(event);
});

/*header**Register modal**************************************************************************/
let modalReg = document.querySelector(".modalReg-bg_js");
let buttonOpenReg = document.querySelector(".register_js");
let buttonCloseReg = document.querySelector(".modalReg-window__close_js");
let input2 = document.querySelector(".modalReg-window__input_js");

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

//**send form Register modal**/
function modalRegReg(event) {
  event.preventDefault();
  loaderBox.innerHTML = createLoader();
  let values =  getAllValuesFromForm(event.target);
  console.log("Sign in modal", values); //мы получили нашу форму теперь надо ее  оправлять
 // воспользуемся sendReqwest - сенд реквестом
  sendReq({
    url: "/api/users", 
    method: "POST", 
    body: JSON.stringify(values),
    headers:{
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
  .then(function(response) {
    console.log(response);
    return response.json();//обязательно
  })
  .then(function(json){
    if(json.success){
      let user = json.data;
      loaderBox.innerHTML = "";
      alert (`Пользователь ${user.name} ${user.surname}`);
    } else {
      throw json.errors
    }
  })
  .catch (function (errors) {
    loaderBox.innerHTML = "";
    setFormErrors(event.target, errors)
  });
}

modalReg.addEventListener("submit", function (event) {
  modalRegReg(event);
});

/*footer**Send message modal***********************************************************************/
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

//**send form Send message modal**/
function SendMessage(event) {
  event.preventDefault();
  loaderBox.innerHTML = createLoader();
  let values =  getAllValuesFromForm(event.target);
  let messageValues = {};
  messageValues.to = values.email;
  messageValues.body = JSON.stringify(values);
  console.log("Sign in modal", values);
  
  sendReq({
    url: "/api/emails", 
    method: "POST", 
    body: JSON.stringify(messageValues),
    headers:{
      'Content-Type': 'application/json;charset=utf-8',
    },
  })

  .then(function(response) {
    return response.json();//обязательно
  })
  .then(function(json){
    if(json.success){
      let user = json.data;
      loaderBox.innerHTML = "";
      alert (`Пользователь ${user.name}, ${user.surname}`);
    } else {
      throw json.errors
    }
  })
  .catch (function (error) {
    loaderBox.innerHTML = "";
    alert(`${JSON.stringify(error, null, 2)}`)
  });
}

modal.addEventListener("submit", function (event) {
  SendMessage(event);
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

//Общая на все формы
function getAllValuesFromForm(form, type) {
  if (type === "formData"){
    return new FormData(form);
  }
  let body = {}; 
  const inputs = form.querySelectorAll("input");
  const texareas = form.querySelectorAll("textarea");
  for (let input of inputs) {
    switch (input.type) { 
      case "radio":
        if (input.checked)
          body[input.name] = input.value
        break;

      case "checkbox":
        if (!body[input.name])
            body[input.name] = [];
        if (input.checked)
          body[input.name].push(input.value);
        break;

      case "file":
        body[input.name] = input.files;
        break;

      default:
        body[input.name] = input.value;
    }
  }
  for (let textarea of texareas) {
    body[textarea.name] = textarea.value;
  }
  return body;
}

(function checkToken() {
  const token = localStorage.getItem("token");
  if (token) {
    document.querySelector(".sign_js").classList.add("hidden");
    document.querySelector(".register_js").classList.add("hidden");
    document.querySelector(".profile_js").classList.remove("hidden");
  } else {
    document.querySelector(".sign_js").classList.remove("hidden");
    document.querySelector(".register_js").classList.remove("hidden");
    document.querySelector(".profile_js").classList.add("hidden");
  }
})();

function updateToken (token){ 
  if (token) {
    localStorage.setItem ("token", token);
    console.log("Выполнилось");
  } else {
    localStorage.removeItem("token");
  }
  checkToken();
}
