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
            question: "It is a computer program and all documentation necessary to develop, install, use and maintain a complete system.",
            choices: [
                "Software",
                "Hardware",
                "System Architecture",
                "Engineering"
            ],
            answer: "Software"
        },
        {
            number: 2,
            question: "Technological and managerial discipline concerned with systematic production and maintenance of software products–developed on time",
            choices: [
                "Computer Engineer",
                "Software Engineering",
                "Scrum Master",
                "Technological Engineering"
            ],
            answer: "Software Engineering"
        },
        {
            number: 3,
            question: "Which does not belong to the Software Development Myths.",
            choices: [
                "Customer Myths",
                "Practitioner Myths",
                "Cost Predictability",
                "Management Myths"
            ],
            answer: "Cost Predictability"
        },
        {
            number: 4,
            question: "In the generic view of software engineering, what stage does includes designing phase, the coding and implementation, and testing.",
            choices: [
                "Specification Stage",
                "Stage 3: Maintenance",
                "Requirement Phase",
                "Stage 2: Implementation"
            ],
            answer: "Stage 2: Implementation"
        },
        {
            number: 5,
            question: "In the generic view of software engineering, in what phase does it provide the definition of the information domain and function of the software.",
            choices: [
                "Specification Stage",
                "Stage 3: Maintenance",
                "Requirement Phase",
                "Stage 2: Implementation"
            ],
            answer: "Requirement Phase"
        },
        {
            number: 6,
            question: "In SDLC or Waterfall Model, in what process does Analysis Design occur?",
            choices: [
                "Modeling",
                "Planning",
                "Deployment",
                "Construction"
            ],
            answer: "Modeling"
        },
        {
            number: 7,
            question: "A process consisting of a set of coordinated and controlled activities undertaken to achieve an objective conforming to specific requirements.",
            choices: [
                "Project Management",
                "Project",
                "System Structure",
                "Software Development Life Cycle"
            ],
            answer: "Project"
        },
        {
            number: 8,
            question: "A phase in project management where focuses on defining clear, discrete activities and the work needed to complete each activity within a single project.",
            choices: [
                "Executing the Project",
                "Planning the Project",
                "Initiating the Project",
                "Controlling and Monitoring the Project"
            ],
            answer: "Planning the Project"
        },
        {
            number: 9,
            question: "A phase in project management where it focuses on putting the plans developed in project initiation phase and planning phase into action.",
            choices: [
                "Closing down the Project",
                "Planning the Project",
                "Initiating the Project",
                "Executing the Project"
            ],
            answer: "Executing the Project"
        },
        {
            number: 10,
            question: "One of the phases in project management focusing on bringing the project to an end.",
            choices: [
                "Initiating the Project",
                "Planning the Project",
                "Closing down the Project",
                "Executing the Project"
            ],
            answer: "Closing down the Project"
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
