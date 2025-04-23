const quizContents = [
    {
        number: 1,
        question: "What is the primary goal of Artificial Intelligence?",
        choices: [
            "To mimic human emotions",
            "To create intelligent entities that can reason and act rationally",
            "To replace human workers in all industries",
            "Hyper Transfer Markup Language"
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
        question: "What is meant by \"rationality\" in AI?",
        choices: [
            "Natural language processing",
            "Knowledge representation",
            "Machine learning",
            "Physical simulation of a human body"
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
]

function loadQuestion(index) {
    const questionContent = quizContents[index];
    const choicesContent = document.querySelector(".choices");

    document.querySelector(".question-number").textContent = `QUESTION NO. ${questionContent.number}`;
    document.querySelector(".question").textContent = questionContent.question;

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