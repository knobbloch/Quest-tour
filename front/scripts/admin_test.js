const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

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

async function getQuestions() {
    const URL = `${window.location.origin}/script/read_test_from_file_adm?p_id=${id}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    renderPracticeName();
    fetchAndRenderQuestions();
})

async function renderPracticeName() {
    const practice = await getPractice();
    const practiceName = document.getElementById('practice-name');
    practiceName.textContent = practice.title;
}

async function renderQuestion(questionData, index) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question');

    const questionHeader = document.createElement('div');
    questionHeader.classList.add('name__question');
    questionHeader.textContent = `${index}. ${questionData.question}`;
    questionContainer.appendChild(questionHeader);

    const answersContainer = document.createElement('div');
    answersContainer.classList.add('answers__question');

    questionData.answers.forEach((answer, answerIndex) => {
        let answerElement;
        const isChecked = questionData.right_answers.includes(answerIndex);
        const disabledAttr = true;
        const checkedAttr = isChecked;

        if (questionData.radio) {
            answerElement = document.createElement('custom-radiobutton');
            answerElement.setAttribute('group', `${questionData.question}${index}`);
        } else {
            answerElement = document.createElement('custom-checkbox');
            answerElement.classList.add('ccheckbox');
        }

        answerElement.setAttribute('text', answer);
        answerElement.setAttribute('disabled', disabledAttr);
        answerElement.setAttribute('checked', checkedAttr);

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

async function fetchAndRenderQuestions() {
    try {
        const questions = await getQuestions();
        renderQuestions(questions);
    } catch (error) {
        console.error('Ошибка при получении вопросов:', error);
    }
}

function back() {
    window.location.href = 'http://127.0.0.1:8000/task_list';
}

function answers() {
    // window.location.href = 'http://127.0.0.1:8000/practice_answer_list'; //?????
}

function edit() {
    window.location.href = 'http://127.0.0.1:8000/edit_test?id=' + id;
}