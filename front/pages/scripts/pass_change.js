let title_inf = document.getElementById("title"),
  new_pass_inf = document.getElementById("new_pass"),
  agein_pass_inf = document.getElementById("agein_pass");

async function getInf() {
  const URL = `${window.location.origin}/script/get_user_self`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function load_inf(){
  const Inf = await getInf();
  title_inf.textContent=Inf.surname +" "+Inf.namep+" "+Inf.thirdname;
}

async function sendPassToServer(new_pass) { 
  const URL = `${window.location.origin}/script/change_password?new_password=${new_pass}`;
  try {
    const response = await axios.put(URL);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
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
        //sendPassToServer(new_pass_inf.value);
        return true;
      }
    }
}

function back(){
  history.back();
}

document.addEventListener('DOMContentLoaded', load_inf())