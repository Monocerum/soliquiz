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
            question: "What is the primary goal of Artificial Intelligence?",
            choices: [
                "To mimic human emotions",
                "To create intelligent entities that can reason and act rationally",
                "To replace human workers in all industries",
                "To design aesthetically pleasing robots"
            ],
            answer: "To create intelligent entities that can reason and act rationally"
        },
        {
            number: 2,
            question: "Which of the following is NOT one of the four approaches to defining AI",
            choices: [
                "Thinking humanly",
                "Acting rationally",
                "Thinking creatively",
                "Acting humanly"
            ],
            answer: "Thinking creatively"
        },
        {
            number: 3,
            question: "What does the Turing Test aim to evaluate?",
            choices: [
                "A computer's ability to solve mathematical problems",
                "A computer's ability to produce artistic works",
                "A computer's ability to exhibit intelligent behavior indistinguishable from a human",
                "A computer's speed in processing data"
            ],
            answer: "A computer's ability to exhibit intelligent behavior indistinguishable from a human"
        },
        {
            number: 4,
            question: "Which capability is NOT required for passing the Turing Test?",
            choices: [
                "Natural language processing",
                "Knowledge representation",
                "Machine learning",
                "Physical simulation of a human body"
            ],
            answer: "Physical simulation of a human body"
        },
        {
            number: 5,
            question: "What is meant by ""rationality"" in AI?",
            choices: [
                "Acting based on emotions rather than logic",
                "Doing the right thing based on available information",
                "Mimicking human rational behaviors",
                "Achieving the best result in all tasks based on goals"
            ],
            answer: "Doing the right thing based on available information"
        },
        {
            number: 6,
            question: "A chess environment is best described as:",
            choices: [
                "Fully observable and stochastic",
                "Partially observable and deterministic",
                "Fully observable and deterministic",
                "Partially observable and stochastic"
            ],
            answer: "Fully observable and deterministic"
        },
        {
            number: 7,
            question: "Which discipline has contributed theories of reasoning and learning to AI?",
            choices: [
                "Sociology",
                "Philosophy",
                "Biology",
                "Criminology"
            ],
            answer: "Philosophy"
        },
        {
            number: 8,
            question: "What distinguishes rational agents from human-centered approaches in AI?",
            choices: [
                "Rational agents focus solely on replicating human thought processes",
                "Rational agents aim to pass the Turing Test exclusively",
                "Rational agents are limited to solving mathematical problems only",
                " Rational agents prioritize achieving ideal outcomes over mimicking humans"
            ],
            answer: " Rational agents prioritize achieving ideal outcomes over mimicking humans"
        },
        {
            number: 9,
            question: "What does PEAS stand for in AI agent design?",
            choices: [
                "Performance, Efficiency, Actuators, Sensors",
                "Planning, Environment, Actions, Sensors",
                "Performance, Environment, Actuators, Sensors",
                "Perception, Environment, Actions, State"
            ],
            answer: "Performance, Environment, Actuators, Sensors"
        },
        {
            number: 10,
            question: "Which type of agent uses condition-action rules to respond to current percepts?",
            choices: [
                "Utility-based agent",
                "Simple reflex agent",
                "Model-based agent",
                "Learning agent"
            ],
            answer: "Simple reflex agent"
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
