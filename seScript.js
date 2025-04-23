document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreen");
    const gameItem = document.querySelector(".game-item");
    let score = 0;
    let selectedAnswers = [];
    let currentQ = 0;

    // Correct answers (index of the correct option for each question, 0-based)
    const correctAnswers = [0, 1, 2, 3, 2, 0, 1, 1, 3, 2];

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("fade-out");
        startScreen.style.display = "none";
        gameItem.style.display = "block";
        startTimer();
    });

    const quizContents = [
        {
            number: 1,
            question: "A computer program and all documentation necessary to develop, install, use and maintain a complete system.",
            choices: [
                "Software",
                "Hardware",
                "System Architecture",
                "Engineering"
            ]
        },
        {
            number: 2,
            question: "Technological and managerial discipline concerned with systematic production and maintenance of software products–developed on time.",
            choices: [
                "Computer Engineer",
                "Software Engineering",
                "Scrum Master",
                "Technological Engineering"
            ]
        },
        {
            number: 3,
            question: "Which does not belong to the Software Development Myths?",
            choices: [
                "Customer Myths",
                "Practitioner Myths",
                "Cost Predictability",
                "Management Myths"
            ]
        },
        {
            number: 4,
            question: "In the generic view of software engineering, what stage does includes designing phase, the coding and implementation, and testing. ",
            choices: [
                "Specification Stage",
                "Stage 3: Maintenance",
                "Requirement Phase",
                "Stage 2: Implementation"
            ]
        },
        {
            number: 5,
            question: "In the generic view of software engineering, in what phase does it provide the definition of the information domain and function of the software.",
            choices: [
                "Specification Stage",
                "Stage 3: Maintenance",
                "Requirement Phase",
                "Stage 2: Implementation"
            ]
        },
        {
            number: 6,
            question: "In SDLC or Waterfall Model, in what process does analysis design occur?",
            choices: [
                "Modeling",
                "Planning",
                "Deployment",
                "Construction"
            ]
        },
        {
            number: 7,
            question: "A process consisting of a set of coordinated and controlled activities undertaken to achieve an objective conforming to specific requirements.",
            choices: [
                "Project Management",
                "Project",
                "System Structure",
                "Software Development Life Cycle"
            ]
        },
        {
            number: 8,
            question: "A phase in project management where focuses on defining clear, discrete activities and the work needed to complete each activity within a single project.",
            choices: [
                "Executing the Project",
                "Planning the Project",
                "Initiating the Project",
                "Controlling and Monitoring the Project"
            ]
        },
        {
            number: 9,
            question: "A phase in project management where it focuses on putting the plans developed in project initiation phase and planning phase into action.",
            choices: [
                "Closing down the Project",
                "Planning the Project",
                "Initiating the Project",
                "Executing the Project"
            ]
        },
        {
            number: 10,
            question: "One of the phases in project management focusing on bringing the project to an end.",
            choices: [
                "Initiating the Project",
                "Planning the Project",
                "Closing down the Project",
                "Executing the Project"
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
        quizName = "Software Engineering";      
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