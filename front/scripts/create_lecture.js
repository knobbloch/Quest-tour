    // Глобальная переменная для считывания видео

    added_file = '';
    added_link = '';

    // Переменные для считывания информации со страницы
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let orderc = urlParams.get('order'),
    title = document.getElementById("title"),
    description = document.getElementById("description");
    
    // Функция перехода

    function back(){
        window.location.href = 'http://127.0.0.1:8000/task_list.html';
    }
  
      // Функция выгрузки лекции
    async function send_lection_file(title, description, orderc) {  
        const URL = `${window.location.origin}/script/create_lecture_with_file`;
        const formData = new FormData();
        const data={title: title,description: description,orderc: orderc};
        formData.append('lecture', JSON.stringify(data));
        formData.append('file', added_file);

        try {
            const response = await axios.post(URL, formData);
            console.log(response.data);
            if (response.data['status'] != 201) {
                document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
            }
            document.getElementById("exit-modal-ok").classList.add("open");
        } catch (error) {
            console.log(error);
        }
    }

    async function send_lection_no_file(title,description,orderc){
        const URL = `${window.location.origin}/script/create_lecture`;
        axios({
          method: 'post',
          url: URL,
          data: {title: title,description: description,orderc: orderc,pathto:added_link},
        })
        .then(response => {
          console.log(response.data)
          if(response.data['status']!=201){
            document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
          }
          document.getElementById("exit-modal-ok").classList.add("open")
        })
        .catch(error => {
          console.log(error)
        })
    }
      
  
      // Функция открытия попапа
  
    function create_lection(){
        if(added_file!=''){
            send_lection_file(title.value,description.value,orderc);
        }else{
          
          console.log(orderc);
            send_lection_no_file(title.value,description.value,orderc);
        }
    }