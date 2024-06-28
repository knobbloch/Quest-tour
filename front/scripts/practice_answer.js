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
        return data;
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
          window.location.href = 'http://127.0.0.1:8000/map';
      }
  }
  next_btn.addEventListener('click', () => {
      next();
  });


async function getPractice() {
  const URL = `${window.location.origin}/script/get_practice?p_id=${id}&index=${index}`;
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

async function getAnswer() {
  const URL = `${window.location.origin}/script/get_answer_file_self?p_id=${id}`;
  axios({
      method: 'get',
      url: URL,
      responseType: 'blob',
      headers: {
        Accept: 'application/json'
      }
    }).then(function(response) {
      const data = response.data;
      const reader = new FileReader();
      if (data.type == "text/plain"){
          reader.onload = function() {
              const text = reader.result;
              const textAnswer = document.querySelector('.user_answer');
              textAnswer.innerHTML = text;
            };
            
          reader.readAsText(data);
      }
      else{
          reader.onloadend = function() {
              const textAnswer = document.querySelector('.user_answer');
              textAnswer.innerHTML = "Ответ дан файлом.";
              const imageDataUrl = reader.result;
              const fileBox = document.querySelector(".file");
              const imgFile = document.createElement("img");
              imgFile.src = "svg/file_img.svg";
              fileBox.appendChild(imgFile);
              const lableFile = document.createElement("a");
              lableFile.download = true;
              lableFile.className = "file-label";
              lableFile.innerHTML = "файл ответа";
              lableFile.href = imageDataUrl;
              fileBox.appendChild(lableFile);
          }  
          reader.readAsDataURL(response.data);
      }   
    }).catch(function(error) {
      console.log(error);
      return 0;
    });
}

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
    const practice = await getPractice();
    const titlePract = document.querySelector('.title');
    const textPract = document.querySelector('.task');
    titlePract.innerHTML = practice.title;
    textPract.innerHTML = practice.description;
    const userAnswer = document.querySelector('.user_answer');
    const result = await getPracticeResult();
    getAnswer();
    const textarea = document.querySelector('.comment-user__text');
    const adminBorder = document.querySelector('.comment-user');
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
    
    // let score = result.result;
    let score = null;
    // var disableButton = true; //change this value to false and the button will be clickable
    const button = document.querySelector(".button_red");
    button.disabled = true;
    
    if (score >= 60){
        userAnswer.style.border = "2px solid #369381"
        textarea.innerHTML = result.comment;
    }
    else if (score == null){
        userAnswer.style.border = "2px solid black";
        textarea.innerHTML = "Задание на проверке";
        button.disabled = true;
    }
    else{
        textarea.innerHTML = result.comment;
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
    window.location.href = 'http://127.0.0.1:8000/map'; // Замените 'URL' на нужный URL-адрес для перехода
});
