async function getTaskList() {
    const URL = `${window.location.origin}/script/get_flowers`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    const taskList = await getTaskList();
    renderList(taskList);

    // Добавляем обработчик кликов на элементы .line
    document.getElementById('listContainer').addEventListener('click', lineClickHandler);
});

async function renderList(list) {
    var index = 0;
    var listContainer = document.getElementById('listContainer');
    var listTemplate = document.getElementById('listTemplate');
    list.forEach(function(task) {
        var clone = document.importNode(listTemplate.content, true);
        clone.querySelector('.name').textContent = task.title;
        clone.querySelector('.line').dataset.order = task.order + 1; 
        clone.querySelector('.line').dataset.type = task.type; 
        clone.querySelector('.line').dataset.index = index; 
        clone.querySelector('.line').dataset.entity_id = task.entity_id; 
        listContainer.appendChild(clone);
        index++;
    });
}
function CreateTask(order) {
    const selectedRadio = document.querySelector('input[name="myGroup"]:checked'); // Убедитесь, что выбрана радиокнопка
    if (selectedRadio) {
        const taskType = selectedRadio.value;
        console.log('Selected task type:', taskType); // Логирование значения taskType
        switch (taskType) {
            case 'open_response':
                window.location.href = `${window.location.origin}/create_practice?order=${order}`;
                break;
            case 'test':
                window.location.href = `${window.location.origin}/create_test?order=${order}`;
                break;
            case 'lecture':
                window.location.href = `${window.location.origin}/create_lecture?order=${order}`;
                break;
            default:
                console.error('Unknown task type:', taskType); // Логирование для отладки
        }
    } else {
        console.error('No radio button selected'); // Логирование для отладки
    }
}

async function getPractice(id2) {
    const URL = `${window.location.origin}/script/get_practice?p_id=${id2}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data.testornot;
    } catch (error) {
        console.log(error);
    }
}

async function openTask(ref_type, ref_id) {
    if (ref_type == 0) {
        window.location.href = "http://127.0.0.1:8000/edit_lecture?id=" + ref_id;
    } else {
        if (!await getPractice(ref_id)) {
            window.location.href = "http://127.0.0.1:8000/edit_practice?id=" + ref_id;
        } else {
            window.location.href = "http://127.0.0.1:8000/edit_test?id=" + ref_id;
        }
    }
}

function handleLineClick(event) {
    var lineElement = event.target.closest('.line');
    var order = lineElement.dataset.order;
    console.log(order);
    const popUpCreateTask = document.querySelector('pop-up-create-task');
    popUpCreateTask.open_modal();
    document.getElementById("Yes-btn").addEventListener("click", function() {
        CreateTask(order);
    });
    // Удаляем обработчик beforeLineClick после клика на "Yes-btn"
    document.getElementById('listContainer').removeEventListener('click', beforeLineClickHandler);
}

function beforeLineClick(event) {
    var lineElement = event.target.closest('.line');
    var entity_id = lineElement.dataset.entity_id;
    var type = lineElement.dataset.type;
    openTask(type, entity_id);
}

function lineClickHandler(event) {
    if (event.target.closest('.line')) {
        beforeLineClick(event);
    }
}

document.getElementsByClassName("back_button")[0].addEventListener("click", function() {
    history.back();
});

document.getElementById("create_task_btn").addEventListener("click", function() {
    const title = document.getElementById("title");
    title.textContent = "Выберите элемент после которого добавится новое задание";
    this.style.display = 'none';

    var listContainer = document.getElementById('listContainer');

    var newLine = document.createElement('div');
    newLine.className = 'line';
    newLine.id = "first_task";
    newLine.innerHTML = `
        <div class="user">
            <div class="details">
                <h1 class="name">Сделать задание первым</h1>
            </div>
        </div>
        <div class="action"></div>
    `;
    newLine.dataset.order = 0; 
    if (listContainer.firstChild) {
        listContainer.insertBefore(newLine, listContainer.firstChild);
    } else {
        listContainer.appendChild(newLine);
    }

    var actions = document.querySelectorAll('.action');
    actions.forEach(function(action) {
        action.style.display = 'none';
    });

    // Обновляем обработчик кликов для создания задания
    document.getElementById('listContainer').removeEventListener('click', lineClickHandler);
    document.getElementById('listContainer').addEventListener('click', function(event) {
        if (event.target.closest('.line')) {
            handleLineClick(event);
        }
    });
});


async function deleteTask(event, index) {
    event.stopPropagation(); 
    var element = event.currentTarget; 
    var lineElement = element.closest('.line');
    lineElement.parentNode.removeChild(lineElement);


    const URL = `${window.location.origin}/script/delete_by_index?index=${index}`;
    try {
        const response = await axios.delete(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
    window.location.reload()
}