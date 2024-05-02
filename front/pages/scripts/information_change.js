let surname_inf = document.getElementById("surname"),
  name_inf = document.getElementById("name"),
  midname_inf = document.getElementById("midname"),
  city_inf = document.getElementById("city"),
  department_inf = document.getElementById("department"),
  login_inf = document.getElementById("login");

function load_inf(surname,name,midname,city,department,login){
  surname_inf.value=surname;
  name_inf.value=name;
  midname_inf.value=midname;
  city_inf.value=city;
  department_inf.textContent=department;
  login_inf.textContent=login;
}

function change_inf(){
  let information = [surname_inf.value,name_inf.value,midname_inf.value,city_inf.value,department_inf.textContent,login_inf.textContent];
  console.log(information);
}

document.addEventListener('DOMContentLoaded', load_inf("Фёдоровых","Михаил"," Иванович","Пермь","Стажер","Fedorovykh.MI@parmalogica.ru"))