const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

document.addEventListener("DOMContentLoaded", async () => {
    renderPracticeName();

    const questionList = await getQuestions();
    populateQuestions(questionList);

    function populateQuestions(questionList) {
        const questionsContainer = document.querySelector(".questions");
        const questionTemplate = document.getElementById("question-template");
        questionsContainer.innerHTML = ''; // Очищаем контейнер вопросов
    
        questionList.forEach((questionData, questionIndex) => {
            if (!questionTemplate) {
                console.error("Шаблон вопроса не найден");
                return;
            }
    
            const questionClone = questionTemplate.content.cloneNode(true);
            const questionElement = questionClone.querySelector(".question");
    
            const questionText = questionElement.querySelector(".question-text");
            questionText.value = questionData.question;
    
            const questionTypeToggle = questionElement.querySelector("#question-type-toggle");
            if (questionTypeToggle) {
                questionTypeToggle.checked = !questionData.radio; // Установка свойства checked, если элемент существует
            } else {
                console.error("Элемент custom-checkbox не найден");
            }
    
            const answersContainer = questionElement.querySelector(".answers__question");
            questionData.answers.forEach((answerText, answerIndex) => {
                const answerElement = createCustomAnswerElement(!questionData.radio, `group_${questionIndex}`);
                const textarea = answerElement.querySelector(".textarea");
                textarea.textContent = answerText;
    
                // Проверяем, является ли текущий ответ правильным
                if (questionData.right_answers.includes(answerIndex)) {
                    const input = answerElement.querySelector('input');
                    if (input) {
                        input.checked = true; // Отмечаем правильный ответ
                    } else {
                        console.error("Элемент input не найден в ответе");
                    }
                }
    
                answersContainer.appendChild(answerElement);
            });
    
            questionsContainer.appendChild(questionClone);
            updateQuestionNumbers();
            updateAnswerNumbers();
            textareaExpanding();
        });
    }


    function addQuestion() {
        const questionTemplate = document.getElementById("question-template");
        const questionClone = questionTemplate.content.cloneNode(true);
        const questionsContainer = document.querySelector(".questions");
        const questionNumber = questionsContainer.children.length + 1;
        questionClone.querySelector(".number__question").textContent = `${questionNumber}.`;
        questionsContainer.appendChild(questionClone);
        updateQuestionNumbers();
        textareaExpanding();
    }

    function addAnswer(question) {
        const answersContainer = question.querySelector(".answers__question");
        const questionTypeToggle = question.querySelector("custom-checkbox");

        if (!questionTypeToggle) {
            console.error("Элемент custom-checkbox не найден в вопросе.");
            return;
        }

        const isMultiple = questionTypeToggle.checked;
        const group = `group_${questionsContainer.children.length}`; // Уникальная группа для вопроса
        const newAnswer = createCustomAnswerElement(isMultiple, group);
        newAnswer.querySelector(".textarea").placeholder = `Ответ ${answersContainer.children.length + 1}`;
        answersContainer.appendChild(newAnswer);
        updateAnswerNumbers();
        textareaExpanding();
    }

    function updateQuestionNumbers() {
        const questions = document.querySelectorAll(".questions .question");
        questions.forEach((question, index) => {
            question.querySelector(".number__question").textContent = `${index + 1}.`;
        });
    }

    function updateAnswerNumbers() {
        const questions = document.querySelectorAll(".questions .question");
        questions.forEach((question) => {
            const answers = question.querySelectorAll(".answers__question .textarea");
            answers.forEach((answer, index) => {
                answer.placeholder = `Ответ ${index + 1}`;
            });
        });
    }

    function updateAnswersType(question) {
        const answersContainer = question.querySelector(".answers__question");
        const questionTypeToggle = question.querySelector("custom-checkbox");

        if (!questionTypeToggle) {
            console.error("Элемент custom-checkbox не найден в вопросе.");
            return;
        }

        const isMultiple = questionTypeToggle.checked;

        const group = answersContainer.dataset.group || `group_${questionsContainer.children.length}`; // Уникальная группа для ответа
        const answers = answersContainer.querySelectorAll("custom-checkbox-for-create, custom-radiobutton-for-create");

        answers.forEach(answer => {
            const textarea = answer.querySelector(".textarea");
            if (!textarea) {
                console.error("Textarea не найдена в ответе:", answer);
                return;
            }
            const newAnswer = createCustomAnswerElement(isMultiple, group);
            newAnswer.querySelector(".textarea").value = textarea.value;
            answer.parentNode.replaceChild(newAnswer, answer);
            textareaExpanding();
        });
    }

    function createCustomAnswerElement(isMultiple, group) {
        const element = document.createElement(isMultiple ? 'custom-checkbox-for-create' : 'custom-radiobutton-for-create');
        element.setAttribute("group", group);
        const textarea = document.createElement('textarea');
        textarea.classList.add('textarea');
        element.appendChild(textarea);
        return element;
    }

    function textareaExpanding() {
        const textareas = document.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.addEventListener('input', function() {
                const tempSpan = document.createElement('span');
                tempSpan.style.visibility = 'hidden';
                tempSpan.style.whiteSpace = 'pre'; // Сохраняет пробелы и переносы строк
                document.body.appendChild(tempSpan);

                const styles = window.getComputedStyle(textarea);
                tempSpan.style.font = styles.font;
                tempSpan.style.fontSize = styles.fontSize;
                tempSpan.style.fontFamily = styles.fontFamily;
                tempSpan.style.fontWeight = styles.fontWeight;
                tempSpan.style.letterSpacing = styles.letterSpacing;
                tempSpan.style.padding = styles.padding;

                tempSpan.textContent = textarea.value;

                const newWidth = tempSpan.offsetWidth + parseInt(styles.paddingLeft) + parseInt(styles.paddingRight);
                textarea.style.width = `${newWidth}px`;

                document.body.removeChild(tempSpan);
            });
        });
    }

    const addQuestionButton = document.querySelector(".add_question_btn");
    const questionsContainer = document.querySelector(".questions");

    if (addQuestionButton) {
        addQuestionButton.addEventListener("click", () => {
            addQuestion();
        });
    }

    if (questionsContainer) {
        questionsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("delete_question")) {
                const question = event.target.closest(".question");
                questionsContainer.removeChild(question);
                updateQuestionNumbers();
            } else if (event.target.classList.contains("add_answer_btn")) {
                const question = event.target.closest(".question");
                addAnswer(question);
            } else if (event.target.classList.contains("delete_answer")) {
                const question = event.target.closest(".question");
                const answer = event.target.closest(".label");
                answer.parentNode.removeChild(answer);
                updateAnswerNumbers();
                updateAnswersType(question); // Обновляем типы ответов после удаления
            }
        });

        questionsContainer.addEventListener("change", (event) => {
            if (event.target.id === "question-type-toggle") {
                const question = event.target.closest(".question");
                updateAnswersType(question);
            }
        });
    }

    textareaExpanding();
});


