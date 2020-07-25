console.log("Форма подключилась c images");

function getValuesForm(form) {
  let body = {};
  const inputs = form.querySelectorAll("input");

  let l = inputs.length; 

  for (let i=0; i < l; i++) {
    const input = inputs[i]; 
    switch (input.type) { 
      case "checkbox":
      if (input.checked) {
        body [input.name] = input.value;
        console.log("Checked");
      }
      break;

      default:
        body [input.name] = input.value;
        break;
    }
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
  message.innerText = text;

  input.insertAdjacentElement("afterend", message);

  input.addEventListener("input", function handlerInput (event){ 
    message.remove();
    input.removeEventListener("input", handlerInput);
  });
}

function setFormErrors (form, errors) {
  const inputs = form.querySelectorAll("input");
  let l = inputs.length; 

  for (let i=0; i < l; i++) {
    const input = inputs[i]; 
    
    switch (input.type) { 
      case "radio":
        if(errors[input.name]){
          setInvalidInput (input);
        }
        break;
      case "checkbox":
        if(errors[input.name]){
            setInvalidInput (input);
            errorMessageInputCreate(input, errors[input.name]); 
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
          errorMessageInputCreate(input, errors[input.name]); 
        }
        break;
    }
  }
}

(function () {
  //*Header**Validation form**Sign in modal***********************************************************/
  let formModalSign = document.forms["modal-Sign"];

  formModalSign.addEventListener ("submit", function (event) {
    event.preventDefault();
    const form = event.target;

    let errorsDel = formModalSign.querySelectorAll(".invalid-feedback");
    for (let i = 0; i < errorsDel.length; i++) {
      errorsDel[i].remove()
    }

    const values = getValuesForm(form);
    console.log(values);
    
    const email = form.querySelector(".email_js")
    let errors = {};

    if (!mailCheck(values.email)) {
      errors.email = "Please enter a valid email address(your entry is not in the format «somebody@example.com»";
    }

    if (values.password.length < 3 || values.password.length >= 20){
      errors.password = "This field is required";
    }

    setFormErrors (form, errors);
  });

//*Header**Validation form**Register modal***********************************************************/
  let formModalReg = document.forms.modalReg;

  formModalReg.addEventListener ("submit", function(event){
    event.preventDefault();
    const form = event.target;

    let errorsDel = formModalReg.querySelectorAll(".invalid-feedback");
    for (let i = 0; i < errorsDel.length; i++) {
      errorsDel[i].remove()
    }
    
    const values = getValuesForm(form);
    console.log(values);

    let errors = {};
    if (!mailCheck(values.email)) {
      errors.email = "Please enter a valid email address (your entry is not in the format «somebody@example.com»";
    }

    if (values.password.length < 3 || values.password.length >= 20){
      errors.password = "This field is required";
    }

    if (values.name.length < 2){
      errors.name = "This field is required";
    }

    if (values.surname.length < 2){
      errors.surname = "This field is required";
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

    if (!values.accept){
      errors.accept = "This field is required";
    }

    setFormErrors (form, errors);
});

/**Footer**Validation form**Send message modal********************************************************/
let formModalSend = document.forms["modal-Send"];

  formModalSend.addEventListener ("submit", function(event){
    event.preventDefault();
    const form = event.target;

    let errorsDel = formModalSend.querySelectorAll(".invalid-feedback");
    for (let i = 0; i < errorsDel.length; i++) {
      errorsDel[i].remove()
    }

    const values = getValuesForm(form);
    console.log(values);
    
    let errors = {};

    if (!mailCheck(values.email)) {
      errors.email = "Please enter a valid email address(your entry is not in the format «somebody@example.com»";
    }

    if (values.name.length < 2){
      errors.name = "This field is required";
    }

    if (values.messageSubject.length < 2){
      errors.messageSubject = "This field is required";
    }

    if (values.phone.length < 5){
      errors.phone = "This field is required";
    }

    if (!values.accept){
      errors.accept = "This field is required";
    }

    setFormErrors (form, errors);
  });

})();

