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