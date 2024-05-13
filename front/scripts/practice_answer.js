const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const index = parseInt(urlParams.get('index'));
async function getPracticeResult() {
    const URL = `${window.location.origin}/script/get_practice_result?p_id=${id}&index=${index}`;
    try {
      const response = await axios.get(URL);
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
  async function getPracticeResult() {
    const URL = `${window.location.origin}/script/get_practice_result?p_id=${id}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data.result;
    } catch (error) {
        console.log(error);
    }
}

async function getPractice2(id2) {
  const URL = `${window.location.origin}/script/get_practice?p_id=${id2}`;
  try {
      const response = await axios.get(URL);
      const data = response.data;
      return data.testornot;
  } catch (error) {
      console.log(error);
  }
}

async function getPracticeResult2(id2) {
  const URL = `${window.location.origin}/script/get_practice_result?p_id=${id2}`;
  try {
      const response = await axios.get(URL);
      const data = response.data;
      return data.result;
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


  async function open_flower(ref_type,ref_id,i){
    if (ref_type == 0) {
      window.location.href = "http://127.0.0.1:8000/lecture.html?id="+ref_id + "&index="+ i
    }else{
      //const res = await getPracticeResult()
      if(!await getPractice2(ref_id)){
        window.location.href = "http://127.0.0.1:8000/practice.html?id="+ref_id + "&index="+ i
      }
      else{
      if(await getPracticeResult2(ref_id) == null){
        window.location.href = "http://127.0.0.1:8000/test.html?id="+ref_id + "&index="+ i
      }else{
        window.location.href = "http://127.0.0.1:8000/test_result.html?id="+ref_id + "&index="+ i
      } 
      }
    }
  }


const next_btn = document.getElementById('next-btn');
async function next() {
    const flowers = await getFlowers();
    if (index != flowers.length - 1) {
        let next_index = index + 1;       
        open_flower(flowers[next_index].type, flowers[next_index].entity_id, next_index);
    }
    else {
        window.location.href = 'http://127.0.0.1:8000/map.html';
    }
}
next_btn.addEventListener('click', () => {
    next();
});

// // var adminBorder = document.getElementById('admin-border');
// // Рост texstarea при добавлении текста

// document.addEventListener("DOMContentLoaded", function() {
//     var adminBorder = document.getElementById('admin-border');
  
//    var textArea = document.getElementById('admin-comm');
//     // let rect = textArea.getBoundingClientRect();
//    adminBorder.style.height = textArea.scrollHeight/20 + "rem" ;
//    textArea.style.height = textArea.scrollHeight/20 + "rem";
//    console.log(textArea.scrollHeight);
// })
function adjustHeight(textarea, flag) {
        textarea.style.height = 'auto';
        if (flag){
            textarea.style.height = textarea.scrollHeight + 5 + 'px'; //заменить скролл надо как-нибудь
        }
        else{
            textarea.style.height = textarea.scrollHeight + 'px';
        }
        // console.log(textarea.scrollHeight);
    }

document.addEventListener('DOMContentLoaded', async function() {
    const result = await getPracticeResult();

    const adminBorder = document.querySelector('.comment-user');
    const textarea = document.querySelector('.comment-user__text');
    textarea.innerHTML = result.comment;
    adjustHeight(textarea, 0);
    adjustHeight(adminBorder, 1);
    window.onload = function() {
        adjustHeight(textarea, 0);
        adjustHeight(adminBorder, 1);
    };
    window.onresize = function() {
        adjustHeight(textarea, 0);
        adjustHeight(adminBorder, 1);
    };
    const score = result.result;
    // const score = 5;
    // console.log(score);
    const userAnswer = document.querySelector(".user_answer");
    // var disableButton = true; //change this value to false and the button will be clickable
    const button = document.querySelector(".send");
    button.disabled = true;
    if (score >= 60){
        userAnswer.style.border = "2px solid #369381"
    }
    else{
        button.disabled = false;
        userAnswer.style.border = "2px solid #FF4346"
        var userInput = document.createElement('answer-input');
        // userInput.innerHTML = 'Новый блок div';
        var parentUserInput = document.querySelector('.container');
        var beforeElement = document.querySelector('.send'); // найдите элемент, перед которым хотите вставить новый блок div
        parentUserInput.insertBefore(userInput, beforeElement);

    }
    // document.querySelector('.comment-user').style.height = document.querySelector('.comment-user__text').scrollHeight + 'px';
});

const backButton = document.getElementById('back_to_map');
backButton.addEventListener('click', () => {
    // Переходим по URL-адресу
    window.location.href = 'http://127.0.0.1:8000/map.html'; // Замените 'URL' на нужный URL-адрес для перехода
});