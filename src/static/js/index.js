console.log("HELLLOOOOOOOO")

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
  console.log (".remove");
});

buttonClose.addEventListener("click",function(){
  modal.classList.add("modal-bg_close");
  buttonOpen.focus();
  console.log (".add");
});

window.addEventListener("keydown", function (event) {
  if(!modal.classList.contains("modal-bg_close") && event.code==="Escape"){
    modal.classList.add("modal-bg_close");
    buttonOpen.focus();
    console.log ("esc");
  }
});

// var buttonMobileHeader = document.querySelector(".header__button-mobile_js");
// var buttonCloseMobileHeader = document.querySelector(".mobile-header__close_js");
// var mobileHeader = document.querySelector(".mobile-header");

// //open
// buttonMobileHeader.addEventListener("click",function(){
//   mobileHeader.classList.add("mobile-header_open");
// });

// //close
// buttonCloseMobileHeader.addEventListener("click", function(){
//   mobileHeader.classList.remove("mobile-header_open");
// });

//***button-fixed********************************************************************************/
(function(){

  let btnFix = document.querySelector(".btn-fixed_js");
  let timer;
  let scrolled;

	window.addEventListener("scroll", function(event){
		if (window.pageYOffset > 1500){
      btnFix.classList.remove("btn-fixed_hidden");
		}
		else if (window.pageYOffset < 1500) {
      btnFix.classList.add("btn-fixed_hidden");
    }
  });

  btnFix.addEventListener("click", function (){
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

//************************************************************************** */
console.log("Форма подключилась c images");

function getValuesForm(form) {
    let body = {};//здесь будут лежать все значения формы позволяет получить список всех  input кторые находяться в форме (это ответ который она отдаст в консоли)
    const inputs = form.querySelectorAll("input");//создает массив инпутов (внутри формы найди все элементы который называються input)

    let l = inputs.length; 

    for (let i=0; i < l; i++) {
    const input = inputs[i]; 

    switch (input.type) { //если инпут активный(выбран) то запиши в body это значение
        case "checkbox":
        if (input.checked) {//если выбран checkbox то положи в body значение 
            body [input.name] = input.value;
            console.log("Сработал Чекбокс");
        }
        break;
      

    //  case "radio":
    //   if (input.checked) {//если выбран checkbox то положи в body значение 
    //       body [input.name] = input.value;
    //   }
    //   break;

    //не надо (надо тогда когда 2 чекбокса)
    //     case "checkbox":
    //         if (!body[input.name]) {//если вдруг у body данного ключа нет (= undefound) то 
    //        // тогда создай пустой массив
    //         body [input.name] = []; // пустой массив
    //     }

    //     //Делаем проверку если чекбокс сейчас checked (нажат)
    //     if (input.checked) {//при выборе 
    //        let arr = body[input.name]; //тогда сохрани это в отдельный массив
    //        const arrL = arr.lenght; //узнай длинну массива 
    //        arr[arrL] = input.value; // и в длинну массива arr[arrL] запиши input.value;
    //          body[input.name] = arr; //обновляем значение в нашем ключе

    //       //[]
    //       //LenghtMassive: 0; Index = 0;
    //       //[1, 2, 3];
    //       //LenghtMassive: 3; Index = 3; - счет идет от 0 т.е 0, 1, 2, 3 где 3 это последний индекс элемента если его создать и положить

    //       //const inputL- новый не существующий пока элемент и мы его создаем
    //         const inputL = body [input.name].length;//индекс элемента
    //         body [input.name][inputL] = input.value;//в ключик массив [input.name] положи в индекс inputL следующее значение input.value
    //     }
    //     break;

    //  //Для радиокнопки
    //     case "radio":
    //         if (input.checked) {//если выбран то положи в body значение 
    //         body [input.name] = input.value;
    //     }
    //     break;

    //   //Для файла
    //   case "file":
    //     //проверки никакие не нужны просто записываем
    //     body [input.name] = input.files;
    //     break;

       //значения по умолчанию
      default:
        body [input.name] = input.value;
        break;
    }

    //body[input.name] = input.value; //это конструкция означает положи в объект body в ключик у которого имя будет совпадать с именем name  у input следующее значение
    //например name=email выведеться body{email = rrr@mail.ru} input.value = rrr@mail.ru- полученное значение ввод емайла в форму от пользователя
  }

  return body;
}

function setInvalidInput (input){
  input.classList.add("is-invalid");
  
  input.addEventListener("input", function handlerInput (event){ 

    input.classList.remove("is-invalid"); 
    input.removeEventListener("input", handlerInput);
  });
}

function mailCheck(email){ 
    return email.match(/^[0-9a-z\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function errorMessageInputCreate(input, text) {
  let message = document.createElement("div");
  message.classList.add("invalid-feedback");
  message.innerText = text;//положи текст

  input.insertAdjacentElement("afterend", message);

  input.addEventListener("input", function handlerInput (event){ 
    message.remove();
    input.removeEventListener("input", handlerInput);

  });
}

//Функция обработчик на вход принимает форму form и объект ошибок errors
function setFormErrors (form, errors) {
  const inputs = form.querySelectorAll("input");
  //const textareas = form.querySelectorAll("textarea");
  let l = inputs.length; //длинна массива инпутов

  for (let i=0; i < l; i++) {
    const input = inputs[i]; //на каждой итерации создай один инпут
    switch (input.type) { //создаем switch для каких-то изменений 
      case "radio":
        if(errors[input.name]){//если в нашем объекте errors есть такой ключик какой у нас name у input например name=email или name=password
        //тогда вызови функцию для  нашего инпута
          setInvalidInput (input);
        }
        break;
      case "checkbox":
        if(errors[input.name]){
            setInvalidInput (input);
        }
        break;
      case "file":
        if(errors[input.name]){
          setInvalidInput (input);
      }
        break;
      default:
        if(errors[input.name]){
          setInvalidInput (input);
          //вызываем у всех элементов
          errorMessageInputCreate(input, errors[input.name]); //передаем input а в качестве второго аргумента будем передавать текст нашей ошибки
        }
        break;
    }
  }
}

(function () {
  //*Header**Validation form**Sign in modal***********************************************************/
  let formModalSign = document.forms["modal-Sign"];//пишем так в случае если есть дефис
  console.log(formModalSign);

  //навешиваем слушатель на форму на кнопку submit 
  formModalSign.addEventListener ("submit", function (event) {
    event.preventDefault();
    
    //event.target - это таргет нашего события, то над чем происходит действие
    const form = event.target;//форма
    console.log("Вывожу форму", form);//позволяет посмотрет нашу форму. В target находится наша форма
    
    //console.log(getValuesForm(event.target)); //равнозначен
    const values = getValuesForm(form);//получили все значения из формы и вывели в консоль
    console.log(values);
    
    const email = form.querySelector(".email_js")

    //создаем объект у которого есть ключи 
    let errors = { 
        //Ключ email: //данная строка появиться под полем в случае если она есть 
        //Ключ password: //данная строка появиться под полем в случае если она есть 
    };

    //сделаем проверку на email 
    //если значение не mailCheck где values.email -   то
    if (!mailCheck(values.email)) { //внутри ключа емайл находится ошибка для поля .email в виде строки

      //?? setInvalidInput(email);//вызываем ранее созданную функцию и посмотрим что произойдет

      errors.email = "Please enter a valid email address(your entry is not in the format «somebody@example.com»";
      
      //! const input = form.querySelector(".email_js");//обращаюсь к форме и ищем у которой есть класс email_js
      //! console.log(input);
      //! input.classList.add("is-invalid"); //вызываю в  input список классов и добавляю ему в(input) дополнительный класс 
    }

    //проверка длины пароля
    if (values.password.length < 3 || values.password.length >= 20){
      errors.password = "This field is required";
      //! const input2 = form.querySelector(".password_js");//обращаюсь к форме и ищем у которой есть класс password_js
      //! input2.classList.add("is-invalid"); //вызываю в input список классов и добавляю ему(input) дополнительный класс 
      //console.log(input2);
    }
    console.log("Длинна пароля", values.password.length)

    //вызываем функцию ошибок в которую мы передаем форму и передаем объект ошибок
    setFormErrors (form, errors);
  });

  
//*Header**Validation form**Register modal***********************************************************/
  let formModalReg = document.forms.modalReg;//нашли форму можно ее вывести через консоль лог
  console.log(modalReg);

  formModalReg.addEventListener ("submit", function(event){
    event.preventDefault();
    const form = event.target;
    
    const values = getValuesForm(form);
    console.log(values);

    let errors = {};
    if (!mailCheck(values.email)) {
      errors.email = "Please enter a valid email address(your entry is not in the format «somebody@example.com»";
    }

    if (values.password.length < 3 || values.password.length >= 20){
      errors.password = "This field is required";
    }

    if (values.usName.length < 2){
      errors.usName = "This field is required";
    }

    if (values.usSurname.length < 2){
      errors.usSurname = "This field is required";
    }

    if (values.repPassword.length < 2){
      errors.repPassword = "This field is required";
    }

    if (values.location.length < 2){
      errors.location = "This field is required";
    }

    if (values.age.length < 1){
      errors.age = "This field is required";
    }

    setFormErrors (form, errors);
});

/**Footer**Validation form**Send message modal********************************************************/
let formModalSend = document.forms["modal-Send"];
  console.log(formModalSend);

  formModalSend.addEventListener ("submit", function(event){
    event.preventDefault();
    const form = event.target;//определяем форму над которой будет действие
    
    const values = getValuesForm(form);
    console.log(values);
    
    let errors = {};
    if (!mailCheck(values.email)) {
      errors.email = "Please enter a valid email address(your entry is not in the format «somebody@example.com»";
    }

    if (values.usName.length < 2){
      errors.usName = "This field is required";
    }

    if (values.messageSubject.length < 2){
      errors.messageSubject = "This field is required";
    }

    if (values.phone.length < 5){
      errors.phone = "This field is required";
    }

    setFormErrors (form, errors);
  });

})();
