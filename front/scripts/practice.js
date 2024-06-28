inputFile = '';
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
    window.location.href = "http://127.0.0.1:8000/lecture?id="+ref_id + "&index="+ i
  }else{
    //const res = await getPracticeResult()
    if(!await getPractice2(ref_id)){
      window.location.href = "http://127.0.0.1:8000/practice?id="+ref_id + "&index="+ i
    }
    else{
    if(await getPracticeResult2(ref_id) == null){
      window.location.href = "http://127.0.0.1:8000/test?id="+ref_id + "&index="+ i
    }else{
      window.location.href = "http://127.0.0.1:8000/test_result?id="+ref_id + "&index="+ i
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

document.addEventListener('DOMContentLoaded', async function() {
    const practice = await getPractice();
    const titlePract = document.querySelector('.title');
    const textPract = document.querySelector('.task');
    titlePract.innerHTML = practice.title;
    textPract.innerHTML = practice.description;
})

async function sendUserAnswer(user_answer){
  const URL = `${window.location.origin}/script/add_answer`;
  axios({
    method: 'post',
    url: URL,
    data: {p_id: id, text: user_answer},
  })
  .then(response => {
    console.log(response.data)
    // if(response.data['status']!=201){ ??????????????????????????????????????????
    //   document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
    // }
    //   document.getElementById("exit-modal-ok").classList.add("open")
    })
    .catch(error => {
      console.log(error)
    })
}

async function sendUserAnswerFile(){
  const URL = `${window.location.origin}/script/add_answer_file?p_id=${id}`;
  const formData = new FormData();
  formData.append('file', inputFile);
  try {
    const response = await axios.post(URL, formData);
    console.log(response.data);
    // if (response.data['status'] != 201) {
    //   document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
    // }
    //   document.getElementById("exit-modal-ok").classList.add("open");
    } catch (error) {
      console.log(error);
    }
}

function sendAnswer(){
  let answer = document.getElementById('text_box').value;
  if (length > 0){
    sendUserAnswerFile();
  }
  else{
    sendUserAnswer(answer);
  }
  document.getElementById('text_box').value = '';
  // const filePlayer = document.getElementById('filePlayer'); 
  // var k = 0;
  // var costil = 0;
  // console.log(filePlayer.childNodes.length);
  // if (filePlayer.childNodes.length > 1){
  //   costil = 6;
  //   while (filePlayer.firstChild){
  //     filePlayer.removeChild(filePlayer.firstChild);
  //     k += 6;
  //   }
  //   let rect = ansInput.getBoundingClientRect();
  //   ansInput.style.height = rect.height/20 - k + costil + "rem" ;
  // }
  const button = document.querySelector(".send");
  button.disabled = true;
  // console.log(button.disabled);
  window.location.href = 'http://127.0.0.1:8000/practice_answer?id=' + id;
}

const backButton = document.getElementById('back_to_map');
backButton.addEventListener('click', () => {
    // Переходим по URL-адресу
    window.location.href = 'http://127.0.0.1:8000/map'; // Замените 'URL' на нужный URL-адрес для перехода
});

function back(){
  window.location.href = 'http://127.0.0.1:8000/practice?id='+ id + "&index=" + index;
}