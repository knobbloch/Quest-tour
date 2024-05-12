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

  

let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value");

async function setProgress() {
    let progressStartValue = 0,
        speed = 30;

    const progressEndValue = await getPercent()

    setInterval(() => {
      if (progressStartValue == progressEndValue){
           clearInterval();
       }
       else{
           progressStartValue++;
   
           progressValue.textContent = `${progressStartValue}%`
           circularProgress.style.background = `conic-gradient(#F69933 ${progressStartValue * 3.6}deg, #ffe0aadc 0deg)`
       }
   }, speed);
}

setProgress();