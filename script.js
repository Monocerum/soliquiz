document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreen");

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("fade-out");

        setTimeout(() => {
            box.style.display = "none";
          }, 1000);
    })

    
})