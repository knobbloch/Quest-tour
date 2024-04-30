var userData = [
    {name: "Якина Елена Андреевна", passRate: ["100", "99", "0", "100", "99", "0"]},
    {name: "Кузнецова Алёна Константиновна", passRate: ["95", "98", "100", "75", "80", "90"]},
    {name: "Фёдоровых Михаил Иванович", passRate: ["80", "85", "90", "95", "100", "100"]},
    {name: "Тимофеева Мария Игоревна", passRate: ["70", "75", "80", "85", "90", "95", "75", "80", "85", "90", "95"]}
]

function getMaxPassRateLength(userData) {
    let maxLength = 0;
    for (let i = 0; i < userData.length; i++) {
        const passRateLength = userData[i].passRate.length;
        if (passRateLength > maxLength) {
            maxLength = passRateLength;
        }
    }
    return maxLength;
}

function generateTaskHeaders(maxLength) {
    const headerContainer = document.querySelector('.tasks .numbers'); // Находим внутренний контейнер с классом .numbers
    headerContainer.innerHTML = ''; // Очищаем его содержимое перед добавлением новых заданий
    for (let i = 1; i <= maxLength; i++) {
        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task');
        taskHeader.textContent = 'Задание ' + i;
        headerContainer.appendChild(taskHeader);
    }
}
const maxLength = getMaxPassRateLength(userData);
generateTaskHeaders(maxLength);

// Получаем ссылки на контейнеры ФИО, баллов и заданий
const usersContainer = document.querySelector('.users');
const pointsContainer = document.querySelector('.points');
const tasksContainer = document.querySelector('.tasks .numbers');

// Создаем функцию для заполнения контейнеров данными из списка
function fillUserData() {
    userData.forEach(user => {
        // Создаем и заполняем шаблон ФИО
        const userTemplate = document.querySelector('.user-template').content.cloneNode(true);
        userTemplate.querySelector('.name').textContent = user.name;
        usersContainer.appendChild(userTemplate);

        // Создаем контейнер для баллов пользователя
        const linePointsContainer = document.createElement('div');
        linePointsContainer.classList.add('line_points');

        // Заполняем контейнер баллов
        user.passRate.forEach(score => {
            const pointTemplate = document.createElement('div');
            pointTemplate.classList.add('point');
            pointTemplate.textContent = score;
            linePointsContainer.appendChild(pointTemplate);
        });

        // Добавляем контейнер баллов пользователя в общий контейнер баллов
        pointsContainer.appendChild(linePointsContainer);
    });

}

// Вызываем функцию заполнения при загрузке страницы
fillUserData();