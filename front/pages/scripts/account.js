let title_inf = document.getElementById("title"),
  login_inf = document.getElementById("login"),
  work_inf = document.getElementById("work"),
  city_inf = document.getElementById("city");

function load_inf(title,login,work,city){
  title_inf.textContent=title;
  login_inf.value=login;
  work_inf.value=work;
  city_inf.value=city;
}

document.addEventListener('DOMContentLoaded', load_inf("Фёдоровых Михаил Иванович","Fedorovykh.MI@parmalogica.ru","Стажер","Пермь"))