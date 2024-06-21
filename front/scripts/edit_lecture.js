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

    document.addEventListener('DOMContentLoaded', async function() {
      const textLect = document.querySelector('.lecture');
      const lecture = await getLecture();
      const titleLect = document.querySelector('.title');
      titleLect.innerHTML = lecture.title;
      textLect.innerHTML = lecture.description;
      if (lecture.pathto != "string"){ //?????
        addYoutubeVideo(lecture.pathto);
      }
      
    });
  
    //   // Функция выгрузки лекции
    // async function send_lection_file(title, description, orderc) {  
    //     const URL = `${window.location.origin}/script/create_lecture_with_file`;
    //     const formData = new FormData();
    //     const data={title: title,description: description,orderc: orderc};
    //     formData.append('lecture', JSON.stringify(data));
    //     formData.append('file', added_file);

    //     try {
    //         const response = await axios.post(URL, formData);
    //         console.log(response.data);
    //         if (response.data['status'] != 201) {
    //             document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
    //         }
    //         document.getElementById("exit-modal-ok").classList.add("open");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async function send_lection_no_file(title,description,orderc){
    //     const URL = `${window.location.origin}/script/create_lecture`;
    //     axios({
    //       method: 'post',
    //       url: URL,
    //       data: {title: title,description: description,orderc: orderc,pathto:added_link},
    //     })
    //     .then(response => {
    //       console.log(response.data)
    //       if(response.data['status']!=201){
    //         document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
    //       }
    //       document.getElementById("exit-modal-ok").classList.add("open")
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }
      
  
      // Функция открытия попапа
  
    function create_lection(){
        if(added_file!=''){
            send_lection_file(title.value,description.value,orderc);
        }else{
          
          console.log(orderc);
            send_lection_no_file(title.value,description.value,orderc);
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