const ansInput = document.getElementById('input_ans');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const index = parseInt(urlParams.get('index'));

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

function adjustHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
const titlePract = document.querySelector('.title');
const textPract = document.querySelector('.task');
document.addEventListener('DOMContentLoaded', async function() {
    
    const practice = await getPractice();
    
    adjustHeight(textPract);
    window.onload = function() {
        adjustHeight(textPract);
    };
    window.onresize = function() {
        adjustHeight(textPract);
    };
    titlePract.innerHTML = practice.title;
    textPract.innerHTML = practice.description;
})

async function sendPractice(practContent){
    const URL = `${window.location.origin}/script/edit_practice?l_id=${id}`; 
    const data = {title: practContent[0], description: practContent[1]};
    console.log(data)
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const response = await axios.put(URL, data, config)
    .then(response => {
        console.log('Редактирование практики: ', response.data)
        if(response.data['status']!=202){
            document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
          }
        document.getElementById("exit-modal-ok").classList.add("open")
    })
    .catch(error => {
        console.error('Ошибка при отправке', error)})
        return response
}

function save(){
    console.log(titlePract.value, textPract.value);
    sendPractice([titlePract.value, textPract.value]);
}

function back(){
    window.location.href = 'http://127.0.0.1:8000/admin_practice?id=' + id;
};
