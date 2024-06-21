
let color = ["#FF0000","#AB2F90","#742FAB","#392FAB","#FF7800","#E1004C","#EBA43A"]

let map = document.querySelector('.swiper-wrapper')

  //Забираем инфу с сервера
  async function getPracticeResult(id) {
    const URL = `${window.location.origin}/script/get_practice_result?p_id=${id}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data.result;
    } catch (error) {
        console.log(error);
    }
  }

  async function getPractice(id2) {
    const URL = `${window.location.origin}/script/get_practice?p_id=${id2}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data.testornot;
    } catch (error) {
        console.log(error);
    }
  }

  async function getFlowers() {
    const URL = `${window.location.origin}/script/get_flowers`;
    try {
      const response = await axios.get(URL);
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getDeadline() {
    const URL = `${window.location.origin}/script/deadline_self`;
    try {
      const response = await axios.get(URL);
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }


//Меняет дату дедлайна
async function change_deadline(){
  const date = await getDeadline()
  document.getElementById('deadline').innerHTML = "Нужно выполнить все задания до " + date.deadline+" !"

  if (date.complete == null ) {
    document.getElementById('end').innerHTML = "Квест ещё не завешен"
  }else{
    document.getElementById('end').innerHTML = "Квест завешен "+ date.complete
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
function flower_create(type, bud, text_color,text, stem, open,ref_type,ref_id,i) { // создает цветок
  if (open) { // если открытый
    const flower = document.createElement('div'); // создаем элемент div
    flower.className = "swiper-slide"; // добавляем класс

    flower.innerHTML = '<div class="map__box">' + // добавляем вinnerHTML
      '<div class="flower fl_op' + type + '" ' + // добавляем класс fl_op
      'style="background-image: url(svg/Flowers/Open/' + bud + '.svg);" onclick="open_flower('+ref_type+',' + ref_id + ',' + i +')" >' + // и картинку
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
      'style="background-image: url(svg/Flowers/Closed/' + bud + '.svg);" onclick="open_flower('+ref_type+',' + ref_id + ',' + i +')" >' +
      '<div class="task" style="color: ' + text_color + ';">' +
      text +
      '</div></div>' +
      '<div class="stem st_lt'+stem+'" style="background-image: url(svg/Flowers/Stems_little/' + stem + '.svg);"></div>' +
      '</div>';
    map.appendChild(flower);
  }
}

//Удаляет кнопки навигации если цветков меньше 7

function delete_nuvigation(num){
  if(num<8){
    document.querySelector('.left').remove()
    document.querySelector('.right').remove()
  }
}

//Вызов создания цветка
async function addFlowers(){
  const Flowers = await getFlowers()
    delete_nuvigation(Flowers.length)
    for(let i=0;i<Flowers.length;i++){
      let random=flower_choose(i);
      flower_create(random%3,random,color[parseInt(parseInt(random)-parseInt(random)%3)/3],text_check(Flowers[i].title),random%7,Flowers[i].flower_stage,Flowers[i].type,Flowers[i].entity_id,i);
    }
  }

  async function open_flower(ref_type,ref_id,i){
    if (ref_type == 0) {
      window.location.href = "http://127.0.0.1:8000/lecture?id="+ref_id + "&index="+ i
    }else{
      if(!await getPractice(ref_id)){
        window.location.href = "http://127.0.0.1:8000/practice?id="+ref_id + "&index="+ i
      }
      else{
        if(await getPracticeResult(ref_id) == null){
          window.location.href = "http://127.0.0.1:8000/test?id="+ref_id + "&index="+ i
        }else{
          window.location.href = "http://127.0.0.1:8000/test_result?id="+ref_id + "&index="+ i
        } 
      }
    }
  }
  
//Вызов функций
document.addEventListener('DOMContentLoaded', addFlowers())
document.addEventListener('DOMContentLoaded', change_deadline())

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

  