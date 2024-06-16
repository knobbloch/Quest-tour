    // Функция считывает клики по экрану, если в этот момент запущено видео, то она останавливает его
    // document.addEventListener('click', function(event) {
    //     const videos = document.querySelectorAll('video');
    //     videos.forEach(function(video) {
    //         if (event.target !== video) {
    //             video.pause();
    //         }
    //     });
    // });
  
  
    // Функция считывает изменение в буфере поля загрузки видео, проходится по каждой ссылке и добавляет эти видеоролики в место выгрузки соответственно
  
    const videoPlayer = document.getElementById('videoPlayer'); // Переменная с местом для выгрузки видео

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
      for(let i=0;i<this.files.length;i++){
        const videoElement = document.createElement('div');
        videoElement.className="video__box";
    
        const file = this.files[i];
        const url = URL.createObjectURL(file);
  
        videoElement.innerHTML = '<video controls><source src="'+url+'"></video><div class="button-delete" onclick="deleteVideo(event)"></div>';
        videoPlayer.appendChild(videoElement);
      }
    }
  
  
    // Кнопка удаления видео
    async function deleteVideo(event) {
      event.stopPropagation(); // Предотвращаем всплытие события
  
      var element = event.currentTarget; // Получаем текущий элемент, на котором произошло событие
      var videoElement = element.closest('.video__box');
      videoElement.parentNode.removeChild(videoElement);
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
            <textarea class="text-input__textarea"  placeholder="" style="border-radius: 0rem;" id="textareaYoutube"></textarea>
            <p class="text-input__label">Вставить ссылку на ютуб</p>
        </label>`;

      document.querySelector('.video-input__video-file').style = "background-image: url('components/svg/video-file-white.svg'); pointer-events: all;     cursor: pointer;";
      document.querySelector('.video-input__youtube').style = "background-image: url('components/svg/youtube-black.svg');   pointer-events: none;     cursor: default;";

    }

    function changeToFile(){
      document.querySelector('.video-input').innerHTML=`        
        <p class="video-input__label">Вставить видеофайл</p>
        <div class="video-input__video-file" onclick="changeToFile()"></div>
        <div class="video-input__youtube" onclick="changeToYoutube()"></div>
        <label class="video-input__field">
            <input type="file" id="add_video" accept="video/*" multiple>
        </label>`;

      document.querySelector('.video-input__video-file').style = "background-image: url('components/svg/video-file-black.svg');   pointer-events: none;     cursor: default;";
      document.querySelector('.video-input__youtube').style = "background-image: url('components/svg/youtube-white.svg');";

      restart();
    }

    function addYoutubeVideo(link){
      const videoElement = document.createElement('div');
      videoElement.className="video__box";
      videoElement.innerHTML = `
        <iframe width="1280" height="720" src="https://www.youtube.com/embed/${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
        </iframe>
        <div class="button-delete" onclick="deleteVideo(event)"></div>`;

      videoPlayer.appendChild(videoElement);
    }

    function upload(){
      addYoutubeVideo(document.getElementById('textareaYoutube').value.slice(17));
      document.getElementById('textareaYoutube').value='';
    }

    restart();