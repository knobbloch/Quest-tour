var items = [
    { name: "Якина Елена Андреевна" },
    { name: "Тимофеева Мария Игоревна" },
    { name: "Кузнецова Алёна Константиновна" },
    { name: "Фёдоровых Михаил Иванович" },
    { name: "Якина Елена Андреевна" },
    { name: "Тимофеева Мария Игоревна" },
    { name: "Кузнецова Алёна Константиновна" },
    { name: "Фёдоровых Михаил Иванович" },
    { name: "Якина Елена Андреевна" },
    { name: "Тимофеева Мария Игоревна" },
    { name: "Кузнецова Алёна Константиновна" },
    { name: "Фёдоровых Михаил Иванович" },
    { name: "Якина Елена Андреевна" },
    { name: "Тимофеева Мария Игоревна" },
    { name: "Кузнецова Алёна Константиновна" },
    { name: "Фёдоровых Михаил Иванович" },
    { name: "Селиванова Алина Андреевна" }
];

var listContainer = document.getElementById('listContainer');

var listTemplate = document.getElementById('listTemplate');

//+ еще надо дописать запрос на получение списка из бд
items.forEach(function(item) {
    var clone = document.importNode(listTemplate.content, true);
    clone.querySelector('.name').textContent = item.name;
    listContainer.appendChild(clone);
});

//  + еще надо дописать запрос на удаление пользователя из бд

async function deleteUser(event) {
    event.stopPropagation(); // 

    var element = event.currentTarget; 
    var lineElement = element.closest('.line');
    lineElement.parentNode.removeChild(lineElement);
}

function redirectToPage(element) {//запрос id пользователя чтобы принять его данные???
    var lineElement = element.closest('.line');
    var destinationPage = './edit_user.html';
    window.location.href = destinationPage;
}

