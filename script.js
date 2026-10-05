
let questions=[{
    question:"HTML stands for ?",
    options:["hyper text markup language",
        "Hyper text makeup language",
        "Hyper test markup language",
        "hyper text makeup langueses"
    ],
    correctAnswer:0
},
{
    question:"Who wrote the code ?",
    options:["You","Me","Coder","Developer"],
    correctAnswer:2
},
{
    question:"Who is the Father of this quiz ?",
    options:["You","Me","chatGpt","None of them"],
    correctAnswer:3
},
{ question:"Who is BGMI pro ?",
    options:["sagar","shubham and pradeep","Dugesh + OM","abhishek","none of them"],
    correctAnswer:4
},
{ question:"Who is good in 1 vs 1?",
    options:["sagar","shubham and pradeep","Dugesh + OM","abhishek","none of them"],
    correctAnswer:0
},
{ question:"Who is good at riding a Bike?",
    options:["sagar","shubham and pradeep","Dugesh + OM","abhishek","none of them"],
    correctAnswer:1
},
{ question:"A bat and a ball together cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
    options:[" $1.00 ","$0.5","$0.15","$1.15","$0.05"],
    correctAnswer:4
},
{
    question:"If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    options:["5 min","10min","1 min","100 min"],
    correctAnswer:0

},
{
    question:"who can defead us in running ?",
    options:["sagar","shubham and pradeep","Dugesh + OM","Abhishek","none of them"],
    correctAnswer:3
},
{
    question:"_______ can learn anything ?",
    options:["sagar","shubham and pradeep","Dugesh + OM","Abhishek","One"],
    correctAnswer:4
}



];

let selectedAnswer=[]
let currentQuestion=0;
let quizSubmitted=false;
let submitbtn=document.querySelector("#submit");



function showQuestions(){
    let questionData=questions[currentQuestion];
    let questionbox=document.querySelector('.questionss')
    questionbox.textContent=questionData.question;


    let optionContainer=document.querySelector('.optionss');
    optionContainer.innerHTML=""
    questionData.options.forEach(function(option , index){
        let optionElement=document.createElement("div");
        optionElement.innerText=option;

        if(selectedAnswer[currentQuestion]===index){
            optionElement.classList.add("selected")
        };

        optionElement.addEventListener("click",function(){
            if(quizSubmitted){
                return;
            }
            selectedAnswer[currentQuestion]=index;
            showQuestions();
        });
        
        optionContainer.append(optionElement);
    });
    if (currentQuestion === questions.length - 1){
        submitbtn.style.display = "block";
    }else {
        submitbtn.style.display = "none";
    };

};
showQuestions();




let questionCounter=document.querySelector('.counterqn')
questionCounter.innerText=`${currentQuestion + 1}/${questions.length}`;





let forwardBtn=document.querySelector("#forwardbtn");
forwardBtn.addEventListener("click",function(){
    if(currentQuestion<questions.length-1){
    currentQuestion++;
    showQuestions();
questionCounter.innerText=`${currentQuestion + 1}/${questions.length}`;}
});




let backbtn=document.querySelector('#backwardbtn');
backbtn.addEventListener("click",function(){
    if(currentQuestion>0){
        currentQuestion--;
        showQuestions();
        questionCounter.innerText=`${currentQuestion + 1}/${questions.length}`;
        
    };
});


function calculateScore(){
    let score=0;
    for (let i=0; i<questions.length;i++){
        if(selectedAnswer[i]===questions[i].correctAnswer){
            score++;
        };
    };
    return score;
}


submitbtn.addEventListener("click",function(){
    let confirmed=confirm("Do you want to submit ?");
    if(confirmed){
        let score=calculateScore();
        quizSubmitted=true;
        let resultshow=document.querySelector(".result");
        resultshow.innerText=`Your Score ${score}/${questions.length}`;
        submitbtn.style.display = "none";

    }
    
})




//background change color dark mode 
let darkmodebtn=document.querySelector("#darkMode");
darkmodebtn.addEventListener("click",function(){
    document.body.classList.toggle("darkMode");
    
})