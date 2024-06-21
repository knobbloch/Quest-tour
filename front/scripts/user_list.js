async function getUserList() {
    const URL = `${window.location.origin}/script/user_list`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
document.addEventListener("DOMContentLoaded", async function(){ 
    const userList = await getUserList();
    if (userList.length == 0) {
        document.getElementById('without-answers').innerHTML = "Вы еще не создали ни одного пользователя";Ы
    }
    else {
        renderList(userList);       
    }
});


async function renderList(list) {
    var listContainer = document.getElementById('listContainer');
    var listTemplate = document.getElementById('listTemplate');

    list.forEach(function(user) {
        var clone = document.importNode(listTemplate.content, true);
        clone.querySelector('.name').textContent = user.fio;
        clone.querySelector('.line').dataset.email = user.email; // добавляем email в data-атрибут
        listContainer.appendChild(clone);
    });    
}


function showDeletePopup(event, email) {
    event.stopPropagation();
    var element = event.currentTarget;
    var lineElement = element.closest('.line');

    // Сохраняем текущий элемент для удаления
    window.deleteUserElement = { email: email, lineElement: lineElement };
    
    // Открываем модальное окно
    const deleteModal = document.querySelector('pop-up');
    deleteModal.open_modal();
    // Функция закрывает модальное окно при нажатии на кнопку "НЕТ"
    document.getElementById("No-btn").addEventListener("click",function(){
        deleteModal.close_modal()
        window.location.reload()
    })

    // Функция закрывает модальное окно при нажатии на кнопку "Да"
    document.getElementById("Yes-btn").addEventListener("click",function() {
        deleteUser()
        deleteModal.close_modal()
        window.location.reload()
    });

}

async function deleteUser() {
    var email = window.deleteUserElement.email;
    var lineElement = window.deleteUserElement.lineElement;

    lineElement.parentNode.removeChild(lineElement);

    const URL = `${window.location.origin}/script/delete_user?target_email=${email}`;
    try {
        const response = await axios.delete(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}


function redirectToPage(user) {
    var email = user.dataset.email;
    window.location.href = `${window.location.origin}/admin_user_account?email=${email}`;
}

document.getElementsByClassName("button_plus")[0].addEventListener("click", function() {
    window.location.href = `${window.location.origin}/admin_add_user`;
});

document.getElementsByClassName("back_button")[0].addEventListener("click", function() {
    history.back();
});


