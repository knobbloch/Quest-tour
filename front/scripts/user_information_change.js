const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let email = urlParams.get('email');
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
    obj.classList.remove("error");
    void obj.offsetWidth;
    obj.classList.add("error");
    return false;
  };
} 

async function getInf() {
  const URL = `${window.location.origin}/script/get_user?target_email=${email}`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function sendInfToServer(surname,name,midname,city,department) { 
  const URL = `${window.location.origin}/script/edit_user?target_email=${email}`;
  axios({
    method: 'put',
    url: URL,
    data: {namep: name,surname: surname,thirdname: midname,division: department,city: city},
  })
  .then(response => {
    console.log(response.data)
    if(response.data['status']!=202){
      document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
    }
    document.getElementById("exit-modal-ok").classList.add("open")
  })
  .catch(error => {
    console.log(error)
  })
  }

async function load_inf(){
  const Inf = await getInf()
  surname_inf.value=Inf.surname;
  name_inf.value=Inf.namep;
  midname_inf.value=Inf.thirdname;
  city_inf.value=Inf.city;
  department_inf.value=Inf.division;
  department_inf.textContent=Inf.division;
  login_inf.textContent=Inf.email;
}

function change_inf(){
  if(no_num(surname_inf) * no_num(name_inf) * no_num(midname_inf) * no_num(city_inf) * no_num(department_inf)){
    error.textContent="";
    sendInfToServer(surname_inf.value,name_inf.value,midname_inf.value,city_inf.value,department_inf.value);
  }else{
    error.textContent="Заполните все поля корректно!";
  }
}

function back(){
  window.location.href = "http://127.0.0.1:8000/admin_user_account.html?email="+email;
}

document.addEventListener('DOMContentLoaded', load_inf())