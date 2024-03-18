async function getQuestions() {

    const URL = `${window.location.origin}/script/read_test_from_file`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        console.log('Вопросы получены', response.data);
        return data;
    } catch (error) {
        console.error('Ошибка при получении', error);
    }  
}

async function CreateQuestion() {
    questionsWithAnswers = await getQuestions();
    const container = document.getElementById("questions-container");
    let num = 0;
    questionsWithAnswers.forEach(qa => {
        const questionElem = document.createElement("div");
        questionElem.textContent = qa.question;
        
        qa.answers.forEach(answer => {
            const radioInput = document.createElement("input");
            radioInput.type = "checkbox";
            radioInput.name = "question" + num;
            radioInput.value = answer;

            const label = document.createElement("label");
            label.textContent = answer;
            
            questionElem.appendChild(radioInput);
            questionElem.appendChild(label);
        });
        
        num++;
        container.appendChild(questionElem);
    });
}
let questionsWithAnswers = []
CreateQuestion();
function getSelectedAnswers() {
    const allAnswers = [];
    
    for (let i = 0; i < questionsWithAnswers.length; i++) {
        const selectedIndexes = [];
        const checkboxes = document.querySelectorAll(`input[name="question${i}"]:checked`);
        checkboxes.forEach((checkbox) => {
            const checkboxIndex = Array.from(checkbox.parentNode.children).indexOf(checkbox);
            selectedIndexes.push(checkboxIndex/2);
        });
        allAnswers.push(selectedIndexes.join(', '));
    }
    return allAnswers;
}

const sendAnswersButton = document.getElementById('sendAnswers');

sendAnswersButton.addEventListener('click', () => 
    sendAnswersToServer(getSelectedAnswers()) 
)


async function sendAnswersToServer(selectedAnswers) { 
    const URL = `${window.location.origin}/script/send_answers`;
    const data = JSON.stringify({sections: selectedAnswers})
    console.log(data)
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const response = await axios.post('script/send_answers', data, config)
    .then(response => {
        console.log('Правильных ответов: ', response.data)
    })
    .catch(error => {
        console.error('Ошибка при отправке', error)})
    return response
    }
    