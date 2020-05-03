const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


let shuffledQuestions, currentQuestionIndex

//To begin the Quiz using the Start button
function startQuiz() {
    console.log('started')
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
}




//Move to next question using the next button
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//Determine what happens when an answer is selected
function selectAnswer(e) {

    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//Questions in Array and objects
const questions = [{
        question: 'What football player has won the most Ballon D`Ors in history?',
        answers: [
            { text: 'Michel Platini', correct: false },
            { text: 'Pele de Nascimento', correct: false },
            { text: 'Lionel Messi Cuccitini', correct: true },
            { text: 'Ronaldo de Lima Nazario', correct: false }
        ]

    },
    {
        question: 'Who coached Brazil to glory in the 2002 world cup?',
        answers: [
            { text: 'Felipe Luiz Scolari', correct: true },
            { text: 'Pep Guardiola', correct: false },
            { text: 'Arrigo Sacchi', correct: false },
            { text: 'Claudio Ranieri', correct: false }
        ]

    },
    {
        question: 'Who is the only African player to have won the Ballon D or?',
        answers: [
            { text: 'Samuel Etoó', correct: false },
            { text: 'Didier Drogba', correct: false },
            { text: 'Mohammed Salah', correct: false },
            { text: 'George Weah', correct: true }
        ]

    },
    {
        question: 'The traditional colours of the Japanese national team is what?',
        answers: [
            { text: 'Blue', correct: true },
            { text: 'Red and White', correct: false },
            { text: 'Yellow', correct: false },
            { text: 'White', correct: false }
        ]

    },
    {
        question: 'The Maracana which is the largest stadium in the world by sitting capacity is in what country?',
        answers: [
            { text: 'England', correct: false },
            { text: 'Brazil', correct: true },
            { text: 'Spain', correct: false },
            { text: 'Germany', correct: false }
        ]

    }
]