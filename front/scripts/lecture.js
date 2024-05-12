const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const index = parseInt(urlParams.get('index'));
console.log(id, index);
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
    const URL = `${window.location.origin}/script/get_lecture_file?l_id=${id}&index=${index}`;
    try {
      const response = await axios.get(URL, {
        responseType: 'arraybuffer'
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
    if (lecture.pathto.length == "youtube"){
      // document.querySelector('.video').appendChild('<iframe class="iframe" src="svg/Запись 2024-04-24 212245.mp4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
      
      // videoLect.setAttribute("src", "https://www.youtube.com/embed/" + lecture.pathto.slice(17, lecture.pathto.length - 16));
    // videoLect.setAttribute("src", lecture.pathto);https://www.youtube.com/watch?v=7HDeem-JaSY
      console.log(videoLect.getAttribute("src"));
    }
    else{
      const videoData = await getFileLecture();
      // Преобразование ArrayBuffer в Blob
      const blob = new Blob([videoData], { type: 'video/mp4' });

      // Создание URL-адреса из Blob
      const videoUrl = URL.createObjectURL(blob);

      // Использование URL-адреса изображения, например, для отображения в <img>
      const video = document.createElement('video');
      video.innerHTML = '<source class="video_lecture">';
      console.log();
      // document.querySelector('.video_lecture').src = videoUrl;
      video.innerHTML.src = videoUrl;
      document.querySelector('.video').appendChild(video);
      console.log(video);
    }
    
    
});