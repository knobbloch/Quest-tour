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
    console.log(lecture.pathto);
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

function edit(){
  window.location.href = 'http://127.0.0.1:8000/edit_lecture?id=' + id;
}

const backButton = document.getElementById('back');
backButton.addEventListener('click', () => {
    // Переходим по URL-адресу
    window.location.href = 'http://127.0.0.1:8000/task_list'; // Замените 'URL' на нужный URL-адрес для перехода
});