
let email = "123"
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
  //window.location.href = "http://127.0.0.1:8000/map.html";
}

function users_inf_change(){
  window.location.href = "http://127.0.0.1:8000/admin_users_information_change.html";
}

//для модального окна
function  close_modal() {
  document.getElementById("exit-modal").classList.remove("open")
}

function  del_user() {
  deleteUser();
  back();
}

document.addEventListener('DOMContentLoaded', load_inf())
