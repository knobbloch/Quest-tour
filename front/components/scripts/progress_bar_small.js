
let end = 0;
document.addEventListener("DOMContentLoaded", function(){
    let number = document.getElementById("number");
    let percentProgress = document.querySelector(".circle");
    let speed = 1500/end;
    percentProgress.style.setProperty('--progress', 942 - (9.42 * end));
    let counter = 0;
    setInterval(()=>{
        if (counter == end){
            clearInterval();
        }else{
            counter ++;
            if (counter==60){
                percentProgress.style.setProperty('stroke', `#369381`);
                number.style.setProperty('color', '#369381');
            }
            number.innerHTML = counter + "%";
        }
    }, speed);
})

