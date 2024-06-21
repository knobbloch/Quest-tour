    // Функция считывает изменение в буфере поля загрузки видео, проходится по каждой ссылке и добавляет эти видеоролики в место выгрузки соответственно
  
    const videoPlayer = document.getElementById('videoPlayer'); // Переменная с местом для выгрузки видео
    
    let error = document.querySelector(".title-error");

    // async function getLecture() {
    //     const URL = `${window.location.origin}/script/get_lecture?l_id=${id}&index=${index}`;
    //     try {
    //         const response = await axios.get(URL);
    //         const data = response.data;
    //         console.log(data);
    //         return data;
    //      } catch (error) {
    //         console.log(error);
    //         return 0;
    //      }
    // }
    
    // async function getFileLecture() {
    //     const URL = `${window.location.origin}/script/get_lecture_file?l_id=${id}`;
    //     try {
    //       const response = await axios.get(URL, {
    //         responseType: 'json'
    //       });
    //       const fileData = response.data; // Данные файла в виде ArrayBuffer
    //       console.log(fileData);
    //       return fileData;
    //     } catch (error) {
    //       console.log(error);
    //       return 0;
    //     }
    //   }
      
    function destroy_gap(str){
      let i = 0;
      while(str[i] === " " && i < str.length){
        i++;
      }
      return str.slice(i);
    }

    function youtube_slise(link){
      let videoId = link.split('v=')[1];
      let ampersandPosition = videoId.indexOf('&');
      if(ampersandPosition !== -1){
        videoId = videoId.substring(0, ampersandPosition);
      }
      let replacedLink = `https://www.youtube.com/embed/${videoId}`;
      return replacedLink;
    }

    function youtube_check(obj) {
      obj.value = destroy_gap(obj.value);
      let label = document.getElementById("labelYoutube");
      const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/)?(?:watch\?)?(v=?)([^&?]{11})/;
      if (regex.test(obj.value)){
        obj.classList.remove("error");
        label.classList.remove("error");
        return true;
      }else{
        obj.classList.remove("error");
        label.classList.remove("error_label");

        void obj.offsetWidth;
        void label.offsetWidth;

        obj.classList.add("error");
        label.classList.add("error_label");
        return false;
      }
    }

    function restart(){
      let videoInput = document.getElementById('add_video'); // Переменная с полем для загрузки видео
      let dropVideo = document.getElementsByClassName('video-input__field');

      videoInput.addEventListener('change', addVideo);

      if(dropVideo){
        const dropField = dropVideo[0]
    
        dropField.addEventListener('dragover', highLightDropZone)
        dropField.addEventListener('dragenter', highLightDropZone)
        dropField.addEventListener('dragleave', unhighLightDropZone)
        dropField.addEventListener('drop', (event) =>{
          const dt = event.dataTransfer
          unhighLightDropZone.call(dropField,event)
          addVideo.call(dt)
        })
      }
    }
  
    function addVideo(){
      const videoElement = document.createElement('div');
      videoElement.className="video__box";
      videoElement.id="file";

      const file = this.files[0];
      const url = URL.createObjectURL(file);

      added_file = file;

      videoElement.innerHTML = '<video controls><source src="'+url+'"></video><div class="button-delete" onclick="deleteVideo(event)"></div>';
      videoPlayer.appendChild(videoElement);

      document.querySelector('.video-input').innerHTML='';
      document.querySelector('.video-input').classList.add('destroyed');
    }
  
  
    // Кнопка удаления видео
    function deleteVideo(event) {
      event.stopPropagation(); // Предотвращаем всплытие события
  
      var element = event.currentTarget; // Получаем текущий элемент, на котором произошло событие
      var videoElement = element.closest('.video__box');
      var type = videoElement.closest('div').id;
      videoElement.parentNode.removeChild(videoElement);

      added_file = '';
      added_link = '';

      document.querySelector('.video-input').classList.remove('destroyed');
      console.log(type);
      if(type === 'file'){
        changeToFile();
      }else{
        changeToYoutube();
      }
    }
  
    // ДрагнДроп видео
  
    function highLightDropZone(event){
      event.preventDefault();
      this.classList.add('drop')
    }
  
    function unhighLightDropZone(event){
      event.preventDefault();
      this.classList.remove('drop')
    }

    // Функции боковых кнопок

    function changeToYoutube(){

      document.querySelector('.video-input').innerHTML=`
        <div class="video-input__video-file" onclick="changeToFile()"></div>
        <div class="video-input__youtube" onclick="changeToYoutube()"></div>
        <div class="video-input__upload" onclick="upload()"></div>        
        <label class="text-input__area">
            <textarea class="text-input__textarea"  placeholder="" id="textareaYoutube"></textarea>
            <p class="text-input__label" id="labelYoutube">Вставить ссылку на ютуб</p>
        </label>`;

      document.querySelector('.video-input__video-file').style = "background-image: url('components/svg/video-file-white.svg'); pointer-events: all;     cursor: pointer;";
      document.querySelector('.video-input__youtube').style = "background-image: url('components/svg/youtube-black.svg');   pointer-events: none;     cursor: default;";

    }

    function changeToFile(){
      error.textContent="";

      document.querySelector('.video-input').innerHTML=`        
        <p class="video-input__label">Вставить видеофайл</p>
        <div class="video-input__video-file" onclick="changeToFile()"></div>
        <div class="video-input__youtube" onclick="changeToYoutube()"></div>
        <label class="video-input__field">
            <input type="file" id="add_video" accept="video/*">
        </label>`;

      document.querySelector('.video-input__video-file').style = "background-image: url('components/svg/video-file-black.svg');   pointer-events: none;     cursor: default;";
      document.querySelector('.video-input__youtube').style = "background-image: url('components/svg/youtube-white.svg');";

      restart();
    }

    function addYoutubeVideo(link){
      const videoElement = document.createElement('div');
      added_link = link;
      videoElement.className="video__box";
      videoElement.innerHTML = `
        <iframe width="1280" height="720" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
        <div class="button-delete" onclick="deleteVideo(event)"></div>`;

      videoPlayer.appendChild(videoElement);

      document.querySelector('.video-input').innerHTML='';
      document.querySelector('.video-input').classList.add('destroyed');
    }

    function upload(){
      if(youtube_check(document.getElementById('textareaYoutube'))){
        error.textContent="";
        addYoutubeVideo(youtube_slise(document.getElementById('textareaYoutube').value));
        document.getElementById('textareaYoutube').value='';
        document.querySelector('.video-input').innerHTML='';
        document.querySelector('.video-input').classList.add('destroyed');
      }else{
        error.textContent="Пожалуйста, вставьте рабочую ссылку на ютуб видео!";
      }
    }

    restart();