var email;
var password;

document.getElementById("sign-in-btn").addEventListener("click", function() {
    email = document.getElementById("email").value;
    password = document.getElementById("pass").value;
    console.log(email, password)
    SendDataToServer(email)
});


async function SendDataToServer(email, password) {
    const URL = `${window.location.origin}/auth/login-cookie`;
    console.log(email, password)
    axios({
        method: 'post',
        url: URL,
        auth: {
            username: email,
            password: password
        }
    })
    .then(response => {
        if (response.status < 200 || response.status >= 300) {
            throw new Error("Ошибка");
        }
        return response.json();
        
    })
    .catch(error => {
        const errorMessageDiv = document.getElementById("error-message");
        errorMessageDiv.style.display = "block";
        console.error(error)})
};
