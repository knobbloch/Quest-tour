let orderc = 0,
  title = document.getElementById("title"),
  description = document.getElementById("description");
function back(){
  //window.location.href = 'http://127.0.0.1:8000/map.html';
  window.location.reload();
}

async function send_practice(title,description,orderc,testornot){
  const URL = `${window.location.origin}/script/create_practice`;
  axios({
    method: 'post',
    url: URL,
    data: {title: title,description: description,orderc: orderc,testornot: testornot},
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

function create_practice(){
  send_practice(title.value,description.value,orderc,false)
}