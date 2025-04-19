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
            question: "Which of the following is NOT one of the three main goals of information security?",
            choices: [
                "Confidentiality",
                "Integrity",
                "Accessibility",
                "Availability"
            ],
            answer: "Accessibility"
        },
        {
            number: 2,
            question: "What encryption machine was used by the Germans during World War II?",
            choices: [
                "Turing Machine",
                "Enigma Machine",
                "Colossus Machine",
                "ARPANET"
            ],
            answer: "Enigma Machine"
        },
        {
            number: 3,
            question: "The protection of information and its critical elements, including the systems and hardware that use, store, and transmit that information",
            choices: [
                "Cybersecurity",
                "Data Privacy",
                "Information Security",
                "Network Security"
            ],
            answer: "Information Security"
        },
        {
            number: 4,
            question: "The information is safe from accidental or international disclosure.",
            choices: [
                "Confidentiality",
                "Integrity",
                "Accessibility",
                "Availability"
            ],
            answer: "Confidentiality"
        },
        {
            number: 5,
            question: "Keep data and resources available for authorized us.",
            choices: [
                "Availability Models",
                "Data Privacy",
                "Network Security",
                "Accessibility"
            ],
            answer: "Availability Models"
        },
        {
            number: 6,
            question: "Anything that can exploit a vulnerability, intentionally or accidentally, and obtain, damage, or destroy an asset.",
            choices: [
                "Threat",
                "Vulnerability",
                "Attack",
                "Software piracy"
            ],
            answer: "Threat"
        },
        {
            number: 7,
            question: "One that does not affect any system, although information is obtained.",
            choices: [
                "Active Attack",
                "Passive attack",
                "Attack",
                "Software piracy"
            ],
            answer: "Active Attack"
        },
        {
            number: 8,
            question: "Weaknesses or gaps in a security program that can be exploited by threats to gain unauthorized access to an asset.",
            choices: [
                "Threat",
                "Vulnerability",
                "Attack",
                "Software piracy"
            ],
            answer: "Vulnerability"
        },
        {
            number: 9,
            question: "Unlawful use or duplication of software-based intellectual property.",
            choices: [
                "Threat",
                "Vulnerability",
                "Attack",
                "Software piracy"
            ],
            answer: "Software piracy"
        },
        {
            number: 10,
            question: "The ownership of ideas and control over the tangible or virtual representation of those ideas.",
            choices: [
                "Threat",
                "Vulnerability",
                "Intellectual Propertyt",
                "Software piracy"
            ],
            answer: "Intellectual Property"
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
