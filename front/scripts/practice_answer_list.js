const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let p_id = urlParams.get('p_id');

async function getPracticeAnswerList() {
    const URL = `${window.location.origin}/script/who_done?p_id=${p_id}`;
    try {
        const response = await axios.get(URL);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
document.addEventListener("DOMContentLoaded", async function(){ 
    const userList = await getPracticeAnswerList();
    if (userList.length == 0) {
        document.getElementById('without-answers').innerHTML = "На это задание еще никто не дал ответ";
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
        clone.querySelector('.name').textContent = user.surname + ' ' + user.namep + ' ' + user.thirdname;
        clone.querySelector('.line').dataset.email = user.email; 
        
        listContainer.appendChild(clone);
    });    
}



function redirectToPage(user) {
    var target_email = user.dataset.email;
    window.location.href = `${window.location.origin}/admin_practice_answer?p_id=${p_id}&target_email=${target_email}`;
}


