async function getPracticeResult() {
    const URL = `${window.location.origin}/script/get_practice_result?p_id=1`;
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

async function getPractice() {
    const URL = `${window.location.origin}/script/get_practice?p_id=1`;
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
  
  document.addEventListener('DOMContentLoaded', async function() {
      const practice = await getPractice();
      const titlePract = document.querySelector('.title');
      const textPract = document.querySelector('.task');
      titlePract.innerHTML = practice.title;
      textPract.innerHTML = practice.description;
  })
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
        console.log(textarea.scrollHeight);
    }

document.addEventListener('DOMContentLoaded', async function() {
    const result = await getPracticeResult();
    const practice = await getPractice();
    const titlePract = document.querySelector('.title');
    const textPract = document.querySelector('.task');
    titlePract.innerHTML = practice.title;
    textPract.innerHTML = practice.description;



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
    const userAnswer = document.querySelector(".user_answer");
    // var disableButton = true; //change this value to false and the button will be clickable
    const button = document.getElementById("submit1");
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