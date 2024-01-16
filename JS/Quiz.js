const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const progressText=document.getElementById('progressText')
const ScoreText=document.getElementById("score")
const progressBarFull=document.getElementById("progressBarFull")

let currentQuestion={}
let acceptingAnswers=true
let score=0
let questionCounter=0
let availableQuestions=[]

let questions=[
    {
        question:"How many nations are there in Teyvat ?",
        choice1:'2',
        choice2:'9',
        choice3:'7',
        choice4:'4',
        answer:3
    },
    {
        question:"Who is the Electro Archon ?",
        choice1:'Navia',
        choice2:'Raiden Shogun',
        choice3:'Yae Miko',
        choice4:'Beidou',
        answer:2
    },
    {
        question:"Who was the first released Geo Character ?",
        choice1:'ningguang',
        choice2:'Albeido',
        choice3:'Gourou',
        choice4:'Zhongli',
        answer:4
    },
    {
        question:"What is the dendro nation called ?",
        choice1:'Sumeru',
        choice2:'Inazuma',
        choice3:'Montstad',
        choice4:'Shneznaya',
        answer:1
    },
    {
        question:"how many years did Furina had to pretend to be the Hydro Archon ?",
        choice1:'50 years',
        choice2:'750 years',
        choice3:'500 years',
        choice4:'10 years',
        answer:3
    },
    {
        question:"what is Cyno's role",
        choice1:'General Mahamatra',
        choice2:'Scribe of the Akademiya',
        choice3:'Mercenary',
        choice4:'Archon',
        answer:1
    },
    {
        question:"which of these characters is a pure Khaenri'ahns",
        choice1:'Lisa',
        choice2:'Klee',
        choice3:'Xingqui',
        choice4:'Kaeya',
        answer:4
    },
    {
        question:"Which of the characters is a healer?",
        choice1:'Hu tao',
        choice2:'Sangonomiya Kokomi',
        choice3:'Ayaka',
        choice4:'Charlotte',
        answer:2
    },
    {
        question:"Which of the characters has a Pyro Vision?",
        choice1:'Lyney',
        choice2:'Lynette',
        choice3:'Venti',
        choice4:'Neuvillette',
        answer:1
    },
    {
        question:"Montstad is the city of ",
        choice1:'Contracts',
        choice2:'Eternity',
        choice3:'Freedom',
        choice4:'Wisdom',
        answer:3
   },
]

const SCORE_POINTS=100
const MAX_QUESTIONS=10

startGame=()=>{
    questionCounter=0
    score=0
    availableQuestions=[...questions]
    getNewQuestion()
}

getNewQuestion=()=>{
    if(availableQuestions.length===0||questionCounter>MAX_QUESTIONS){
    choices.forEach(choice=>{
        choice.style.cursor="not-allowed"
    })
    return ScoreText.style.color="green"
    }

    questionCounter++
    progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width=`${(questionCounter/MAX_QUESTIONS)*100}%`
    
    const questionsIndex=Math.floor(Math.random()*availableQuestions.length)
    currentQuestion=availableQuestions[questionsIndex]
    question.innerText=currentQuestion.question

    choices.forEach(choice=>{
        const number= choice.dataset['number']
        choice.innerText=currentQuestion['choice'+number]
    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers=true
}

choices.forEach(choice=>{
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return

        acceptingAnswers=false
        const selectedChoice=e.target
        const selectedAnswer=selectedChoice.dataset['number']

        let classToApply= selectedAnswer==currentQuestion.answer?'correct':'incorrect'
        console.log(classToApply,selectedChoice)
        if(classToApply==='correct'){
            incrementScore(SCORE_POINTS)
            
        }
        selectedChoice.classList.add(classToApply)
        console.log(classToApply,selectedChoice)
        
        setTimeout(()=>{
            selectedChoice.classList.remove(classToApply)
            getNewQuestion()
        },1000)

    })
})

incrementScore=num=>{
    score+=num
    ScoreText.innerText=score
}

startGame()