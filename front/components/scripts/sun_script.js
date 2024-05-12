let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value");

let progressStartValue = 0,
    progressEndValue = 0,
    speed = 30;

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