// document.addEventListener('DOMContentLoaded', function() {
//     textareaExpanding();

//     // const questionsContainer = document.querySelector('.questions');
//     // let questionCount = 0;

    

//     // // Вешаем обработчик на кнопку добавления вопроса
//     // const addQuestionBtn = document.querySelector('.add_question_btn');
//     // addQuestionBtn.addEventListener('click', addQuestion);

//     // // Вешаем обработчик на первоначальный вопрос
//     // addQuestion();
// });

// function textareaExpanding() {
//     const textareas = document.querySelectorAll('textarea');
//     textareas.forEach(textarea => {
//         textarea.addEventListener('input', function() {
//             const tempSpan = document.createElement('span');
//             tempSpan.style.visibility = 'hidden';
//             tempSpan.style.whiteSpace = 'pre'; // Сохраняет пробелы и переносы строк
//             document.body.appendChild(tempSpan);

//             const styles = window.getComputedStyle(textarea);
//             tempSpan.style.font = styles.font;
//             tempSpan.style.fontSize = styles.fontSize;
//             tempSpan.style.fontFamily = styles.fontFamily;
//             tempSpan.style.fontWeight = styles.fontWeight;
//             tempSpan.style.letterSpacing = styles.letterSpacing;
//             tempSpan.style.padding = styles.padding;

//             tempSpan.textContent = textarea.value;

//             const newWidth = tempSpan.offsetWidth + parseInt(styles.paddingLeft) + parseInt(styles.paddingRight);
//             textarea.style.width = `${newWidth}px`;

//             document.body.removeChild(tempSpan);
//         });
//     });
// }

document.addEventListener("DOMContentLoaded", () => {

    function addQuestion() {
        const questionClone = questionTemplate.cloneNode(true);
        const questionNumber = questionsContainer.children.length + 1;
        questionClone.querySelector(".number__question").textContent = `${questionNumber}.`;
        questionsContainer.appendChild(questionClone);
        updateQuestionNumbers();
        textareaExpanding();
    }

    function addAnswer(question) {
        const answersContainer = question.querySelector(".answers__question");
        const questionTypeToggle = question.querySelector("#question-type-toggle");

        if (!questionTypeToggle) {
            console.error("Element #question-type-toggle not found in the question.");
            return;
        }

        const isMultiple = questionTypeToggle.checked;
        const group = `group_${questionsContainer.children.length}`; // Уникальная группа для вопроса
        const newAnswer = createCustomAnswerElement(isMultiple, group);
        newAnswer.textContent = `Ответ ${answersContainer.children.length + 1}`;
        answersContainer.appendChild(newAnswer);
        updateAnswerNumbers();
        textareaExpanding();
    }

    function updateQuestionNumbers() {
        const questions = questionsContainer.querySelectorAll(".question");
        questions.forEach((question, index) => {
            question.querySelector(".number__question").textContent = `${index + 1}.`;
        });
    }

    function updateAnswerNumbers() {
        const questions = questionsContainer.querySelectorAll(".question");
        questions.forEach((question) => {
            const answers = question.querySelectorAll(".label");
            answers.forEach((answer, index) => {
                const textarea = answer.querySelector(".textarea");
                if (textarea) {
                    textarea.placeholder = `Ответ ${index + 1}`;
                }
            });
        });
    }

    function updateAnswersType(question) {
        const answersContainer = question.querySelector(".answers__question");
        const questionTypeToggle = question.querySelector("#question-type-toggle");

        if (!questionTypeToggle) {
            console.error("Element #question-type-toggle not found in the question.");
            return;
        }

        const isMultiple = questionTypeToggle.checked;
        console.log("isMultiple:", isMultiple);

        const group = answersContainer.dataset.group || `group_${questionsContainer.children.length}`; // Уникальная группа для ответа
        const answers = answersContainer.querySelectorAll("custom-checkbox-for-create, custom-radiobutton-for-create");

        answers.forEach(answer => {
            const textarea = answer.querySelector(".textarea");
            if (!textarea) {
                console.error("Textarea not found in answer:", answer);
                return;
            }
            const newAnswer = createCustomAnswerElement(isMultiple, group);
            newAnswer.textContent = textarea.value;
            answer.parentNode.replaceChild(newAnswer, answer);
            newAnswer.textareaExpanding();
        });
    }

    function createCustomAnswerElement(isMultiple, group) {
        const element = document.createElement(isMultiple ? 'custom-checkbox-for-create' : 'custom-radiobutton-for-create');
        element.setAttribute("group", group);
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
                textarea.style.width = `${newWidth + 20}px`;

                document.body.removeChild(tempSpan);
            });
        });
    }

    const addQuestionButton = document.querySelector(".add_question_btn");
    const questionsContainer = document.querySelector(".questions");
    const questionTemplate = document.getElementById("question-template").content;

    addQuestionButton.addEventListener("click", () => {
        addQuestion();
    });

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

    sendPractice().then(practiceSent => {
        if (practiceSent.okornot) {
            console.log(practiceSent.message);
            sendQuestions(questions, practiceSent.message);
        }
    });
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let orderc = urlParams.get('order');
async function sendPractice(){
    const title = document.getElementById('title').value.trim();
    const URL = `${window.location.origin}/script/create_practice`;
    try {
        const response = await axios.post(URL, {
            title: title,
            description: "string",
            orderc: orderc,
            testornot: true
        });

        if(response.data.status != 201) {
            document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
            return {okornot:false, message:response.data.Message};
        }
        console.log("Задание создано");
        document.getElementById("exit-modal-ok").classList.add("open");
        return {okornot:true, message:response.data.Message};
    } catch (error) {
        console.error(error);
        return {okornot:false, message:response.data.Message};
    }
}

async function sendQuestions(list, id){
    id = parseInt(id);
    const URL = `${window.location.origin}/script/add_questions?p_id=${id}`;

    axios({
        method: 'post',
        url: URL,
        data: list
      })
      .then(response => { 
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
}

function back(){
    window.location.href = 'http://127.0.0.1:8000/task_list';
  }