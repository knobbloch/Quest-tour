document.addEventListener('DOMContentLoaded', function() {
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

    const questionsContainer = document.querySelector('.questions');
    let questionCount = 0;

    function addQuestion() {
        questionCount++;

        // Клонируем шаблон вопроса
        const template = document.getElementById('question-template');
        const clone = document.importNode(template.content, true);

        // Находим элементы вопроса в клоне
        const questionDiv = clone.querySelector('.question');
        const questionNumber = questionDiv.querySelector('.number__question');
        const textarea = questionDiv.querySelector('.textarea');
        const answersContainer = questionDiv.querySelector('.answers__question');
        const addAnswerBtn = questionDiv.querySelector('.add_answer_btn');
        const questionTypeInput = questionDiv.querySelector('.question-type');

        // Устанавливаем номер вопроса
        questionNumber.textContent = `${questionCount}. `;

        // Устанавливаем id и текстовое содержимое textarea
        const questionId = `question_${questionCount}`;
        textarea.id = questionId;
        textarea.textContent = `Введите вопрос ${questionCount}...`;

        // Очищаем ответы в новом вопросе
        answersContainer.innerHTML = '';

        // Добавляем новый вопрос в контейнер вопросов
        questionsContainer.appendChild(questionDiv);

        // Вешаем обработчик на кнопку добавления ответа для нового вопроса
        addAnswerBtn.addEventListener('click', function() {
            const newAnswersCount = answersContainer.children.length + 1;
            addAnswer(newAnswersCount, questionTypeInput.value, answersContainer);
        });

        // Обработчик переключения типа вопроса (одиночный/множественный выбор)
        const toggleCheckbox = questionDiv.querySelector('#question-type-toggle');
        toggleCheckbox.addEventListener('change', function() {
            const answers = answersContainer.children;
            const answerTexts = [];

            // Сохраняем текущие ответы
            for (let i = 0; i < answers.length; i++) {
                answerTexts.push(answers[i].innerHTML);
            }

            answersContainer.innerHTML = ''; // Очищаем контейнер ответов

            if (this.checked) {
                // Выбран множественный выбор
                questionTypeInput.value = 'multiple';
                answerTexts.forEach((text, index) => {
                    addAnswer(index + 1, 'multiple', answersContainer, text);
                });
            } else {
                // Выбран одиночный выбор
                questionTypeInput.value = 'single';
                answerTexts.forEach((text, index) => {
                    addAnswer(index + 1, 'single', answersContainer, text);
                });
            }
        });
    }

    function addAnswer(count, type, container, text = `Ответ ${count}`) {
        let newAnswer;
        if (type === 'single') {
            newAnswer = document.createElement('custom-radiobutton-for-create');
            newAnswer.setAttribute('group', 'myGroup');
        } else {
            newAnswer = document.createElement('custom-checkbox-for-create');
        }
        newAnswer.innerHTML = text;
        container.appendChild(newAnswer);
    }

    // Вешаем обработчик на кнопку добавления вопроса
    const addQuestionBtn = document.querySelector('.add_question_btn');
    addQuestionBtn.addEventListener('click', addQuestion);

    // Вешаем обработчик на первоначальный вопрос
    addQuestion();
});
