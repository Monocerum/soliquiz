document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("startQuizBtn");
    const startScreen = document.getElementById("startScreenV2");
    const gameItem = document.querySelector(".game-item2");

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("fade-out");
        startScreen.style.display = "none";
        gameItem.style.display = "block";

        setTimeout(() => {
            box.style.display = "none";
          }, 1000);
    })

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
            question: `Given this series of operations:\n\nvar y = 5;\nalert(++y);\ny = y + 2;\nalert(y--);\ny--;\nalert(--y);\nalert(y++);\ny++;\nalert(y);\n\nWhat will the last alert(y) display?`,
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
    
    
    function loadQuestion(index) {
        const questionContent = quizContents[index];
        const choicesContent = document.querySelector(".choices2");
    
        document.querySelector(".question-number2").textContent = `QUESTION NO. ${questionContent.number}`;
        document.querySelector(".question2").textContent = questionContent.question;
    
        choicesContent.innerHTML = "";
    
        questionContent.choices.forEach(choiceText => {
            const choiceContainer = document.createElement("div");
            choiceContainer.classList.add("choice-container");
    
            const choiceContent = document.createElement("p");
            choiceContent.classList.add("choice");
            choiceContent.textContent = choiceText;
            
            choiceContainer.appendChild(choiceContent);
            choicesContent.appendChild(choiceContainer);
        })
    }

    let currentQ = 0;
    
    document.querySelector(".next").addEventListener("click", () => {
        if (currentQ < quizContents.length) {
            currentQ++;
            loadQuestion(currentQ);
        }
    })

    document.querySelector(".previous").addEventListener("click", () => {
        if (currentQ > 0) {
            currentQ--;
            loadQuestion(currentQ);
        }
    })

    loadQuestion(currentQ);
})