document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreen");
    const gameItem = document.querySelector(".game-item");
    let score = 0;
    let selectedAnswers = [];
    let currentQ = 0;
    let questionAlreadyAnswered = []; 
    let timerInterval;

    const audio = document.getElementById("background-audio");

    audio.volume = 0.5;

    const correctAnswers = [1, 2, 2, 3, 1, 2, 1, 3, 2, 1];

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
                "To design aesthetically pleasing robots"
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
            question: "What is meant by rationality in AI?",
            choices: [
                "Acting based on emotions rather than logic",
                "Doing the right thing based on available information",
                "Mimicking human rational behaviors",
                "Achieving the best result in all tasks based on goals"
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
    
  
    for (let i = 0; i < quizContents.length; i++) {
        questionAlreadyAnswered[i] = false;
    }
    
  
    function updateNavigationState() {
        const nextBtn = document.querySelector(".next");
        const isCurrentQuestionAnswered = selectedAnswers[currentQ] !== undefined;
        
        if (!isCurrentQuestionAnswered) {
            nextBtn.classList.add("disabled");
            nextBtn.disabled = true;
        } else {
            nextBtn.classList.remove("disabled");
            nextBtn.disabled = false;
        }
        
        document.querySelectorAll('.question-item').forEach((item, idx) => {
            if (idx > currentQ && !isCurrentQuestionAnswered) {
                item.classList.add("disabled");
            } else {
                item.classList.remove("disabled");
            }
        });
    }
    
    function loadQuestion(index) {
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
                choiceContainer.classList.add("active");
            }
            
            choiceContainer.appendChild(choiceContent);
            choicesContent.appendChild(choiceContainer);

            const choiceClickSound = new Audio('audio/click-sound.mp3.MP3');
            
            choiceContainer.addEventListener("click", () => {
                document.querySelectorAll(".choice-container").forEach(c => {
                    c.classList.remove("selected");
                    c.classList.remove("active");
                });
                
                choiceContainer.classList.add("selected");
                choiceContainer.classList.add("active");

                choiceClickSound.play();
                
                if (questionAlreadyAnswered[index] && selectedAnswers[index] !== choiceIndex) {
                    if (selectedAnswers[index] === correctAnswers[index] && choiceIndex !== correctAnswers[index]) {
                        score--;
                    }
                    else if (selectedAnswers[index] !== correctAnswers[index] && choiceIndex === correctAnswers[index]) {
                        score++;
                    }
                }
                else if (!questionAlreadyAnswered[index]) {
                    if (choiceIndex === correctAnswers[index]) {
                        score++;
                    }
                    questionAlreadyAnswered[index] = true;
                    document.getElementById(`Q${index + 1}`).parentElement.classList.add("answered");
                }
                
                selectedAnswers[index] = choiceIndex;
                
                updateNavigationState();

                checkAllQuestionsAnswered();
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
        
        updateNavigationState();
        
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
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
             
        quizName = "Introduction to AI";      
        const questionContainer = document.querySelector(".question-container");                 
        questionContainer.innerHTML = `                     
            <h3 class="results-heading">SCORE</h3>                     
            <p class="results-score">Points: <strong>${score} pts</strong> out of ${quizContents.length} pts</p>            
            <div class="score-progress">
                <div class="score-progress-bar" style="width: ${score / quizContents.length * 100}%;"></div>
            </div>  
            <button class="restart-btn">Restart Quiz</button>     
            <button class="anskey-btn">See Answer Key</button>                 
        `;                              
        
        localStorage.setItem('quizScore', score);                 
        localStorage.setItem('quizName', quizName);                           
        
        document.querySelector(".question-selection").style.display = "none";                              
        
        document.querySelector(".restart-btn").addEventListener("click", () => {                                    
            location.reload();                 
        });       
        
        document.querySelector(".anskey-btn").addEventListener("click", () => {                                    
            window.location.href = "iai-answerkey.html";                
        });   
    }
    
    const questionContainer = document.querySelector(".question-container");
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Quiz";
    submitBtn.classList.add("submit-btn");
    submitBtn.style.display = "none";
    questionContainer.appendChild(submitBtn);
    
    function checkAllQuestionsAnswered() {
        const allAnswered = questionAlreadyAnswered.every(answered => answered);
        submitBtn.style.display = allAnswered ? "block" : "none";
    }
    
    submitBtn.addEventListener("click", () => {
        showConfirmation();
    });
    
    const confirmationContainer = document.getElementById("confirmationContainer");
    const returnBtn = document.querySelector(".return-btn");
    const confirmBtn = document.querySelector(".confirm-btn");

    function showConfirmation() {
        confirmationContainer.style.display = "flex";
    }

    returnBtn.addEventListener("click", () => {
        confirmationContainer.style.display = "none";
    });

    confirmBtn.addEventListener("click", () => {
        confirmationContainer.style.display = "none";
        showResults();
    })
    
    function startTimer() {
        let totalSeconds = 120; 
        const timerElement = document.querySelector(".timer-js");
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        timerInterval = setInterval(() => {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
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
        questionsContainer.style.scrollbarWidth = 'none';
        questionsContainer.style.msOverflowStyle = 'none';
        
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
                transform: scale(1.0);
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
            .next.disabled, .question-item.disabled {
                opacity: 0.5;
                cursor: not-allowed;
                pointer-events: none;
            }
            .submit-btn {
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
            .submit-btn:hover {
                background-color: #45a049;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.querySelectorAll('.question-item').forEach((item, idx) => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('disabled')) {
                currentQ = idx;
                loadQuestion(currentQ);
            }
        });
    });
    
    document.querySelector(".next").addEventListener("click", () => {
        if (!document.querySelector(".next").disabled && currentQ < quizContents.length - 1) {
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