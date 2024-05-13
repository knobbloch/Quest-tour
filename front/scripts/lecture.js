const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const index = parseInt(urlParams.get('index'));
console.log(id);
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


  async function open_flower(ref_type,ref_id,i,testornot){
    if (ref_type == 0) {
      window.location.href = "http://127.0.0.1:8000/lecture.html?id="+ref_id + "&index="+ i
    }else{
      //const res = await getPracticeResult()
      if(!testornot){
        window.location.href = "http://127.0.0.1:8000/practice.html?id="+ref_id + "&index="+ i
      }
      else{
        if(await getPracticeResult(ref_id) == null){
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
    // console.log(lecture.pathto);
    // if (lecture.pathto.length == "youtube"){
      // document.querySelector('.video').appendChild('<iframe class="iframe" src="svg/Запись 2024-04-24 212245.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
      
    videoLect.setAttribute("src", "https://www.youtube.com/embed/" + lecture.pathto.slice(17, lecture.pathto.length - 16));
    // videoLect.setAttribute("src", lecture.pathto);
      // console.log(videoLect.getAttribute("src"));
    // }
    // else{
      // const videoData = await getFileLecture();
      // const fileString = new TextDecoder().decode(videoData);

      // Преобразование строки в объект JSON
      // const fileJson = JSON.parse(fileString);

      // Использование объекта JSON
      // console.log(videoData[0].path);
      // console.log(videoData.path);
      // // Преобразование ArrayBuffer в Blob
      // const blob = new Blob([videoData[0]], { type: 'video/mp4' });

      // // Создание URL-адреса из Blob
      // const videoUrl = URL.createObjectURL(blob);
      // console.log(videoUrl);
      // // Использование URL-адреса изображения, например, для отображения в <img>
      // const video = document.createElement('video');
      // // video.innerHTML = '<source class="video_lecture">';
      // document.querySelector('.video').appendChild(video);
      // // document.querySelector('.video_lecture').src = videoUrl;
      // video.src = "../" + videoData[0].path;
      // console.log(video);
      // console.log(video.src);
      
      // console.log(video);
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