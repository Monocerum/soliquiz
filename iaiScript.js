document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreen");
    const gameItem = document.querySelector(".game-item");
    let score = 0;
    let selectedAnswers = [];
    let currentQ = 0;

    // Correct answers (index of the correct option for each question, 0-based)
    const correctAnswers = [1, 2, 2, 3, 0, 2, 1, 3, 2, 1];

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("fade-out");
        startScreen.style.display = "none";
        gameItem.style.display = "block";
        startTimer();
    });

    const quizContents = [
        {
            number: 1,
            question: "What is the primary goal of Artificial Intelligence?",
            choices: [
                "To mimic human emotions",
                "To create intelligent entities that can reason and act rationally",
                "To replace human workers in all industries",
                "To develop supercomputers with vast processing power"
            ]
        },
        {
            number: 2,
            question: "Which of the following is NOT one of the four approaches to defining AI?",
            choices: [
                "Thinking humanly",
                "Acting rationally",
                "Thinking creatively",
                "Acting humanly"
            ]
        },
        {
            number: 3,
            question: "What does the Turing Test aim to evaluate?",
            choices: [
                "A computer's ability to solve mathematical problems",
                "A computer's ability to produce artistic works",
                "A computer's ability to exhibit intelligent behavior indistinguishable from a human",
                "A computer's speed in processing data"
            ]
        },
        {
            number: 4,
            question: "Which capability is NOT required for passing the Turing Test?",
            choices: [
                "Natural language processing",
                "Knowledge representation",
                "Machine learning",
                "Physical simulation of a human body"
            ]
        },
        {
            number: 5,
            question: "What is meant by \"rationality\" in AI?",
            choices: [
                "Acting to achieve the best outcome or best expected outcome",
                "Processing information using logical rules only",
                "Imitating human decision-making processes",
                "Calculating the mathematical probability of all outcomes"
            ]
        },
        {
            number: 6,
            question: "A chess environment is best described as:",
            choices: [
                "Fully observable and stochastic",
                "Partially observable and deterministic",
                "Fully observable and deterministic",
                "Partially observable and stochastic"
            ]
        },
        {
            number: 7,
            question: "Which discipline has contributed theories of reasoning and learning to AI?",
            choices: [
                "Sociology",
                "Philosophy",
                "Biology",
                "Criminology"
            ]
        },
        {
            number: 8,
            question: "What distinguishes rational agents from human-centered approaches in AI?",
            choices: [
                "Rational agents focus solely on replicating human thought processes",
                "Rational agents aim to pass the Turing Test exclusively",
                "Rational agents are limited to solving mathematical problems only",
                "Rational agents prioritize achieving ideal outcomes over mimicking humans"
            ]
        },
        {
            number: 9,
            question: "What does PEAS stand for in AI agent design?",
            choices: [
                "Performance, Efficiency, Actuators, Sensors",
                "Planning, Environment, Actions, Sensors",
                "Performance, Environment, Actuators, Sensors",
                "Perception, Environment, Actions, State"
            ]
        },
        {
            number: 10,
            question: "Which type of agent uses condition-action rules to respond to current percepts?",
            choices: [
                "Utility-based agent",
                "Simple reflex agent",
                "Model-based agent",
                "Learning agent"
            ]
        }
    ];
    
    function loadQuestion(index) {
        // Make sure index is within bounds
        if (index < 0) {
            index = 0;
        } else if (index >= quizContents.length) {
            showResults();
            return;
        }
        
        const questionContent = quizContents[index];
        const choicesContent = document.querySelector(".choices");
    
        document.querySelector(".question-number").textContent = `QUESTION NO. ${questionContent.number}`;
        document.querySelector(".question").textContent = questionContent.question;
    
        choicesContent.innerHTML = "";
    
        questionContent.choices.forEach((choiceText, choiceIndex) => {
            const choiceContainer = document.createElement("div");
            choiceContainer.classList.add("choice-container");
    
            const choiceContent = document.createElement("p");
            choiceContent.classList.add("choice");
            choiceContent.textContent = choiceText;

            if (selectedAnswers[index] === choiceIndex) {
                choiceContainer.classList.add("selected");
            }
            
            choiceContainer.appendChild(choiceContent);
            choicesContent.appendChild(choiceContainer);
            
            
            choiceContainer.addEventListener("click", () => {
                document.querySelectorAll(".choice-container").forEach(c => {
                    c.classList.remove("selected");
                    c.classList.remove("active");
                });
                
                
                choiceContainer.classList.add("selected");
                choiceContainer.classList.add("active");
                
                
                selectedAnswers[index] = choiceIndex;

                if (choiceIndex === correctAnswers[index]) {
                    score++;
                }
                
                
                document.getElementById(`Q${index + 1}`).parentElement.classList.add("answered");
                
                
                setTimeout(() => {
                    if (index < quizContents.length - 1) {
                        currentQ++;
                        loadQuestion(currentQ);
                    } else {
                        showResults();
                    }
                }, 1000);
            });

            choiceContainer.addEventListener("mousedown", () => {
                choiceContainer.classList.add("clicking");
            });

            choiceContainer.addEventListener("mouseup", () => {
                choiceContainer.classList.remove("clicking");
            });

            choiceContainer.addEventListener("mouseleave", () => {
                choiceContainer.classList.remove("clicking");
            });
        });
        
        document.querySelector(".previous").style.visibility = index === 0 ? "hidden" : "visible";
        document.querySelector(".next").style.visibility = index === quizContents.length - 1 ? "hidden" : "visible";
        
        updateQuestionSlider(index);
    }

    function updateQuestionSlider(currentIndex) {
        document.querySelectorAll('.question-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const currentQuestionItem = document.querySelector(`.question-item:nth-child(${currentIndex + 1})`);
        if (currentQuestionItem) {
            currentQuestionItem.classList.add('active');
        }

        const questionsContainer = document.querySelector('.questions-container');
        const activeQuestion = document.querySelector('.question-item.active');
        
        if (questionsContainer && activeQuestion) {
            const containerWidth = questionsContainer.offsetWidth;
            const activeQuestionOffset = activeQuestion.offsetLeft;
            const activeQuestionWidth = activeQuestion.offsetWidth;
            
            const scrollPosition = activeQuestionOffset - (containerWidth / 2) + (activeQuestionWidth / 2);

            questionsContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }

    function showResults() {           
        quizName = "Introduction To Ai";      
        const questionContainer = document.querySelector(".question-container");                 
        questionContainer.innerHTML = `                     
            <h3 class="results-heading">Quiz Completed!</h3>                     
            <p class="results-score">Your score: ${score} out of ${quizContents.length}</p>                     
            <button class="restart-btn">Restart Quiz</button>                 
        `;                              
        
        localStorage.setItem('quizScore', score);                 
        localStorage.setItem('quizName', quizName);                           
        
        document.querySelector(".question-selection").style.display = "none";                              
        
        document.querySelector(".restart-btn").addEventListener("click", () => {                     
            // localStorage.removeItem('quizScore');
            // localStorage.removeItem('quizName');  // Also remove quizName on restart                     
            location.reload();                 
        });             
    }
    
    function startTimer() {
        let totalSeconds = 120; 
        const timerElement = document.querySelector(".timer-js");
        
        const timerInterval = setInterval(() => {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                showResults();
            }
            
            totalSeconds--;
        }, 1000);
    }

 
    const questionsContainer = document.querySelector('.questions-container');
    if (questionsContainer) {
        questionsContainer.style.display = 'flex';
        questionsContainer.style.overflowX = 'auto';
        questionsContainer.style.scrollBehavior = 'smooth';
        questionsContainer.style.padding = '10px 0';
        questionsContainer.style.scrollbarWidth = 'none'; // Hide scrollbar in Firefox
        questionsContainer.style.msOverflowStyle = 'none'; // Hide scrollbar in IE/Edge
        
        // Hide scrollbar in Chrome/Safari
        const style = document.createElement('style');
        style.textContent = `
            .questions-container::-webkit-scrollbar {
                display: none;
            }
            .question-item {
                flex: 0 0 auto;
                margin: 0 10px;
                transition: transform 0.3s ease, opacity 0.3s ease;
                cursor: pointer;
            }
            .question-item.active {
                transform: scale(1.2);
                z-index: 10;
                position: relative;
            }
            .question-item:not(.active) {
                opacity: 0.7;
            }
            .question-item.answered {
                position: relative;
            }
            .question-item.answered::after {
                content: '✓';
                position: absolute;
                top: 5px;
                right: 5px;
                background-color: green;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.querySelectorAll('.question-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
            currentQ = idx;
            loadQuestion(currentQ);
        });
    });
    
    document.querySelector(".next").addEventListener("click", () => {
        if (currentQ < quizContents.length - 1) {
            currentQ++;
            loadQuestion(currentQ);
        }
    });

    document.querySelector(".previous").addEventListener("click", () => {
        if (currentQ > 0) {
            currentQ--;
            loadQuestion(currentQ);
        }
    });

    loadQuestion(currentQ);
});

document.querySelector(".next").addEventListener("click", () => {
    if (currentQ < quizContents.length - 1) {
        currentQ++;
        loadQuestion(currentQ);
    }
});

document.querySelector(".previous").addEventListener("click", () => {
    if (currentQ > 0) {
        currentQ--;
        loadQuestion(currentQ);
    }
});