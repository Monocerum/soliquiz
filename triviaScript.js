document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreen");
    const gameItem = document.querySelector(".game-item");
    let score = 0;
    let selectedAnswers = [];
    let currentQ = 0;

    const correctAnswers = [2, 3, 1, 1, 1, 2, 2, 0, 3, 2];

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
        quizName = "Trivia";      
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
