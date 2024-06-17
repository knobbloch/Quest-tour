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
function adjustHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}


const titleLect = document.querySelector('.title');
const textLect = document.querySelector('.lecture');
document.addEventListener('DOMContentLoaded', async function() {
    adjustHeight(textLect);
    window.onload = function() {
        adjustHeight(textLect);
    };
    window.onresize = function() {
        adjustHeight(textLect);
    };
    const lecture = await getLecture();
    titleLect.innerHTML = lecture.title;
    textLect.innerHTML = lecture.description;
})
const lectContent = [titleLect, textLect];
        // textLect = 
        // Сохранение содержимого текстового поля
        // textLect.addEventListener('input', function() {
        //     const content = textLect.value;
        //     localStorage.setItem('savedContent', content);
        // });

        // // Восстановление содержимого текстового поля при загрузке страницы
        // window.addEventListener('DOMContentLoaded', function() {
        //     const savedContent = localStorage.getItem('savedContent');
        //     if (savedContent) {
        //         textLect.value = savedContent;
        //     }
        // })
        //пут запрос edit lecture http://127.0.0.1:8000/script/edit_lecture?l_id=1
async function editLecture(){
    const URL = `${window.location.origin}/script/edit_lecture?l_id=${id}`; 
    const data = JSON.stringify({sections: lectureContent})
    console.log(data)
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const response = await axios.put(URL, data, config)
    .then(response => {
        console.log('Редактирование лекции: ', response.data)
    })
    .catch(error => {
        console.error('Ошибка при отправке', error)})
        return response
}