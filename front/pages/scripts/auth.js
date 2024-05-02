var email;
var password;

document.getElementById("sign-in-btn").addEventListener("click", function() {
    email = document.getElementById("email").value;
    password = document.getElementById("pass").value;
    console.log(email, password)
    SendDataToServer(email)
});


async function SendDataToServer(enteredData) {
    const URL = `${window.location.origin}/auth/login-cookie`;
    const data = JSON.stringify({data: enteredData})
    const config = {
        // headers: {'Content-Type': 'application/json', "login": "Finn", "password": "Williams"}
    }
    axios({
        method: 'post',
        url: URL,
        withCredentials: true,
        data: JSON.stringify({
        // "login": "Finn",
        // "pass": "Williams"
        }),
        auth: { 
            username: 'username', 
            password: 'password' 
        },
        headers: config.headers
    }).then(response => {
        if (!response.ok) {
            throw new Error("Ошибка");
        }
        return response.json();
    })
    .then(data => {
        console.log("Все крута", data);
    })
    .catch(error => {
        const errorMessageDiv = document.getElementById("error-message");
        errorMessageDiv.style.display = "block";
    });
};
