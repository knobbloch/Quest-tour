let title_inf = document.getElementById("title"),
  pass_inf = document.getElementById("pass"),
  new_pass_inf = document.getElementById("new_pass"),
  agein_pass_inf = document.getElementById("agein_pass");

function load_inf(title,pass){
  title_inf.textContent=title;
  pass_inf.value=pass;
}

let error = document.querySelector(".title-error");
let hide_btn = document.querySelector(".pass-btn");

function hide_pass(){
  if(new_pass_inf.type=="password"){
    new_pass_inf.type="text";
    agein_pass_inf.type="text";
    hide_btn.style.backgroundImage = 'url(svg/Buttons/OpenPass.svg)';
  }else{
    new_pass_inf.type="password";
    agein_pass_inf.type="password";
    hide_btn.style.backgroundImage = 'url(svg/Buttons/HidePass.svg)';
  }
}

function check_pass(){
    if(new_pass_inf.value.length<8 || agein_pass_inf.value.length<8){
      error.textContent="*Пароль должен содержать не менее 8 символов!";
      return false;
    }else{
      
      if(new_pass_inf.value!=agein_pass_inf.value){
        error.textContent="*Пароли должны совпадать!";
        return false;
      }else{
        error.textContent="";
        console.log(new_pass_inf.value);
        return true;
      }
    }
}

document.addEventListener('DOMContentLoaded', load_inf("Фёдоровых Михаил Иванович","Qwerty1"))