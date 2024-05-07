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
            
                // Отключить все элементы ввода (радиокнопки и чекбоксы)
                document.querySelectorAll('.question custom-radiobutton, .question custom-checkbox').forEach(answer => {
                    const inputElement = answer.querySelector('input');
                    inputElement.disabled = true;
                });
                submitButton.disabled = true;
                 // Получить результат теста
                
                const result = await getPracticeResult();
                console.log('Результат теста:', result);
                progressbar.style.display = 'block';                     
                let number = document.getElementById("number");
                let progress_text = document.getElementById("progress-text");
                let isCoolResult = false
                if (result != 0 ){      
                    let end = result;      
                    let speed = 1500/end;
                    let percentProgress = document.querySelector(".circle");
                    
                    percentProgress.style.setProperty('--progress', 942 - (9.42 * end));
                    let counter = 0;
                    
                    setInterval(()=>{
                        if (counter == end){
                            clearInterval();
                            // if (isCoolResult) {

                            //     progress_text.style.display = 'block';
                            //     progress_text.style.color = '#369381'; // Задаем цвет текста зеленым при условии выполнения
                            //     progress_text.textContent = 'Все верно!';
                            //     submitButton.display = 'none';

                            // } else {
                            //     progress_text.style.display = 'block';
                            //     progress_text.style.color = 'df0009'; // Задаем цвет текста красным, если условие не выполнено
                            //     progress_text.textContent = 'Попробуй еще раз :c';
                            //     submitButton.display = 'none';
                            // }  
                        }else{
                            counter ++;
                            if (counter==60){
                                percentProgress.style.setProperty('stroke', `#369381`);
                                number.style.setProperty('color', '#369381');
                                isCoolResult = true;
                                
                                console.log(isCoolResult);
                            }
                            number.innerHTML = counter + "%";
                            
                            
                        }
                        
                    }, speed);
                        
                    }
                else {
                    console.log("Нет данных");
                    number.innerHTML = "0%";
                }
                
                console.log(isCoolResult);
                
                

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
    const URL = `${window.location.origin}/script/send_answers?p_id=${1}`;
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
    

async function getPracticeResult() {
    const URL = `${window.location.origin}/script/get_practice_result?p_id=${1}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data.result;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Функция для получения результата теста из сервера
 * @returns {Promise<number>} Количество правильных ответов
 */
async function fetchResultPractice() {
    try {
        // Получаем результат теста с сервера
        const result = await getPracticeResult();
        console.log('Получен результат теста:', result);
        // После получения результата рендерим его
        // renderQuestions(questions);
        return result;
    } catch (error) {
        console.error('Ошибка при получении результата:', error);
        throw error;
    }
}

function progressBar(num){
    
    
}