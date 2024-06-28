// Получение параметров из URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const index = urlParams.get('index');
async function getPractice() {
    const URL = `${window.location.origin}/script/get_practice?p_id=${id}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function renderPracticeName() {
    const practice = await getPractice();
    const practiceName = document.getElementById('practice-name');
    practiceName.textContent = practice.title;
}

async function getPracticeResult() {
    const URL = `${window.location.origin}/script/get_practice_result?p_id=${id}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data.result;
    } catch (error) {
        console.log(error);
    }
}

renderPracticeName();
// Функция для получения вопросов с сервера
async function getQuestions() {
    
    const URL = `${window.location.origin}/script/read_test_from_file?p_id=${id}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Функция для рендеринга одного вопроса
async function renderQuestion(questionData, index) {
    const questions = await getQuestions();
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question');

    const questionHeader = document.createElement('div');
    questionHeader.classList.add('name__question');
    questionHeader.textContent = `${index}. ${questionData.question}`;
    questionContainer.appendChild(questionHeader);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers__question');

    questionData.answers.forEach(answer => {
        let answerElement;
        if (questionData.radio) {
            answerElement = document.createElement('custom-radiobutton');
            answerElement.setAttribute('group', `${questionData.question}${index} `);
        } else {
            answerElement = document.createElement('custom-checkbox');
            answerElement.classList.add('ccheckbox');
        }

        answerElement.setAttribute('text', answer);
        answersContainer.appendChild(answerElement);
    });

    questionContainer.appendChild(answersContainer);
    const questionsDiv = document.querySelector('.questions');
    questionsDiv.appendChild(questionContainer);
}

// Функция для рендеринга всех вопросов
function renderQuestions(questions) {
    questions.forEach((questionData, index) => {
        renderQuestion(questionData, index + 1);
    });
}

// Функция для сбора отмеченных ответов
function collectAnswers() {
    const questionsDiv = document.querySelector('.questions');
    const questions = questionsDiv.querySelectorAll('.question');
    const answersList = [];

    questions.forEach((question, index) => {
        const answers = question.querySelectorAll('.answers__question custom-radiobutton, .answers__question custom-checkbox');
        const selectedAnswers = [];

        answers.forEach((answer, answerIndex) => {
            const inputElement = answer.querySelector('input');
            if (inputElement.type === 'radio' || inputElement.type === 'checkbox') {
                if (inputElement.checked) {
                    selectedAnswers.push(answerIndex);
                }
            }
        });

        if (selectedAnswers.length > 0) {
            answersList.push(selectedAnswers.join(', '));
        } else {
            answersList.push('');
        }
    });

    return answersList;
}
async function fetchAndRenderQuestions() {
    try {
        // Получите вопросы с сервера
        const questions = await getQuestions();
        
        // После получения данных рендерим вопросы
        renderQuestions(questions);
    } catch (error) {
        console.error('Ошибка при получении вопросов:', error);
    }
}

async function handleSubmit() {
    const questionsDiv = document.querySelector('.questions');
    const questions = questionsDiv.querySelectorAll('.question');
    const notAnsweredMessage = document.querySelector('h2');
    const submitButton = document.getElementById('open-modal-btn');
    const progressbar = document.querySelector('custom-progressbar-small');
    const next_btn = document.getElementById('next-btn');
    const repeat_btn = document.getElementById('repeat-btn');
    
    let allQuestionsAnswered = true;

    // Проверьте, все ли вопросы отвечены
    questions.forEach((question) => {
        const answers = question.querySelectorAll('.answers__question custom-radiobutton, .answers__question custom-checkbox');
        let questionAnswered = false;

        answers.forEach((answer) => {
            const inputElement = answer.querySelector('input');
            if (inputElement.checked) {
                questionAnswered = true;
            }
        });

        if (!questionAnswered) {
            allQuestionsAnswered = false;
        }
    });

    // Если все вопросы отвечены, показываем модальное окно
    if (allQuestionsAnswered) {
        document.getElementById("exit-modal").classList.add("open");

        // Обработчик кнопки "Да" в модальном окне
        document.querySelector('.modal button:not(#No-btn)').addEventListener('click', async function () {
            document.getElementById('exit-modal').classList.remove('open');
            const selectedAnswers = collectAnswers();
        
            try {
                // Отправка выбранных ответов на сервер
                await sendAnswersToServer(selectedAnswers);

            
                // Сделать кнопку отправки неактивной после успешной отправки ответов
                notAnsweredMessage.style.display = 'none';
                // Отключить все элементы ввода (радиокнопки и чекбоксы)
                document.querySelectorAll('.question custom-radiobutton, .question custom-checkbox').forEach(answer => {
                    const inputElement = answer.querySelector('input');
                    inputElement.disabled = true;
                });
                submitButton.disabled = true;
                window.location.href = `http://127.0.0.1:8000/test_result?id=${id}&index=${index}`;
            }
            catch (error) {
                console.error('Ошибка при отправке', error);
                // Возможно, вы хотите добавить обработку ошибок здесь
            }
        });

        // Обработчик кнопки "Нет" в модальном окне
        document.getElementById("No-btn").addEventListener("click", function () {
            document.getElementById("exit-modal").classList.remove("open");
        });
    } else {
        // Если не все вопросы отвечены, показываем сообщение
        notAnsweredMessage.style.display = 'block';
    }
}



// Добавляем обработчик события к кнопке отправки
const submitButton = document.getElementById('open-modal-btn');
submitButton.addEventListener('click', handleSubmit);

// Здесь вставьте вызов функции fetchAndRenderQuestions()
document.addEventListener('DOMContentLoaded', fetchAndRenderQuestions());

async function sendAnswersToServer(selectedAnswers) { 
    const URL = `${window.location.origin}/script/send_answers?p_id=${id}`;
    const data = JSON.stringify({sections: selectedAnswers})
    console.log(data)
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const response = await axios.post(URL, data, config)
    .then(response => {
        console.log('Правильных ответов: ', response.data)
    })
    .catch(error => {
        console.error('Ошибка при отправке', error)})
    return response
    }
    

const backButton = document.getElementById('back-to-map');
backButton.addEventListener('click', () => {
    // Переходим по URL-адресу
    window.location.href = 'http://127.0.0.1:8000/map'; // Замените 'URL' на нужный URL-адрес для перехода
});