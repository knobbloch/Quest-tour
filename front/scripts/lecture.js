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
      const fileData = response.data; // Данные файла в виде ArrayBuffer
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
    const textarea = document.querySelector('.lecture');
    adjustHeight(textarea);
    window.onload = function() {
        adjustHeight(textarea);
    };
    window.onresize = function() {
        adjustHeight(textarea);
    };

    const lecture = await getLecture();
    const titleLect = document.querySelector('.title');
    const textLect = document.querySelector('.lecture');
    const videoLect = document.querySelector('.iframe');
    titleLect.innerHTML = lecture.title;
    textLect.innerHTML = lecture.description;
    console.log(lecture.pathto);
    // if (lecture.pathto != "string"){
    //   document.querySelector('.video').appendChild('<iframe class="iframe" src="svg/Запись 2024-04-24 212245.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
      
    videoLect.setAttribute("src", "https://www.youtube.com/embed/" + lecture.pathto.slice(17, lecture.pathto.length - 16));
    // videoLect.setAttribute("src", lecture.pathto);
      // console.log(videoLect.getAttribute("src"));
    // }
    // else{
    //   const videoData = await getFileLecture();

      
      
    //   // video.innerHTML = '<source class="video_lecture">';
      
    //   // document.querySelector('.video_lecture').src = videoUrl;
    //   const videoPath = "../" + videoData[0].path;
    //   // Создание URL из строки пути
    //   const videoUrl = URL.createObjectURL(new Blob([videoPath], { type: 'application/octet-stream' }));

    //   // Использование URL для вставки видео на страницу
    //   const videoElement = document.createElement('video');
      
    //   videoElement.src = videoUrl;
    //   videoElement.controls = true;
    //   document.querySelector('.video').appendChild(videoElement);
    //   // console.log(typeof videoData[0].path);
    // }
const lectureResult = [id, 1]
  
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
  return response
  }
sendLectureToServer(lectureResult);  
});

const backButton = document.getElementById('back_to_map');
backButton.addEventListener('click', () => {
    // Переходим по URL-адресу
    window.location.href = 'http://127.0.0.1:8000/map.html'; // Замените 'URL' на нужный URL-адрес для перехода
});