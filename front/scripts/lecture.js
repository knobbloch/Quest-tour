const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const index = parseInt(urlParams.get('index'));
async function getLecture() {
    const URL = `${window.location.origin}/script/get_lecture?l_id=${id}&index=${index}`;
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

  async function getFileLecture() {
    const URL = `${window.location.origin}/script/get_lecture_file?l_id=${id}`;
    try {
      const response = await axios.get(URL, {
        responseType: 'json'
      });
      const fileData = response.data; 
      console.log(fileData);
      return fileData;
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
        open_flower(flowers[next_index].type, flowers[next_index].entity_id, next_index, flowers[next_index].testornot);
    }
    else {
        window.location.href = 'http://127.0.0.1:8000/map.html';
    }
}
next_btn.addEventListener('click', () => {
    next();
});


function adjustHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', async function() {
    const textLect = document.querySelector('.lecture');
    adjustHeight(textLect);
    window.onload = function() {
        adjustHeight(textLect);
    };
    window.onresize = function() {
        adjustHeight(textLect);
    };

    const lecture = await getLecture();
    const titleLect = document.querySelector('.title');
    
    const videoLect = document.querySelector('.video');
    titleLect.innerHTML = lecture.title;
    textLect.innerHTML = lecture.description;
    if (lecture.pathto != "string"){
      const videoLect = document.querySelector('.video');
      videoLect.innerHTML='<iframe class="iframe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
      const videoYT = document.querySelector(".iframe");
      videoYT.setAttribute("src", lecture.pathto);
    }
    else{
      const videoData = await getFileLecture();
      const videoPath = "../" + videoData[0].path;
      var videoFile = document.createElement('video');
      videoFile.controls = true;
      videoFile.setAttribute("src", videoPath);
      videoLect.appendChild(videoFile);
    }
  });

async function sendLectureToServer(lectureResult) { 
  const URL = `${window.location.origin}/script/edit_lecture_result?l_id=${id}&viewed=true`;
  const data = JSON.stringify({sections: lectureResult})
  console.log(data)
  const config = {
      headers: {'Content-Type': 'application/json'}
  }
  const response = await axios.put(URL, data, config)
  .then(response => {
      console.log('Просмотр лекции: ', response.data)
  })
  .catch(error => {
      console.error('Ошибка при отправке', error)})
  return response;
};

const lectureResult = [id, 1]
sendLectureToServer(lectureResult);

const backButton = document.getElementById('back_to_map');
backButton.addEventListener('click', () => {
    // Переходим по URL-адресу
    window.location.href = 'http://127.0.0.1:8000/map.html'; // Замените 'URL' на нужный URL-адрес для перехода
});