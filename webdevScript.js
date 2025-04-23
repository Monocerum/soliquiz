document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreen");
    const gameItem = document.querySelector(".game-item");
    let score = 0;
    let selectedAnswers = [];
    let currentQ = 0;

    const correctAnswers = [2, 1, 1, 0, 0, 1, 3, 1, 2, 2];

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("fade-out");
        startScreen.style.display = "none";
        gameItem.style.display = "block";
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
            question: "Given this series of operations: var y = 5; alert(++y); y = y + 2; alert(y--); y--; alert(--y); alert(y++); y++; alert(y); What will the last alert(y) display?", 
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
    ]
    
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
        quizName = "Web Development";      
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