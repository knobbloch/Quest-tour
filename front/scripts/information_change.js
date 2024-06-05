let surname_inf = document.getElementById("surname"),
  name_inf = document.getElementById("name"),
  midname_inf = document.getElementById("midname"),
  city_inf = document.getElementById("city"),
  department_inf = document.getElementById("department"),
  login_inf = document.getElementById("login");

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

  async function sendInfToServer(surname,name,midname,city) { 
    const URL = `${window.location.origin}/script/edit_user_self`;
    axios({
      method: 'put',
      url: URL,
      data: {namep: name,surname: surname,thirdname: midname,city: city},
    })
    .then(response => {
      console.log(response.data)
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
  department_inf.textContent=Inf.division;
  login_inf.textContent=Inf.email;
}

function change_inf(){
  sendInfToServer(surname_inf.value,name_inf.value,midname_inf.value,city_inf.value);
}

function back(){
  window.location.href = "http://127.0.0.1:8000/account.html"
}

// Часть админа

function admin_back(){
  window.location.href = "http://127.0.0.1:8000/admin_account.html"
}

async function admin_sendInfToServer(surname,name,midname,city,department) { 
  const URL = `${window.location.origin}/script/edit_user_self`;
  axios({
    method: 'put',
    url: URL,
    data: {namep: name,surname: surname,thirdname: midname,division: department,city: city},
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
  }

function admin_change_inf(){
  sendInfToServer(surname_inf.value,name_inf.value,midname_inf.value,city_inf.value,department_inf.value);
}

document.addEventListener('DOMContentLoaded', load_inf())