let new_pass_inf = document.getElementById("pass");

let error = document.querySelector(".title-error");
let hide_btn = document.querySelector(".pass-btn");

function hide_pass(){
    if(new_pass_inf.type=="password"){
        new_pass_inf.type="text";
        hide_btn.style.backgroundImage = 'url(svg/Buttons/OpenPass.svg)';
    } else{
        new_pass_inf.type="password";
        hide_btn.style.backgroundImage = 'url(svg/Buttons/HidePass.svg)';
    }
}
