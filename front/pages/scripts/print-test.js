const questions = [
    { question: "Твоя мама гей?", answers: ["да", "нет", "ьяу"], type: true },
    { question: "Какой у тебя любимый цвет?", answers: ["синий", "красный", "зеленый"], type: false },
    { question: "Какую музыку ты любишь?", answers: ["рок", "поп", "джаз", "суши", "бургер"], type: false },
    { question: "Ты любишь путешествовать?", answers: ["да", "нет", "иногда"], type: true },
    { question: "Какая у тебя любимая еда?", answers: ["пицца", "суши", "бургер"], type: false },
    { question: "Как ты предпочитаешь отдыхать?", answers: ["читать", "смотреть телевизор", "путешествовать"], type: false },
    { question: "Что ты обычно делаешь в выходные?", answers: ["сплю", "гуляю", "работаю"], type: true }
];

function renderQuestion(questionData, index) {
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
        if (questionData.type) {
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

function renderQuestions(questions) {
    questions.forEach((questionData, index) => {
        renderQuestion(questionData, index + 1);
    });
}

renderQuestions(questions);

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

const submitButton = document.querySelector('custom-button-red');
submitButton.addEventListener('click', handleSubmit);

