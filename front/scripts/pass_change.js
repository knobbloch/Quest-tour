let title_inf = document.getElementById("title"),
  new_pass_inf = document.getElementById("new_pass"),
  agein_pass_inf = document.getElementById("agein_pass");
  old_pass_inf = document.getElementById("old_pass");

let error = document.querySelector(".title-error");
let hide_btn = document.querySelector(".pass-btn");

function add_error(obj){
  obj.classList.remove("error");
  void obj.offsetWidth;
  obj.classList.add("error");
}

function latin_check(obj){
  if(/[А-Яа-яЁё]/.test(obj.value)){
    add_error(obj);
    return false;
  }else{
    del_error(obj);
    return true;
  }
}

function del_error(obj){
  obj.classList.remove("error");
}

async function getInf() {
  const URL = `${window.location.origin}/script/get_user_self`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function load_inf(){
  const Inf = await getInf();
  title_inf.textContent=Inf.surname +" "+Inf.namep+" "+Inf.thirdname;
}

async function sendPassToServer(new_pass,old_pass_inf) { 
  const URL = `${window.location.origin}/script/change_password?new_password=${new_pass}&old_password=${old_pass_inf.value}`;
  try {
    const response = await axios.put(URL);

    if(response.data['status']==403){
      error.textContent="*Старый пароль введен неверно!";
      add_error(old_pass_inf);
      return
    }

    if(response.data['status']!=202){
      document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
    }
    del_error(old_pass_inf);
    document.getElementById("exit-modal-ok").classList.add("open")

  } catch (error) {
    console.log(error);
  }
}

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
    if(new_pass_inf.value.length<8){
      error.textContent="*Пароль должен содержать не менее 8 символов!";
      add_error(new_pass_inf);
      return false;
    }

    if(!latin_check(new_pass_inf) * !latin_check(agein_pass_inf)){
      error.textContent="*Пароль должен содержать только латинские буквы, цифры и специальные символы !";
      return false;
    }
    
    if(new_pass_inf.value!=agein_pass_inf.value){
      error.textContent="*Пароли должны совпадать!";
      add_error(new_pass_inf);
      add_error(agein_pass_inf);
      return false;
    }

    del_error(new_pass_inf);
    del_error(agein_pass_inf);
    error.textContent="";
    sendPassToServer(new_pass_inf.value,old_pass_inf);
    return true;
}

function back(){
  window.location.href = "http://127.0.0.1:8000/account"
}

function admin_back(){
  window.location.href = "http://127.0.0.1:8000/admin_account"
}

document.addEventListener('DOMContentLoaded', load_inf())