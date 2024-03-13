
// const questionsWithAnswers = [
//     { question: "Твоя мама гей?", answers: ["Да", "Да"] },
//     { question: "Твой папа гей?", answers: ["Да", "ДА"] },
//     { question: "Ты гей?", answers: ["Да", "ДАААА~~~~~"] },
//     { question: "Ты любишь маму?", answers: ["Да", "Нет", "Твою?"] },
//     { question: "Че с лицом?", answers: ["Че снилось", "мяу("] }
// ];

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

// async function getAnswers(answerNumber) {

//     const h1 = document.createElement("h2");
//     const URL = `${window.location.origin}/script/read_test_from_file?question_number=${answerNumber}`;
//     const response = await axios.get(URL);
//     const data = response.data;
//     return (data.answers);
    
// }
// const answerText = await getAnswers(1)
// console.log(answerText)
// getAnswers(1)

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
    // for (let i = 0; i < questionsWithAnswers.length; i++) {
    //     const selectedIndexes = "";
    //     const checkboxes = document.querySelectorAll(`input[name="question${i}"]:checked`);
    //     checkboxes.forEach((checkbox) => {
    //         const checkboxIndex = Array.from(checkbox.parentNode.children).indexOf(checkbox);
    //         selectedIndexes += `${checkboxIndex/2}, `;
    //     });
    //     allAnswers.push(selectedIndexes);
    // }
    return allAnswers;
}

const sendAnswersButton = document.getElementById('sendAnswers');

// const selectedAnswers = getSelectedAnswers();
sendAnswersButton.addEventListener('click', () => 
    sendAnswersToServer(getSelectedAnswers()) 
    // console.log(getSelectedAnswers())
)
// console.log(getSelectedAnswers());


async function sendAnswersToServer(selectedAnswers) {
    // const URL = `${window.location.origin}/script/send_answers?answer_list=${selectedAnswers}`;
    // // const URL = `${window.location.origin}/script/send_answers`;
    // try {
    //     // const response = await axios.post(URL, {selectedAnswers});
    //     const response = await axios.post(URL);
    //     console.log('Ответы отправлены', response.data);
    // } catch (error) {
    //     console.error('Ошибка при отправке', error);
    // }   

    const URL = `${window.location.origin}/script/test_post?text=${'иди нахуй'}`;
    // const URL = `${window.location.origin}/script/send_answers`;
    try {
        // const response = await axios.post(URL, {selectedAnswers});
        const response = await axios.post(URL);
        console.log('Ответы отправлены', response.data);
    } catch (error) {
        console.error('Ошибка при отправке', error);
    }  
}
    