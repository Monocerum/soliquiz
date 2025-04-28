document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreenV2");
    const gameItem = document.querySelector(".game-item2");
    let score = 0;
    let selectedAnswers = [];
    let currentQ = 0;
    let timerInterval;
    let questionAlreadyAnswered = [];

    const correctAnswers = [2, 1, 2, 0, 0, 0, 0, 1, 3, 2];

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
            question: "Which of the following is NOT one of the three main goals of information security?",
            choices: [
                "Confidentiality",
                "Integrity",
                "Accessibility",
                "Availability"
            ]
        },
        {
            number: 2,
            question: "What encryption machine was used by the Germans during World War II?",
            choices: [
                "Turing Machine",
                "Enigma Machine",
                "Colossus Machine",
                "ARPANET"
            ]
        },
        {
            number: 3,
            question: "The protection of information and its critical elements, including the systems and hardware that use, store, and transmit that information",
            choices: [
                "Cybersecurity",
                "Data Privacy",
                "Information Security",
                "Network Security"
            ]
        },
        {
            number: 4,
            question: "The information is safe from accidental or intentional disclosure.",
            choices: [
                "Confidentiality",
                "Integrity",
                "Accessibility",
                "Availability"
            ]
        },
        {
            number: 5,
            question: "Keep data and resources available for authorized use.",
            choices: [
                "Availability Models",
                "Data Privacy",
                "Network Security",
                "Accessibility"
            ]
        },
        {
            number: 6,
            question: "Anything that can exploit a vulnerability, intentionally or accidentally, and obtain, damage, or destroy an asset.",
            choices: [
                "Threat",
                "Vulnerability",
                "Attack",
                "Software piracy"
            ]
        },
        {
            number: 7,
            question: "One that does not affect any system, although information is obtained.",
            choices: [
                "Active Attack",
                "Passive attack",
                "Attack",
                "Software piracy"
            ]
        },
        {
            number: 8,
            question: "Weaknesses or gaps in a security program that can be exploited by threats to gain unauthorized access to an asset.",
            choices: [
                "Threat",
                "Vulnerability",
                "Attack",
                "Software piracy"
            ]
        },
        {
            number: 9,
            question: "Unlawful use or duplication of software-based intellectual property.",
            choices: [
                "Threat",
                "Vulnerability",
                "Attack",
                "Software piracy"
            ]
        },
        {
            number: 10,
            question: "The ownership of ideas and control over the tangible or virtual representation of those ideas.",
            choices: [
                "Threat",
                "Vulnerability",
                "Intellectual Property",
                "Software piracy"
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
        
        const questionsContainer = document.querySelector('.questions-container');
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
             
        quizName = "Information Assurance and Security";      
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
            <button class="anskey-btn">See Answer Key</button>                  
        `;                               
        
        localStorage.setItem('quizScore', score);                 
        localStorage.setItem('quizName', quizName);                                              
        
        document.querySelector(".restart-btn").addEventListener("click", () => {                                    
            location.reload();                 
        }); 
        
        document.querySelector(".anskey-btn").addEventListener("click", () => {                                    
            window.location.href = "ias-answerkey.html";                
        });  
    }
    
    const questionContainer = document.querySelector(".questions-container");
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

    const questionsContainer = document.querySelector('.questions-container');
    if (questionsContainer) {
        questionsContainer.style.display = 'flex';
        questionsContainer.style.scrollBehavior = 'smooth';
        questionsContainer.style.padding = '10px 0';
        questionsContainer.style.scrollbarWidth = 'none';
        questionsContainer.style.msOverflowStyle = 'none';
        
        const style = document.createElement('style');
        style.textContent = `
            .questions-container::-webkit-scrollbar {
                display: none;
            }
            .question-item2 {
                flex: 0 0 auto;
                margin: 0;
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