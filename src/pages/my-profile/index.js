console.log("Change password", "Change other data")

const profileImg = document.querySelector(".profile__image_js");
const profileName = document.querySelector(".profile-user__name_js");
const profileSurname = document.querySelector(".profile-user__surname_js");
const profileEmail = document.querySelector(".profile-user__email_js");
const profilePassword = document.querySelector(".profile-user__password_js");
const profileLocation = document.querySelector(".profile-user__location_js");
const profileAge = document.querySelector(".profile-user__age_js");


/***Change password***************************************************************************/
let modalEditpsw = document.querySelector(".modalEditpsw-bg_js");
let buttonOpenEditpsw = document.querySelector(".change__psw_js");
let buttonCloseEditpsw = document.querySelector(".modalEditpsw-window__close_js");
let input3 = document.querySelector(".modalEditpsw-window__input_js");

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

(function () {
  //*Validation form***Change password***********************************************************/
  let formModalEditPsw = document.forms.modalEditPsw;

  formModalEditPsw.addEventListener ("submit", function (event) {
    event.preventDefault();
    const form = event.target;

    let errorsDel = formModalEditPsw.querySelectorAll(".invalid-feedback");
    for (let i = 0; i < errorsDel.length; i++) {
      errorsDel[i].remove()
    }

    const values = getValuesForm(form);
    console.log(values);

    let errors = {};
    if (values.oldPassword.length < 1){
      errors.oldPassword = "This field is required";
    }
    if (values.newPassword.length < 1){
      errors.newPassword = "This field is required";
    }
    if (values.repNewPassword.length < 1){
      errors.repNewPassword = "This field is required";
    }

    setFormErrors (form, errors);
  });

  /***Change other data**************************************************************************/
  let formModalEditDate = document.forms.modalEditDate;

  formModalEditDate.addEventListener ("submit", function (event) {
    event.preventDefault();

    const form = event.target;
    const values = getValuesForm(form);
    console.log(values);
  });
})();
//*********************************************************************************************** */
//функция получающая Юзера, будет делать запрос на сервер 
//получать информацию о пользователе и выводить ее
function updateUserData(){
  sendReq({
    method: "GET", 
    url:"api/users/"+ localStorage.getItem("userId"),
  })
  .then(function(response) {
    return response.json();//обязательно
  })
  //обрабатывает информацию полученную от пользователя
  .then(function (user) {
    console.log(user);
    profileName.innerHTML = user.name;
    profileSurname.innerHTML = user.surname;
    profileEmail.innerHTML = user.email;
    profileLocation.innerHTML = user.location;
    profileAge.innerHTML = user.age;
    profileImg.style = `background-image: url(${basePath}${user.photoUrl});`
  })
  .catch(function (error) {
    alert ("Информация о Вас недоступна!");
  })
}
updateUserData();

console.log("from localStorage userId =", (localStorage.getItem("userId")));

function changeData(event){
  event.preventDefault();
  const values = getAllValuesFromForm(event.target, "formData");
  console.log(values.get("email"));
  sendReq({
    method: "PUT", 
    url:"api/users/",
    body: values,
    headers: {
      "x-access-token": localStorage.getItem("token")
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    if (response.success){
      updateUserData();
    }else {
      console.log(response);
      alert("Ошибка");
    }
  })
}

