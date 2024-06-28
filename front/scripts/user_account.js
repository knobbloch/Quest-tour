const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let email = urlParams.get('email');

async function getInf() {
  const URL = `${window.location.origin}/script/get_user?target_email=${email}`;
  try {
    const response = await axios.get(URL);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser() {
  const URL = `${window.location.origin}/script/delete_user?target_email=${email}`;
  axios({
    method: 'delete',
    url: URL
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
}

async function sendPassToServer() { 
  const URL = `${window.location.origin}/script/set_default_password?target=${email}`;
  try {
    const response = await axios.put(URL);

    if(response.data['status']!=202){
      document.getElementById("modal__box-text").textContent = "Возникла ошибка :( Попробуйте ещё раз";
    }
    document.getElementById("exit-modal-ok").classList.add("open")

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
  window.location.href = "http://127.0.0.1:8000/user_list";
}

function users_inf_change(){
  window.location.href = "http://127.0.0.1:8000/admin_user_information_change?email="+email;
}

//для модального окна

function  open_modal_del() {
  document.getElementById("del-modal").classList.add("open")
}
function  open_modal_pass() {
  document.getElementById("drop-modal").classList.add("open")
}

function  close_modal_del() {
  document.getElementById("del-modal").classList.remove("open")
}

function  close_modal_pass() {
  document.getElementById("drop-modal").classList.remove("open")
}

function  close_modal_ok() {
  document.getElementById("exit-modal-ok").classList.remove("open")
}


function  del_user() {
  deleteUser();
  back();
}

function  pass_drop() {
  close_modal_pass();
  sendPassToServer();
}

document.addEventListener('DOMContentLoaded', load_inf())
