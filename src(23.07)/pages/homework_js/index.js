function myFunkLes1(){
  let age, name, sName;

  age = +prompt("Введите Ваш возраст: ");
  name = prompt("Введите Ваше имя: ");
  sName = prompt("Введите Вашу фамилию: ");

  let user = {
    age: age,
    name: name,
    sName: sName,
  }
  console.log(user);
}

btnLes1.onclick=myFunkLes1;

//***********************************************************/
let useNum1;
let i=1;

function myFunkLes2(){
  useNum1 = +prompt("Введите любое число: ");
  
  while (i < useNum1) {
    if (i%4) {
      console.log (i);
    }
    i++;
  }
  console.log(useNum1);
}

btnLes2.onclick=myFunkLes2;

//***********************************************************/
let useNum2;

function myFunkLes2_1(){
  useNum2 = +prompt("Введите число: ");

  if (Number.isNaN(useNum2)) {
    alert ("Ошибка Вы ввели не число, повторите попытку!");
    myFunkLes2_1()
  }
  else { 
    alert ("Поздравляю Вы ввели число!");
  }
  console.log (useNum2);
}

btnLes2_1.onclick=myFunkLes2_1;

//***********************************************************/
let useVar, useNum3, useNum4;

function myFunkLes2_2(){
  useNum3 = +prompt("Введите любое число: ");

  if (Number.isNaN(useNum3)) {
    alert ("Ошибка Вы ввели не число повторите попытку!");
    return myFunkLes2_2();
  }

  function funk(){
    useNum4 = +prompt("Повторите это же число: ");

    useVar = useNum3;

    if (Number.isNaN(useNum4)) {
      alert ("Ошибка Вы ввели не число повторите попытку!");
      return funk();
    }

    else if (useNum4 > useVar) {
      alert ("Ошибка число "+ useNum4 +" больше положенного повторите попытку: ");
      return funk();
    }

    else if (useNum4 < useVar) {
      alert  ("Ошибка число "+ useNum4 +" меньше положенного повторите попытку: ");
      return funk();
    }

    else { 
      alert ("Поздравляю Вы ввели правильное число!");
    }
  }
  funk();

  while (i < useNum4) {
    if (i%4) {
      console.log (i);
    }
    i++;
  }
  console.log(useNum4);
}

btnLes2_2.onclick=myFunkLes2_2;

window.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    myFunkLes2_2.close();
  }
});

//***********************************************************/
let useNum5;

function myFunkLes2_3(){
  useNum5 = +prompt("Введите любое число: ");

  if (Number.isNaN(useNum5)) {
    alert ("Ошибка Вы ввели не число повторите попытку!");
    return myFunkLes2_3();
  }

  function myfunk(){
    let timerId = setInterval (function() {
      for(var i=0; i<1; i++) {
        useNum5 +=3;
        console.log(useNum5);
      }
    }, 3000)

    setTimeout (function () {
      clearInterval (timerId);
      console.log ("clearInterval");
    }, 9000)
  }
  myfunk();
}

btnLes2_3.onclick=myFunkLes2_3;
