
const SERVER_URL = "https://academy.directlinedev.com";

(function(){
  let tagsBox = document.querySelector(".tag__list_js");
  let blogsBox = document.querySelector(".card__list_js");
  let limit = 5;
  let allValuesPage = getValuesFromUrl();

  function call (method, path, fn, onstart, onerror) {
    if (onstart)
          onstart();
    let xhr = new XMLHttpRequest();
    xhr.open(method, SERVER_URL + path);
    xhr.send(); 
    xhr.onload = function() {
      fn(xhr); 
    }
    xhr.onerror = function() {
      if(onerror) 
        onerror(xhr);
    }
  }

  function createTag(tag) {
    return ` 
    <li class="tag__etem">
      <label class="tag__label">
        <input class="input hidden" type="checkbox" name="option" value="${tag.id}">
        <span class="tag__click" style="border:2.5px solid ${tag.color}">
        <svg class="tag__click_active" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6.75L5.91301 12.77C6.20128 13.2135 6.85836 13.1893 7.11327 12.7259L13.425 1.25" stroke="${tag.color}" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </span>
      </label>
    </li>`
  }

  call("GET", "/api/tags", function(res) {
    let response = JSON.parse(res.response);
    if (response.success) {
      const tags = response.data;
      let tagsHTML="";
      for(let i=0; i < tags.length; i++) {
        tagsHTML += createTag(tags[i]);
      }
      tagsBox.innerHTML = tagsHTML;
      //setAllValuesForForm(filterForm. getValuesFromUrl())
    } else {
      alert("Ошибка в тэгах");
    }
  }, function(){
    tagsBox.innerHTML = createLoader();
  });

  function createCard(card, tag) {
    let date = new Date(card.date);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    let dateServer = (day + ".0" + (month + 1)+ "." + year);

    return ` 
    <li class="card__item">
      <div class ="card__item-item">
        <picture class="card__img">
        <source 
          media="(max-width: 767px)"
          srcset="${SERVER_URL}${card.mobilePhotoUrl}, ${SERVER_URL}${card.mobile2xPhotoUrl}">
        <source
          media="(max-width: 1265px)" 
          srcset="${SERVER_URL}${card.tabletPhotoUrl}, ${SERVER_URL}${card.tablet2xPhotoUrl}">
          <img
            srcset="${SERVER_URL}${card.desktopPhotoUrl}, ${SERVER_URL}${card.desktop2xPhotoUrl}"
            src="${SERVER_URL}${card.desktopPhotoUrl}" 
            class="card__img" 
            alt="${card.title}">
        </picture>
      
        <div class ="card__info">
          <div class="card__tag">
            <span class="card__tag-color_${card.id}" 
            style="border: 4px solid blue;
                    background-color: blue;
                    border-radius: 4px;
                    width: 25px; margin-right:5px"></span>
            <span class="card__tag-color_${card.id}" 
            style="border: 4px solid orange;
                    background-color: orange;
                    border-radius: 4px;
                    width: 25px;"></span>
          </div>
          <span>${dateServer}</span>
          <span>${card.views} views</span>
          <span>${card.commentsCount} comments</span>
          <h3 class="card__title">${card.title}</h3> 
          <p class="card__text">${card.text}</p>
          <a class="card__link" href="#">Go to this post</a>
        </div>
      </div>
    </li>`
  }
  
getCards(allValuesPage);

  function getCards(allValuesPage){
    const page = allValuesPage.page ? +allValuesPage.page : 1;
    const offset = (page-1)*limit;

    call("GET", `/api/posts?limit=${limit}&offset=${offset}`, function (res) {
      let response = JSON.parse(res.response);
      if (response.success) {
        const cards = response.data;
        let cardsHTML = "";
        for(let i=0; i< cards.length; i++) {
          for (let j=0; j< cards[i].tags.length; j++){
            const tag = cards[i].tags[j].tag;
            console.log(tag.color);
          }
          cardsHTML += createCard(cards[i]);
        }
        blogsBox.innerHTML = cardsHTML;
        createPagination(response.count, page);
      } else {
        alert("Ошибка в карточках");
      }
    },function(){
      blogsBox.innerHTML = createLoader();
    });
  }

  function getAllValuesFromForm(form) {
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

  const filterForm = document.forms.filterForm;

  function setAllValuesForForm(form, values) {
    const inputs = form.querySelectorAll("input");
    const texareas = form.querySelectorAll("textarea"); 

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      switch (input.type) { 
        case "radio":
          if(values[input.name] && values[input.name] === input.value) {
            input.checked = true;
          }
          break;
        case "checkbox":
          if (values[input.name]) {
            if(typeof values[input.name] === "object"){
              for (let j=0; j< values[input.name].length; j++ ) {
                let arr = values[input.name];
                if (arr[j] === input.value) {
                  input.checked = true;
                }
              }
            } else {
              if(values[input.name] === input.value) {
                input.checked = true;
              }
            }
          }
          break;

        default:
          input.value = values[input.name];
      }
    }
    for (let textarea of texareas) {
      textarea.value = values[textarea.name];
    }
  }

  function getValuesFromUrl() {
    let params = {};
    if (window.location.search){
      let paramsArray = window.location.search.substring(1).split("&");
      for (let i=0; i < paramsArray.length; i++){
        console.log(paramsArray[i], i);
        let split = paramsArray[i].split("=");
        let name = split[0];
        let value = split[1].replace(/%20/g, " ");

        if (params[name]){
          if (typeof params[name] === "string") {
            params[name] = [params[value,name], value];
          } else {
            params[name].push(value);
          }
        } else {
          params[name] = value;
        }
      }
    }
    return params;
  }
  
  function setValuesToUrl(values) {
    let params = [];
    let names = Object.keys(values);
    for (let i=0; i < names.length; i++){
      if(typeof values[names[i]] === "string") {
        params.push(names[i] + "=" + values[names[i]]);
      } else {
        for (let j = 0; j < values[names[i]].length; j++) {
          params.push(names[i] + "=" + values[names[i]][j]);
        }
      }
    }

    window.history.replaceState({}, document.title, "?" + params.join("&"));
  }
  
  setAllValuesForForm(filterForm, getValuesFromUrl());

    filterForm.addEventListener("submit", function(event){
    event.preventDefault();
    console.log(getAllValuesFromForm(event.target));
    setValuesToUrl(getAllValuesFromForm(event.target));
  })


  //****Pages************************************************************************/
  function setActivePage(activePage) {
    localStorage.setItem("activePage", activePage + 1);
  }
  
  function createPagination(count, activePage){
    let links = document.querySelector(".pages__list_js");
    links.innerHTM = "";
    for (let i=0; i < links.length; i++){
      let link = document.createElement("a");
      link.setAttribute("href", "?page="+(i+1))
      if(activePage === i+1){
        link.setAttribute("disabled", "disabled");
      }
      link.innerHTML= +(i+1);
      link.addEventListener("click", function (event) {
        event.preventDefault();
        setActivePage(i);
        let value = getAllValuesFromForm(filterForm);
        value.page =  i + 1 + "";
        console.log("значение", value);
        setValuesToUrl(value);
        allValuesPage = value;
      // document.querySelector(".result_js").innerHTML = JSON.stringify(allValuesPage, null, 2);
        getCards(allValuesPage);
      })
      links.insertAdjacentElement("beforeend", links);
    }
  }
  
  let buttonPrev = document.querySelector(".button-prev_js");
  let buttonNext = document.querySelector(".button-next_js");

  buttonPrev.addEventListener("click", function() {
  });

  buttonNext.addEventListener("click", function() {
  });

})();
