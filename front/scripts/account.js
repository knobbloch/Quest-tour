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

let title_inf = document.getElementById("title"),
  login_inf = document.getElementById("login"),
  work_inf = document.getElementById("work"),
  city_inf = document.getElementById("city");

async function load_inf(){
  const Inf = await getInf()
  title_inf.textContent=Inf.surname +" "+Inf.namep+" "+Inf.thirdname;
  login_inf.value=Inf.email;
  work_inf.value=Inf.division;
  city_inf.value=Inf.city;
}

function back(){
  window.location.href = "http://127.0.0.1:8000/map.html";
}

function inf_change(){
  window.location.href = "http://127.0.0.1:8000/information_change.html";
}

function pass_change(){
  window.location.href = "http://127.0.0.1:8000/pass_change.html";
}

function admin_back(){
  //window.location.href = "http://127.0.0.1:8000/admin_map.html";
}

function admin_inf_change(){
  window.location.href = "http://127.0.0.1:8000/admin_information_change.html";
}

function admin_pass_change(){
  window.location.href = "http://127.0.0.1:8000/admin_pass_change.html";
}

document.addEventListener('DOMContentLoaded', load_inf())