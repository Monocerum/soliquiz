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

document.addEventListener("DOMContentLoaded", () => {
    const totalScoreElement = document.getElementById("totalScore");
    const scoreTableBody = document.querySelector(".score-table tbody");

    const allScores = JSON.parse(localStorage.getItem("soliquizScores")) || {};
    let totalPoints = 0;

    scoreTableBody.innerHTML = "";

    Object.entries(allScores).forEach(([subject, scoreStr]) => {
        const points = parseInt(scoreStr);
        totalPoints += points;

        const row = document.createElement("tr");
        row.classList.add("score-row");

        row.innerHTML = `
            <td class="quiz-name">${subject}</td>
            <td class="quiz-score">${scoreStr}</td>
        `;

        scoreTableBody.appendChild(row);
    });

    totalScoreElement.textContent = totalPoints;
});