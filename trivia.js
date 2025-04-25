document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreenV2");
    const gameItem = document.querySelector(".game-item2");
    let score = 0;
    let selectedAnswers = [];
    let currentQ = 0;
    let timerInterval;
    let questionAlreadyAnswered = [];

    const correctAnswers = [2, 3, 1, 1, 1, 1, 2, 0, 3, 2];

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("fade-out");
        startScreen.style.display = "none";
        gameItem.style.display = "block";
        loadQuestion(currentQ);
        startTimer();
    });

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
        
        document.querySelectorAll('.question-item2').forEach((item, idx) => {
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
        const choicesContent = document.querySelector(".choices2");
    
        document.querySelector(".question-number2").textContent = `QUESTION NO. ${questionContent.number}`;
        document.querySelector(".question2").textContent = questionContent.question;
    
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
            
            choiceContainer.addEventListener("click", () => {
                document.querySelectorAll(".choice-container").forEach(c => {
                    c.classList.remove("selected");
                    c.classList.remove("active");
                });
                
                choiceContainer.classList.add("selected");
                choiceContainer.classList.add("active");
                
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
        document.querySelectorAll('.question-item2').forEach(item => {
            item.classList.remove('active');
        });
        
        const currentQuestionItem = document.querySelector(`.question-item2:nth-child(${currentIndex + 1})`);
        if (currentQuestionItem) {
            currentQuestionItem.classList.add('active');
        }
        
        const questionsContainer = document.querySelector('.question-container2');
        const activeQuestion = document.querySelector('.question-item2.active');
        
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
        // Stop the timer when showing results
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
             
        quizName = "Trivia";      
        const questionContainer = document.querySelector(".question-container2");                 
        questionContainer.innerHTML = `                     
            <h3 class="results-heading">SCORE</h3>                     
            <p class="results-score">Points: <strong>${score} pts</strong> out of ${quizContents.length} pts</p>            
            <div class="score-progress">
                <div class="score-progress-bar" style="width: ${score / quizContents.length * 100}%;"></div>
            </div>  
            <button class="restart-btn">Restart Quiz</button>                 
        `;                               
        
        localStorage.setItem('quizScore', score);                 
        localStorage.setItem('quizName', quizName);                           
        
        document.querySelector(".question-selection").style.display = "none";                              
        
        document.querySelector(".restart-btn").addEventListener("click", () => {                                    
            location.reload();                 
        });             
    }
    
    const questionContainer = document.querySelector(".question-container2");
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
        
        // Clear any existing timer before starting a new one
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

    const questionsContainer = document.querySelector('.question-container2');
    if (questionsContainer) {
        questionsContainer.style.display = 'flex';
        questionsContainer.style.overflowX = 'auto';
        questionsContainer.style.scrollBehavior = 'smooth';
        questionsContainer.style.padding = '10px 0';
        questionsContainer.style.scrollbarWidth = 'none';
        questionsContainer.style.msOverflowStyle = 'none';
        
        const style = document.createElement('style');
        style.textContent = `
            .question-container2::-webkit-scrollbar {
                display: none;
            }
            .question-item2 {
                flex: 0 0 auto;
                transition: transform 0.3s ease, opacity 0.3s ease;
                cursor: pointer;
            }
            .question-item2.active {
                transform: scale(1.0);
                z-index: 10;
                position: relative;
            }
            .question-item2:not(.active) {
                opacity: 0.7;
            }
            .question-item2.answered {
                position: relative;
            }
            .question-item2.answered::after {
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
            .next.disabled, .question-item2.disabled {
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
    
    document.querySelectorAll('.question-item2').forEach((item, idx) => {
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