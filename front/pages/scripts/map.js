
let color = ["#FF0000","#AB2F90","#742FAB","#392FAB","#FF7800","#E1004C","#EBA43A"]

let map = document.querySelector('.swiper-wrapper')
let number = 10


//Меняет дату дедлайна
function change_deadline(date){
  document.getElementById('deadline').innerHTML = "Нужно выполнить все задания до " + date+" !"
}

function change_end(date){
  if (date == "0") {
    document.getElementById('end').innerHTML = "Квест ещё не завешен"
  }else{
    document.getElementById('end').innerHTML = "Квест завешен "+ date
  }
}

//Случайный выбор цветка
function flower_choose(i){
    let cos = Math.abs(Math.cos(i))*2100
    let sin = Math.abs(Math.sin(i))*2100
    let rand = Math.round(cos+sin-i)%(21);

    return String(rand)
}

//Ограничение длины текста
function text_check(text){
  if(text.length>27){
    return text.substring(0,27)+"..."
  }
  return text
}


//Создание цветка
function flower_create(type, bud, text_color,text, stem, open) { // создает цветок
  if (open) { // если открытый
    const flower = document.createElement('div'); // создаем элемент div
    flower.className = "swiper-slide"; // добавляем класс

    flower.innerHTML = '<div class="map__box">' + // добавляем вinnerHTML
      '<div class="flower fl_op' + type + '" ' + // добавляем класс fl_op
      'style="background-image: url(svg/Flowers/Open/' + bud + '.svg);">' + // и картинку
      '<div class="task" style="color: ' + text_color + ';">' + // добавляем текст
      text +
      '</div></div>' +
      '<div class="stem st_bg'+stem+'" style="background-image: url(svg/Flowers/Stems_big/' + stem + '.svg);"></div>' +
      '</div>';
    map.appendChild(flower); // добавляем в DOM

  } else { // если закрытый
    const flower = document.createElement('div');
    flower.className = "swiper-slide";

    flower.innerHTML = '<div class="map__box">' +
      '<div class="flower fl_cl' + type + '" ' +
      'style="background-image: url(svg/Flowers/Closed/' + bud + '.svg);">' +
      '<div class="task" style="color: ' + text_color + ';">' +
      text +
      '</div></div>' +
      '<div class="stem st_lt'+stem+'" style="background-image: url(svg/Flowers/Stems_little/' + stem + '.svg);"></div>' +
      '</div>';
    map.appendChild(flower);
  }
}


//Вызов создания цветка
function addFlowers(num){
    for(let i=0;i<num;i++){
      let random=flower_choose(i);
      flower_create(random%3,random,color[parseInt(parseInt(random)-parseInt(random)%3)/3],text_check("Тест на тип личности"),random%7,1);
    }
  }

//Вызов функций
document.addEventListener('DOMContentLoaded', addFlowers(number))
document.addEventListener('DOMContentLoaded', change_deadline("04.04.2024"))
document.addEventListener('DOMContentLoaded', change_end("02.04.2024"))

//Настройки слайдера
let swiper = new Swiper(".map-main", {
    slidesPerView: 1,
    spaceBetween: 0,

    pagination: {
      el: ".map-pagination",
      type: "fraction",
    },

    navigation:{
      nextEl: ".right",
      prevEl: ".left",
    },

    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      512: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 5,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 6,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 7,
        spaceBetween: 0,
      },
    },
  });