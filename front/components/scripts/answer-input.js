


// Рост texstarea при добавлении текста

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight) + "px";
}



// Кнопка удаления файла

async function deleteFile(event) {
  event.stopPropagation(); // Предотвращаем всплытие события

  var element = event.currentTarget; // Получаем текущий элемент, на котором произошло событие
  var fileElement = element.closest('.file__box');
  fileElement.parentNode.removeChild(fileElement);
}

// Функция считывает изменение в буфере поля загрузки файла, проходится по каждой ссылке и добавляет эти файлы в место выгрузки соответственн

const fileInput = document.getElementById('add_file'); // Переменная с полем для загрузки видео
const filePlayer = document.getElementById('filePlayer'); // Переменная с местом для выгрузки видео

function addFile(){
  for(let i=0;i<this.files.length;i++){
    const fileElement = document.createElement('div');

    const file = this.files[i];
    const url = URL.createObjectURL(file);

    fileElement.innerHTML = '<div class="file__box"><img src="img/file_img.svg"><p class="file__box-label">'+file.name+'</p><div class="button-delete" onclick="deleteFile(event)"></div></div>';
    filePlayer.appendChild(fileElement);
  }
}

fileInput.addEventListener('change', addFile);

  // ДрагнДроп файла

  const dropFiles = document.getElementsByClassName('answer-input__text')

  function highLightDropZone(event){
    event.preventDefault();
    this.classList.add('drop')
  }

  function unhighLightDropZone(event){
    event.preventDefault();
    this.classList.remove('drop')
  }

  if(dropFiles){
    const dropField = dropFiles[0]

    dropField.addEventListener('dragover', highLightDropZone)
    dropField.addEventListener('dragenter', highLightDropZone)
    dropField.addEventListener('dragleave', unhighLightDropZone)
    dropField.addEventListener('drop', (event) =>{
      const dt = event.dataTransfer
      unhighLightDropZone.call(dropField,event)
      addFile.call(dt)
    })
  }