const questions = [
    {
        question: "What does HTML stand for?",
        answer: [
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Hypertext Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Home Tail Markup Language", correct: false },
        ],
    },
    {
        question: "What is the smallest continent in the world?",
        answer: [
            { text: "Asia", correct: false },
            { text: "Africa", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
        ],
    },
    {
        question: "What is the largest desert in the world?",
        answer: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButtons = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButtons.innerHTML = "Next";
    showQuestion();
};

const showQuestion = () => {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

const resetState = () => {
    nextButtons.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

const selectAnswer = (e) => {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButtons.style.display = "block";
};

const showScore = () => {
    resetState();
    questionElement.innerHTML = `your score ${score} out of ${questions.length}!`
    nextButtons.innerHTML = "Play Again"
    nextButtons.style.display = "block"
}

const handleNextButton = () => {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

nextButtons.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz()
    }
})


startQuiz();
