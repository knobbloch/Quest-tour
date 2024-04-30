var items = [
    { name: "Задание 1" },
    { name: "Задание 2" },
    { name: "Задание 3" },
    { name: "Задание 1" },
    { name: "Задание 2" },
    { name: "Задание 3" },
    { name: "Задание 4" }
    // Добавьте больше элементов по мере необходимости
];

// Получаем контейнер списка 
var listContainer = document.getElementById('listContainer');

// Получаем шаблон элемента списка
var listTemplate = document.getElementById('listTemplate');

// Создаем элементы списка на основе данных + еще надо дописать запрос на получение списка из бд
items.forEach(function(item) {
    var clone = document.importNode(listTemplate.content, true);
    clone.querySelector('.name').textContent = item.name;
    listContainer.appendChild(clone);
});

// Функция для удаления пользователя + еще надо дописать запрос на удаление задания из бд

async function deleteTask(event) {
    event.stopPropagation(); // Предотвращаем всплытие события

    var element = event.currentTarget; // Получаем текущий элемент, на котором произошло событие
    var lineElement = element.closest('.line');
    lineElement.parentNode.removeChild(lineElement);
}

function redirectToPage(element) {//запрос id задания чтобы принять всё задание
    // Получаем содержимое элемента, на котором произошло событие
    var lineElement = element.closest('.line');
    
    // Определяем, куда нужно перенаправиться (в данном случае, 'another_page.html')
    var destinationPage = './edit_task.html';
    
    // Выполняем перенаправление
    window.location.href = destinationPage;
}

