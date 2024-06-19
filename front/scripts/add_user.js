let error = document.querySelector(".title-error");

let surname_inf = document.getElementById("surname"),
  name_inf = document.getElementById("name"),
  midname_inf = document.getElementById("midname"),
  city_inf = document.getElementById("city"),
  department_inf = document.getElementById("department"),
  login_inf = document.getElementById("login");

function destroy_gap(str){
  let i = 0;
  while(str[i] === " " && i < str.length){
    i++;
  }
  return str.slice(i);
}

function no_num(obj){
  obj.value = destroy_gap(obj.value);
  if(/^[A-Za-zА-Яа-яЁё\s]+$/.test(obj.value)){
    obj.classList.remove("error");
    return true;
  }else{
    obj.classList.add("error");
    return false;
  };
}

function is_email(obj){
  obj.value = destroy_gap(obj.value);
  if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(obj.value)){
    obj.classList.remove("error");
    return true;
  }else{
    obj.classList.add("error");
    return false;
  }
}

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
  if(no_num(surname_inf) * no_num(name_inf) * no_num(midname_inf) * no_num(city_inf) * no_num(department_inf)* is_email(login_inf)){
    error.textContent="";
    sendInfToServer(login_inf.value,surname_inf.value,name_inf.value,midname_inf.value,city_inf.value,department_inf.value);
  }else{
    error.textContent="Корректно заполните все поля!";
  }
}

function back(){
  window.location.href = "http://127.0.0.1:8000/user_list.html"
}