document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreen");
    const gameItem = document.querySelector(".game-item");
    const timerElement = document.querySelector(".timer-js");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".previous");
    
    let currentQ = 0;
    let score = 0;
    let selectedChoice = null;
    let timerInterval;
    const timePerQuestion = 120;
    let timeRemaining = timePerQuestion;

    const quizContents = [
        {
            number: 1,
            question: "What is the powerhouse of the cell?",
            choices: [
                "Midoriya",
                "Entamoeba histolytica",
                "Mitochondria",
                "Tralalero Tralala"
            ],
            answer: "Mitochondria"
        },
        {
            number: 2,
            question: "What is the mathematical symbol for pi (π) approximately equal to?",
            choices: [
                "69",
                "911",
                "1738",
                "3.14"
            ],
            answer: "3.14"
        },
        {
            number: 3,
            question: "Who was the leader of the Katipunan, the revolutionary society that fought against Spanish rule?",
            choices: [
                "Kharl Velasco",
                "Andrés Bonifacio",
                "Michael Velasques",
                "Emilio Aguinaldo"
            ],
            answer: "Andrés Bonifacio"
        },
        {
            number: 4,
            question: "Who is the youngest member of BINI?",
            choices: [
                "Aiah",
                "Sheena",
                "Stacey",
                "Mikha",
            ],
            answer: "Sheena"
        },
        {
            number: 5,
            question: "What is the smallest country in the world by land area?",
            choices: [
                "Monaco",
                "Vatican City",
                "San Marino",
                "Antipolo"
            ],
            answer: "Vatican City"
        },
        {
            number: 6,
            question: "Which famous inventor is known for inventing the light bulb?",
            choices: [
                "Franklin Miano",
                "Nikola Tesla",
                "Thomas Edison",
                "Jordan Poole"
            ],
            answer: "Thomas Edison"
        },
        {
            number: 7,
            question: "What is the hardest natural substance on Earth?",
            choices: [
                "Vibranium",
                "Puso niya",
                "Diamond",
                "Rock"
            ],  
            answer: "Diamond"
        },
        {
            number: 8,
            question: "What is the largest mammal in the world?",
            choices: [
                "Blue Whale",
                "Chimpanzini Bananini",
                "Bombardino Crocodino",
                "Tung tung tung tung sahur"
            ],
            answer: "Blue Whale"
        },
        {
            number: 9,
            question: "Which fictional city is the home of Batman?",
            choices: [
                "Star City",
                "BGC",
                "Antipolo City",
                "Gotham"
            ],
            answer: "Gotham"
        },
        {
            number: 10,
            question: "How many sides does a dodecagon have?",
            choices: [
                "10",
                "17",
                "12",
                "69"
            ],
            answer: "12"
        }
    ];

    // Tracks answers
    const answers = new Array(quizContents.length).fill(null);

    function startTimer() {
        clearInterval(timerInterval);
        timeRemaining = timePerQuestion;

        timerInterval = setInterval(() => {
            timeRemaining--;
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert("Time's up for this question!");
                nextBtn.click();
            }
        }, 1000);
    }

    function loadQuestion(index) {
        const questionContent = quizContents[index];
        const choicesContent = document.querySelector(".choices");
    
        selectedChoice = answers[index];
        document.querySelector(".question-number").textContent = `QUESTION NO. ${questionContent.number}`;
        document.querySelector(".question").textContent = questionContent.question;
    
        choicesContent.innerHTML = "";
    
        nextBtn.disabled = true;

        questionContent.choices.forEach(choiceText => {
            const choiceContainer = document.createElement("div");
            choiceContainer.classList.add("choice-container");
    
            const choiceContent = document.createElement("p");
            choiceContent.classList.add("choice");
            choiceContent.textContent = choiceText;
    
            choiceContainer.appendChild(choiceContent);
            choicesContent.appendChild(choiceContainer);
    
            if (selectedChoice === choiceText) {
                choiceContainer.classList.add("selected");
                nextBtn.disabled = false; // Enables NEXT if an answer is already selected.
            }
            choiceContainer.addEventListener("click", () => {
                document.querySelectorAll(".choice-container").forEach(c => c.classList.remove("selected"));
                choiceContainer.classList.add("selected");
                selectedChoice = choiceText;
                answers[index] = selectedChoice;
    
                if (selectedChoice === questionContent.answer) {
                    score++;
                }

                nextBtn.disabled = false;

                setTimeout(() => {
                    if (currentQ < quizContents.length - 1) {
                        currentQ++;
                        loadQuestion(currentQ);
                    } else {
                        clearInterval(timerInterval);
                        endQuiz();
                    }
                }, 500);
            });
        });
    
        startTimer();
    }

    nextBtn.addEventListener("click", () => {
        if (!answers[currentQ]) {
            alert("Please select an answer before proceeding.");
            return;
        }

        if (currentQ < quizContents.length - 1) {
            currentQ++;
            loadQuestion(currentQ);
        } else {
            clearInterval(timerInterval);
            endQuiz();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentQ > 0) {
            currentQ--;
            loadQuestion(currentQ);
        }
    });

    function endQuiz() {
        clearInterval(timerInterval);
        alert(`Quiz complete!\nYour score: ${score}/${quizContents.length}`);
    }

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("fade-out");
        startScreen.style.display = "none";
        gameItem.style.display = "block";

        loadQuestion(currentQ);
    });
});
