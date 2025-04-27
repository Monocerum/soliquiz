document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreenV2");
    const gameItem = document.querySelector(".game-item2");
    let score = 0;
    let selectedAnswers = [];
    let currentQ = 0;
    let timerInterval;
    let questionAlreadyAnswered = [];

    const correctAnswers = [2, 1, 1, 0, 0, 1, 3, 1, 2, 2];

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
            question: "It is the standard language for creating and designing webpages and web applications.",
            choices: [
                "Cascading Style Sheets",
                "JavaScript",
                "HyperText Markup Language",
                "Python"
            ]
        },
        {
            number: 2,
            question: "Up to what heading element is valid in HTML?",
            choices: [
                "h5",
                "h6",
                "h7",
                "h8"
            ]
        },
        {
            number: 3,
            question: "It is an HTML element that allows you to embed another HTML document within the current page.",
            choices: [
                "<a>",
                "<iframe>",
                "<img>",
                "<nav>"
            ]
        },
        {
            number: 4,
            question: "Which of the following denotes the universal selector?",
            choices: [
                "*",
                "/",
                "#",
                "."
            ]
        },
        {
            number: 5,
            question: "In CSS, when using shorthand to define properties like border, padding, or margin, what is the correct order for specifying the values?",
            choices: [
                "Top, Right, Bottom, Left",
                "Left, Top, Right, Bottom",
                "Right, Left, Top, Bottom",
                "Top, Left, Bottom, Right"
            ]
        },
        {
            number: 6,
            question: "Which CSS selector targets elements based on their class attribute?",
            choices: [
                "#header",
                ".menu",
                "div",
                "*"
            ]
        },
        {
            number: 7,
            question: "JavaScript was first known as _____.",
            choices: [
                "Java",
                "JS",
                "LifeScript",
                "LiveScript"
            ]
        },
        {
            number: 8,
            question: "Given this series of operations:\n\nvar y = 5;\nalert(++y);\ny = y + 2;\nalert(y--);\ny--;\nalert(--y);\nalert(y++);\ny++;\nalert(y);\n\nWhat will the last alert(y) display?",
            choices: [
                "5",
                "7",
                "9",
                "11"
            ]
        },
        {
            number: 9,
            question: "To insert a JavaScript into an HTML page, which tag is used?",
            choices: [
                "<javascript>",
                "<scr>",
                "<script>",
                "<style>"
            ]
        },
        {
            number: 10,
            question: "It is a software program that enables a user to access information on the Internet via the World Wide Web.",
            choices: [
                "website",
                "webpage",
                "web browser",
                "web application"
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
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
             
        quizName = "Web Development";      
        const questionContainer = document.querySelector(".question-container2");
        const resultContainer = document.querySelector(".result-container");
        
        questionContainer.style.display = "none";

        resultContainer.innerHTML = `                     
            <h3 class="results-heading">SCORE</h3>                     
            <p class="results-score">Points: <strong>${score} pts</strong> out of ${quizContents.length} pts</p>            
            <div class="score-progress">
                <div class="score-progress-bar" style="width: ${score / quizContents.length * 100}%;"></div>
            </div>  
            <button class="restart-btn">Restart Quiz</button>                 
        `;                               
        
        localStorage.setItem('quizScore', score);                 
        localStorage.setItem('quizName', quizName);                           

        document.querySelector(".restart-btn").addEventListener("click", () => {                         
            location.reload();                 
        });             
    }
    
    const questionContainer = document.querySelector(".question-container2");
    const submitBtn = document.querySelector(".submit-btn2");
    
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

    const questionsContainer = document.querySelector('.question-container2');
    if (questionsContainer) {
        questionsContainer.style.display = 'flex';
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
            .submit-btn2 {
                margin: 0 auto;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
            .submit-btn2:hover {
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