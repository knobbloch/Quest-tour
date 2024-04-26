
async function getData() {
    const h1 = document.querySelector("h1");
    const questionNumber = 2;

    const URL = `${window.location.origin}/script/read_test_from_file?question_number=${questionNumber}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;

        h1.innerHTML = data.question;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    }
}
getData()