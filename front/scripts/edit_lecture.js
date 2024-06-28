    // Глобальная переменная для считывания видео
    added_file = '';
    added_link = '';

    // Переменные для считывания информации со страницы
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    const index = parseInt(urlParams.get('index'));

    let orderc = urlParams.get('order'),
    title = document.getElementById("title"),
    description = document.getElementById("description");
    
    // Функция перехода

    function back(){
        window.location.href = 'http://127.0.0.1:8000/admin_lecture?id=' + id;
    }
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
      try {
        const URL = `${window.location.origin}/script/get_lecture_file?l_id=${id}`;
        const response = await axios.get(URL, {
          responseType: 'blob',
          headers: {
            'Content-Type': 'video/mp4'
          }
        });
        const fileData = response.data;
        console.log(fileData);
        return fileData;
      } catch (error) {
        console.error('Ошибка:', error);
        // Обработка ошибки
      }
    }

    let flag = 0;

    document.addEventListener('DOMContentLoaded', async function() {
      const textLect = document.querySelector('.text-input__textarea');
      const lecture = await getLecture();
      const titleLect = document.querySelector('.title');
      titleLect.innerHTML = lecture.title;
      textLect.innerHTML = lecture.description;
      if ((lecture.pathto != null)&&(lecture.pathto != "string")&&(lecture.pathto != "")){ //?????
        addYoutubeVideo(lecture.pathto);
      }
      else{
        const videoElement = document.createElement('div');
        videoElement.className="video__box";
        videoElement.id="file";

        const videoData = await getFileLecture();
        const videoPath = URL.createObjectURL(videoData);
        added_file = videoData;
        
        videoElement.innerHTML = '<video controls><source src="'+videoPath+'"></video><div class="button-delete" onclick="deleteVideo(event)"></div>';
        videoPlayer.appendChild(videoElement);

        document.querySelector('.video-input').innerHTML='';
        document.querySelector('.video-input').classList.add('destroyed');
      }
    });
  
    async function edit_lecture_youtube(title, description) {  
      const URL = `${window.location.origin}/script/edit_lecture?l_id=${id}`;
      axios({
        method: 'put',
        url: URL,
        data: {title: title,description: description, pathto:added_link},
      })
      .then(response => {
        console.log(response.data)
        if(response.data['status']!=202){
          document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
        }
        document.getElementById("exit-modal-ok").classList.add("open")
      })
      .catch(error => {
        console.log(error)
      })
    }

    async function edit_lecture_file(title1, description1) {  
      const URL = `${window.location.origin}/script/edit_lecture_file?l_id=${id}`;
      const formData = new FormData();
      const data = {
        title: title1,
        description: description1,
        pathto: "string"
      };
      formData.append('new_data', JSON.stringify(data));
      console.log(added_file);
      formData.append('file', added_file);
      axios.put(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Файл и словарь успешно отправлены');
        console.log(response.data);
        if (response.data['status'] != 202) {
          document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
        }
        document.getElementById("exit-modal-ok").classList.add("open");
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
    }

    function edit_lecture(){
        if (added_link != ""){
          edit_lecture_youtube(title.value, description.value);
        }
        else{
          if (flag == 0){
            // Создание объекта File с типом MP4
            const fileName = 'video.mp4';
            const fileOptions = {
              type: 'video/mp4',
              lastModified: Date.now() // метка времени последнего изменения файла
            };
            const file = new File([added_file], fileName, fileOptions);
            added_file = file;
          }
          edit_lecture_file(title.value, description.value);
          console.log("file");
        }
    }
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const id = urlParams.get('id');
// const index = parseInt(urlParams.get('index'));


// function adjustHeight(textarea) {
//     textarea.style.height = 'auto';
//     textarea.style.height = textarea.scrollHeight + 'px';
// }


// const titleLect = document.querySelector('.title');
// const textLect = document.querySelector('.lecture');
// document.addEventListener('DOMContentLoaded', async function() {
//     adjustHeight(textLect);
//     window.onload = function() {
//         adjustHeight(textLect);
//     };
//     window.onresize = function() {
//         adjustHeight(textLect);
//     };
  
//     const lecture = await getLecture();
//     const videoLect = document.querySelector('.video');
//     titleLect.innerHTML = lecture.title;
//     textLect.innerHTML = lecture.description;
//     if (lecture.pathto != "string"){
//       const videoLect = document.querySelector('.video');
//       videoLect.innerHTML='<iframe class="iframe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
//       const videoYT = document.querySelector(".iframe");
//       videoYT.setAttribute("src", lecture.pathto);
//     }
//     else{
//       const videoData = await getFileLecture();
//       const videoPath = "../" + videoData[0].path;
//       var videoFile = document.createElement('video');
//       videoFile.controls = true;
//       videoFile.setAttribute("src", videoPath);
//       videoLect.appendChild(videoFile);
//     }
// })


// // async function sendLecture(lectContent){
// //     const URL = `${window.location.origin}/script/edit_lecture?l_id=${id}`; 
// //     const data = {title: lectContent[0], description: lectContent[1]};
// //     console.log(data)
// //     const config = {
// //         headers: {'Content-Type': 'application/json'}
// //     }
// //     const response = await axios.put(URL, data, config)
// //     .then(response => {
// //         console.log('Редактирование лекции: ', response.data)
// //         if(response.data['status']!=202){
// //             document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
// //           }
// //         document.getElementById("exit-modal-ok").classList.add("open")
// //     })
// //     .catch(error => {
// //         console.error('Ошибка при отправке', error)})
// //         return response
// // }

// // function editLecture(){
// //     sendLecture([titleLect.value, textLect.value]);
// // }


// function back() {
//     window.location.href = 'http://127.0.0.1:8000/admin_lecture?id=' + id;
// }