var email;
var password;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var continue1 = urlParams.get('continue')
console.log(continue1)

document.getElementById("sign-in-btn").addEventListener("click", function() {
    email = document.getElementById("email").value;
    password = document.getElementById("pass").value;
    console.log(email, password)
    SendDataToServer(email, password);
});


async function SendDataToServer(email, password) {
    const URL = `${window.location.origin}/script/login-cookie`;
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
        console.log(continue1)
        console.log(urlParams)
        const data = await response.data;
        if (continue1 != null && continue1 != "/lecture.html" && continue1 != "/test.html" && continue1 != "/test_result.html" && continue1 != "/practice_answer.html" && continue1 != "/practice.html"){
            window.location.href = 'http://127.0.0.1:8000' + continue1;
        }
        else{
             window.location.href = 'http://127.0.0.1:8000/map.html';
        }
        document.getElementById("error-message").style.display = "none";

        return data;
    } catch (error) {
        console.error(error);
        document.getElementById("error-message").style.display = "block";
    }
}
