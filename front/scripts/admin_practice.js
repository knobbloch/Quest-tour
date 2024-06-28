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

document.addEventListener('DOMContentLoaded', async function() {
    const practice = await getPractice();
    const titlePract = document.querySelector('.title');
    const textPract = document.querySelector('.task');
    titlePract.innerHTML = practice.title;
    textPract.innerHTML = practice.description;
})


function back(){
    // Переходим по URL-адресу
    window.location.href = 'http://127.0.0.1:8000/task_list';
};

function answers(){
  window.location.href = 'http://127.0.0.1:8000/practice_answer_list?p_id=' + id;
}

function edit(){
  window.location.href = 'http://127.0.0.1:8000/edit_practice?id=' + id;
}
