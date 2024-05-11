async function getPercent() {
    const URL = `${window.location.origin}/script/course_percent_self`;
    try {
      const response = await axios.get(URL);
      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

document.addEventListener("DOMContentLoaded", async function(){
    let number = document.getElementById("number");
    let percentProgress = document.querySelector(".circle");
    const end =  await getPercent();
    let speed = 1500/end;
    percentProgress.style.setProperty('--progress', 1065 - (10.65 * end));
    let counter = 0;
    setInterval(()=>{
        if (counter == end){
            clearInterval();
        }else{
            counter ++;
            number.innerHTML = counter + "%";
        }
    }, speed);
    let done = document.getElementById("first");
    let not_done = document.getElementById("second");
    done.innerHTML = `Выполненных заданий: <b style="color: #EC1C24">${end}%</b>`;
    not_done.innerHTML = `Осталось выполнить: <b style="color: #EC1C24">${100-end}%</b>`;

})

