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
  window.location.href = "http://127.0.0.1:8000/map";
}

function inf_change(){
  window.location.href = "http://127.0.0.1:8000/information_change";
}

function pass_change(){
  window.location.href = "http://127.0.0.1:8000/pass_change";
}

function admin_back(){
  window.location.href = "http://127.0.0.1:8000/task_list";
}

function admin_inf_change(){
  window.location.href = "http://127.0.0.1:8000/admin_information_change";
}

function admin_pass_change(){
  window.location.href = "http://127.0.0.1:8000/admin_pass_change";
}

document.addEventListener('DOMContentLoaded', load_inf())