function CheckingEnteredLogin() {
    var login = document.getElementById('login')
    return login.value.trim().length > 1 && login.value.trim().length < 30;
}

function CheckingEnteredPassword() {
    var password = document.getElementById('pass')
    return password.value.trim().length > 8 && password.value.trim().length < 30;
}

document.getElementById('login').addEventListener('input', function() {
    var loginLabel = document.getElementById('loginLabel');
    if (CheckingEnteredLogin()) {
        loginLabel.style.display = 'none';
    } else {
        loginLabel.textContent = 'Введите норм логин пж';
        loginLabel.style.display = 'block';
    }
});

document.getElementById('pass').addEventListener('input', function() {
    var loginLabel = document.getElementById('passLabel');
    if (CheckingEnteredPassword()) {
        loginLabel.style.display = 'none';
    } else {
        loginLabel.textContent = 'Введите норм пароль пж';
        loginLabel.style.display = 'block';
    }
});

const SendDataButton = document.getElementById('sign-in');
SendDataButton.addEventListener('click', () => {
    var login = document.getElementById('login');
    var password = document.getElementById('pass');
    if (CheckingEnteredLogin()) 
        SendDataToServer({login: login.value.trim(), password: password.value.trim()}) 
}
)

async function SendDataToServer(enteredData) {
    const URL = `${window.location.origin}/script/send_entered_data`;
    const data = JSON.stringify({data: enteredData})
    window.location.href = '../../index.html';
    console.log(data)
    const config = {
        headers: {'Content-Type': 'application/json'}
    }
    const response = await axios.post(URL, data, config)
    .then(response => {
        if (response) {
            window.location.href = 'index.html';
        }
        console.log(response.data)
    })
    .catch(error => {
        console.error(error)})
    return response
}