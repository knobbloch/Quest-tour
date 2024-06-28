const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const p_id = urlParams.get('p_id');
const email = urlParams.get('target_email');
// const p_id = 4;
// const email = "user";
function back(){
    window.location.href = "http://127.0.0.1:8000/practice_answer_list?p_id=" + p_id;
}
async function getPractice() {
    const URL = `${window.location.origin}/script/get_practice?p_id=${p_id}`;
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
    const URL = `${window.location.origin}/script/get_answer_file?p_id=${p_id}&target_email=${email}`;
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
                const textAnswer = document.querySelector('.answer');
                textAnswer.innerHTML = text;
              };
              
            reader.readAsText(data);
        }
        else{
            reader.onloadend = function() {
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

  async function sendComment(practiceResult) { 
    const URL = `${window.location.origin}/script/edit_practice_result?p_id=${p_id}&target_email=${email}`;
    const data = JSON.stringify({sections: practiceResult})
    console.log(data)
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const response = await axios.put(URL, data, config)
    .then(response => {
        console.log('Результат практики: ', response.data)
        if (practiceResult.result == 0){
            document.getElementById("modal__box-text").textContent = "Практика отправлена на доработку!";
        }
        document.getElementById("exit-modal-ok").classList.add("open");
    })
    .catch(error => {
        console.error('Ошибка при отправке', error)})
    return response;
  };

document.addEventListener('DOMContentLoaded', async function() {
    const practice = await getPractice();
    const titlePract = document.querySelector('.title');
    const textPract = document.querySelector('.task');
    titlePract.innerHTML = practice.title;
    textPract.innerHTML = practice.description;
    const answer = await getAnswer();
})

function sendScore(){
    const comm = document.querySelector(".comment-admin__text");
    const practRes = {result: 100, comment: comm.value};
    sendComment(practRes);
}

function sendBadScore(){
    const comm = document.querySelector(".comment-admin__text");
    const practRes = {result: 0, comment: comm.value};
    sendComment(practRes);
}


