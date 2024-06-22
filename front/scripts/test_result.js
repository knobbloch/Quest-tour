// Получение параметров из URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const index = parseInt(urlParams.get('index'));
async function getPractice() {
    const URL = `${window.location.origin}/script/get_practice?p_id=${id}`;
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

async function renderPracticeName() {
    const practice = await getPractice();
    const practiceName = document.getElementById('practice-name');
    practiceName.textContent = practice.title;
}

renderPracticeName();

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

document.addEventListener("DOMContentLoaded", async function(){ 
    const result = await getPracticeResult();
    if (result == null) {
        window.location.href = `http://127.0.0.1:8000/test?id=${id}&index=${index}`
    }
    console.log('Результат теста:', result);
    setProgress(result);
});

async function setProgress(result) {
    
    let progress_text = document.getElementById("progress-text");

    console.log('Результат теста:', result);
        let end = result;
        if (end != 0 ){
            let number = document.getElementById("number");
            let percentProgress = document.querySelector(".circle");
            let speed = 1500/end;
            percentProgress.style.setProperty('--progress', 942 - (9.42 * end));
            let counter = 0;
            setInterval(()=>{
                if (counter == end){
                    clearInterval();
                    if (end >= 60) {

                        progress_text.style.display = 'block';
                        progress_text.style.color = '#369381';
                        progress_text.textContent = 'Все верно!';

                    } 
                    else {
                        progress_text.style.display = 'block';
                        progress_text.style.color = 'df0009';
                        progress_text.textContent = 'Попробуй еще раз :c';
                    } 
                }
                else{
                    counter ++;
                    if (counter==60){
                        percentProgress.style.setProperty('stroke', `#369381`);
                        number.style.setProperty('color', '#369381');
                    }
                    number.innerHTML = counter + "%";
                }
            }, speed);
        }
        else {
            number.innerHTML = "0%";
            let percentProgress = document.querySelector(".circle");
            percentProgress.style.setProperty('--progress', 942 - (9.42 * end));
            progress_text.style.display = 'block';
            console.log('kfkfkfk');
            progress_text.style.color = 'df0009';
            progress_text.textContent = 'Попробуй еще раз :c';
        }
}

const backButton = document.getElementById('back-to-map');
backButton.addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:8000/map';
});

const repeat_btn = document.getElementById('repeat-btn');
repeat_btn.addEventListener('click', () => {
    window.location.href = `http://127.0.0.1:8000/test?id=${id}&index=${index}`;
});


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