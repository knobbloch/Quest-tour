var email;
var password;

document.getElementById("sign-in-btn").addEventListener("click", function() {
    email = document.getElementById("email").value;
    password = document.getElementById("pass").value;
    console.log(email, password)
    SendDataToServer(email, password);
});


async function SendDataToServer(email, password) {
    const URL = `${window.location.origin}/auth/login-cookie`;
    try {
        const response = await axios({
            method: 'post',
            url: URL,
            auth: {
                username: email,
                password: password
            }
        });
        
        if (response.status < 200 || response.status >= 300) {
            throw new Error("Ошибка");
        }

        const data = await response.data;
        window.location.href = 'http://127.0.0.1:8000/pages/map.html';
        document.getElementById("error-message").style.display = "none";

        return data;
    } catch (error) {
        console.error(error);
        document.getElementById("error-message").style.display = "block";
    }
}
