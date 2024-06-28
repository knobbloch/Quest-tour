window.length = 0;
async function deleteFile(event) {
  event.stopPropagation(); // Предотвращаем всплытие события
  var ansInput = document.getElementById('input_ans');
  var element = event.currentTarget; // Получаем текущий элемент, на котором произошло событие
  var fileElement = element.closest('.file__box');
  console.log()
  fileElement.parentNode.removeChild(fileElement);
  window.length -= 1;
  let rect = ansInput.getBoundingClientRect();
  ansInput.style.height = rect.height/20 - 6 + "rem" ;
}

// document.addEventListener('DOMNodeInserted', function(){fileInput = document.getElementById('add_file')});
document.addEventListener('DOMContentLoaded', function(){
  const ansInput = document.getElementById('input_ans');
  const fileInput = document.querySelector('#add_file'); // Переменная с полем для загрузки видео
  const filePlayer = document.getElementById('filePlayer'); // Переменная с местом для выгрузки видео
  console.log(ansInput, fileInput);

  // Рост texstarea при добавлении текста

  // function auto_grow() {
  //   let rect = ansInput.getBoundingClientRect();
  //   var textArea = document.getElementById('text_box');
  //   ansInput.style.height = (textArea.scrollHeight)/20 + "rem" ;
  //   textArea.style.height = (textArea.scrollHeight)/20 + "rem";
  // }



  // Кнопка удаления файла



  // Функция считывает изменение в буфере поля загрузки файла, проходится по каждой ссылке и добавляет эти файлы в место выгрузки соответственн
  
console.log(window.length);
  function addFile(){
      if (window.length < 1){
        const fileElement = document.createElement('div');
        let file = this.files[0];
        inputFile = file;
        const url = URL.createObjectURL(file);
        fileElement.innerHTML = '<div class="file__box"><img src="svg/file_img.svg"><p class="file__box-label">'+file.name+'</p><div class="button-delete" onclick="deleteFile(event)"></div></div>';
        filePlayer.appendChild(fileElement);
        let rect = ansInput.getBoundingClientRect();
        ansInput.style.height = rect.height/20 + (fileElement.scrollHeight/20) + 2 + "rem" ;
        window.length++;
        
      }
      else{
        document.getElementById("modal__box-text").textContent = "Можно добавить только один файл!";
        document.getElementById("exit-modal-ok").classList.add("open");
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
})