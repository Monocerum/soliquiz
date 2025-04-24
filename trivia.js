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