let error = document.querySelector(".title-error");

let surname_inf = document.getElementById("surname"),
  name_inf = document.getElementById("name"),
  midname_inf = document.getElementById("midname"),
  city_inf = document.getElementById("city"),
  department_inf = document.getElementById("department"),
  login_inf = document.getElementById("login");

  async function sendInfToServer(login,surname,name,midname,city,department) { 
    const URL = `${window.location.origin}/script/add_user`;
    axios({
      method: 'post',
      url: URL,
      data: {
        email: login,
        namep: name,
        surname: surname,
        thirdname: midname,
        division: department,
        city: city
      }
    })
    .then(response => {
      console.log(response.data)
      if(response.data['status']!=201){
        document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
      }
      document.getElementById("exit-modal-ok").classList.add("open")
    })
    .catch(error => {
      console.log(error)
    })
  }

function change_inf(){
  if(login_inf.value!="" && surname_inf.value!="" && name_inf.value!=""){
    error.textContent="";
    sendInfToServer(login_inf.value,surname_inf.value,name_inf.value,midname_inf.value,city_inf.value,department_inf.value);
  }else{
    error.textContent="*Заполните все обязательные поля!";
  }
}

function back(){
  window.location.reload();
  //window.location.href = "http://127.0.0.1:8000/admin_users_account.html"
}