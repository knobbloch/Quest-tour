// Определение всех функций

// Функция для получения вопросов с сервера
async function getQuestions() {
    const URL = `${window.location.origin}/script/read_test_from_file?p_id=${1}`;
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
            answerElement.setAttribute('group', questionData.question);
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
        console.error('Ошибка при получении и рендеринге вопросов:', error);
    }
}

// Функция для обработки отправки
function handleSubmit() {
    const questionsDiv = document.querySelector('.questions');
    const questions = questionsDiv.querySelectorAll('.question');
    const notAnsweredMessage = document.querySelector('h2');
    let allQuestionsAnswered = true;

    questions.forEach((question) => {
        const answers = question.querySelectorAll('.answers__question custom-radiobutton, .answers__question custom-checkbox');
        let questionAnswered = false;

        answers.forEach((answer) => {
            const inputElement = answer.querySelector('input');
            if ((inputElement.type === 'radio' || inputElement.type === 'checkbox') && inputElement.checked) {
                questionAnswered = true;
            }
        });

        if (!questionAnswered) {
            allQuestionsAnswered = false;
        }
    });

    // Показывать надпись, если не все вопросы были отвечены
    if (!allQuestionsAnswered) {
        notAnsweredMessage.style.display = 'block';
        return;
    } else {
        // Скрыть надпись, если все вопросы были отвечены
        notAnsweredMessage.style.display = 'none';
    }

    const selectedAnswers = collectAnswers();
    console.log(selectedAnswers);

    const inputs = document.querySelectorAll('.questions input[type="radio"], .questions input[type="checkbox"]');
    inputs.forEach(input => {
        input.disabled = true;
    });
}

// Добавляем обработчик события к кнопке отправки
const submitButton = document.querySelector('custom-button-red');
submitButton.addEventListener('click', handleSubmit);

// Здесь вставьте вызов функции fetchAndRenderQuestions()
fetchAndRenderQuestions();


submitButton.addEventListener('click', () => 
    sendAnswersToServer(collectAnswers()) 
)

async function sendAnswersToServer(selectedAnswers) { 
    const URL = `${window.location.origin}/script/send_answers?p_id=${1}&email=${'mama'}`;
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
    