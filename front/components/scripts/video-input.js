    // Функция считывает клики по экрану, если в этот момент запущено видео, то она останавливает его
    document.addEventListener('click', function(event) {
        const videos = document.querySelectorAll('video');
        videos.forEach(function(video) {
            if (!video.contains(event.target)) {
                video.pause();
            }
        });
    });
  
  
    // Функция считывает изменение в буфере поля загрузки видео, проходится по каждой ссылке и добавляет эти видеоролики в место выгрузки соответственно
  
    const videoInput = document.getElementById('add_video'); // Переменная с полем для загрузки видео
    const videoPlayer = document.getElementById('videoPlayer'); // Переменная с местом для выгрузки видео
  
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
  
    videoInput.addEventListener('change', addVideo);
  
    // Кнопка удаления видео
    async function deleteVideo(event) {
      event.stopPropagation(); // Предотвращаем всплытие события
  
      var element = event.currentTarget; // Получаем текущий элемент, на котором произошло событие
      var videoElement = element.closest('.video__box');
      videoElement.parentNode.removeChild(videoElement);
    }
  
    // ДрагнДроп видео
  
    const dropVideo = document.getElementsByClassName('video-input__field')
  
    function highLightDropZone(event){
      event.preventDefault();
      this.classList.add('drop')
    }
  
    function unhighLightDropZone(event){
      event.preventDefault();
      this.classList.remove('drop')
    }
  
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