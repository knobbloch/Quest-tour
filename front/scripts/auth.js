var email;
var password;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var continue1 = urlParams.get('continue')
console.log(continue1)

document.getElementById("sign-in-btn").addEventListener("click", function() {
    email = document.getElementById("email").value;
    password = document.getElementById("pass").value;
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
        const data = await response.data;
        if (data.result) {
            if (continue1 != null && continue1 != "/lecture" && continue1 != "/test" && continue1 != "/test_result" && continue1 != "/practice_answer" && continue1 != "/practice"){
                window.location.href = 'http://127.0.0.1:8000' + continue1;
            }
            else{
                 window.location.href = 'http://127.0.0.1:8000/task_list';
            }
        }
        else {
            if (continue1 != null && continue1 != "/lecture" && continue1 != "/test" && continue1 != "/test_result" && continue1 != "/practice_answer" && continue1 != "/practice"){
                window.location.href = 'http://127.0.0.1:8000' + continue1;
            }
            else{
                 window.location.href = 'http://127.0.0.1:8000/map';
            }
        }
        
        document.getElementById("error-message").style.display = "none";

        return data;
    } catch (error) {
        console.error(error);
        document.getElementById("error-message").style.display = "block";
    }
}
