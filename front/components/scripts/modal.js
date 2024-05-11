// Функция открывает модальное окно при нажатии на кнопку
document.querySelector("open-modal-btn").addEventListener("click",function(){
    document.getElementById("exit-modal").classList.add("open")
})

// Функция закрывает модальное окно при нажатии на кнопку "НЕТ"
document.getElementById("No-btn").addEventListener("click",function(){
    document.getElementById("exit-modal").classList.remove("open")
})