function createTest() {
    const title = document.getElementById('title').value.trim();

    const questions = [];
    let allQuestionsValid = true;

    const questionElements = document.querySelectorAll('.question');
    questionElements.forEach((questionElement, index) => {
        const questionTextElement = questionElement.querySelector('.question-text');
        const questionText = questionTextElement.value.trim();

        const answers = [];
        const answerElements = questionElement.querySelectorAll('.answers__question .label');
        answerElements.forEach((answerElement, answerIndex) => {
            const answerTextElement = answerElement.querySelector('.textarea');
            const answerText = answerTextElement.value.trim();
            if (answerText) {
                answers.push(answerText);
            }
        });

        const questionTypeToggle = questionElement.querySelector('#question-type-toggle');
        const isMultiple = questionTypeToggle.checked;

        const rightAnswers = [];
        if (!isMultiple) {
            const radioButtons = questionElement.querySelectorAll('.answers__question input[type="radio"]');
            radioButtons.forEach((radioButton, answerIndex) => {
                if (radioButton.checked) {
                    rightAnswers.push(answerIndex);
                }
            });
        } else {
            const checkboxes = questionElement.querySelectorAll('.answers__question input[type="checkbox"]');
            checkboxes.forEach((checkbox, answerIndex) => {
                if (checkbox.checked) {
                    rightAnswers.push(answerIndex);
                }
            });
        }

        if (rightAnswers.length === 0) {
            allQuestionsValid = false;
            document.getElementById('warning').textContent = `* Вопрос ${index + 1} должен иметь хотя бы один правильный ответ.`;
        }

        questions.push({
            radio: !isMultiple,
            question: questionText,
            answers: answers,
            right_answers: rightAnswers,
            description: "string"
        });
    });

    if (!allQuestionsValid) {
        return;
    }

    const testObject = {
        title: title,
        questions: questions
    };

    console.log(JSON.stringify(questions, null, 2));

    editPractice().then(practiceSent => {
        if (practiceSent) {
            sendQuestions(questions);
        }
    });
}

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
    const practiceName = document.getElementById('title');
    practiceName.textContent = practice.title;
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

async function editPractice(){
    const title = document.getElementById('title').value.trim();
    const URL = `${window.location.origin}/script/edit_practice?p_id=${id}`;
    try {
        const response = await axios.put(URL, {
            title: title,
            description: "string",
        });

        if(response.data.status != 201) {
            document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
            return false;
        }
        console.log(response.data);
        document.getElementById("exit-modal-ok").classList.add("open");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function sendQuestions(list){
    const URL = `${window.location.origin}/script/add_questions?p_id=${id}`;
    try {
        const response = await axios.post(URL, { list: list });
    } catch (error) {
        console.error(error);
    }
}

function back(){
    window.location.href = 'http://127.0.0.1:8000/admin_test?id=' + id;
}