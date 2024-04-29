let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value");

let progressStartValue = 0,
    progressEndValue = 50,
    speed = 30;

let progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`
    circularProgress.style.background = `conic-gradient(#F69933 ${progressStartValue * 3.6}deg, #ffe0aadc 0deg)`

    if (progressStartValue == progressEndValue){
        clearInterval(progress);
    }

}, speed);