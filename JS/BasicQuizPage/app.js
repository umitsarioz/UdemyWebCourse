// Question Constructor
function Question(question_text, options, answer) {
    this.question_text = question_text;
    this.options = options;
    this.answer = answer;
}

// Question Prototype 

Question.prototype.checkAnswer = function (answer) {
    return (answer === this.answer)
}

// Quiz Constructor

function QuizCons(questions) {
    this.questions = questions;
    this.questionNo = 0;
    this.score = 0;
}

// Quiz Prototype

QuizCons.prototype.getQuestion = function () {
    // Show Current Question
    var curr_quest = this.questions[this.questionNo];
    //console.log("Question-Text:", curr_quest.question_text); //debug
    return curr_quest;
}

QuizCons.prototype.isOver = function () {
    // Return true or false  
    return this.questions.length === this.questionNo;
}

QuizCons.prototype.predict = function (answer) {

    var q = this.getQuestion(); // get question
    console.log("QuestionDebug:",q) //debug
    if (q.checkAnswer(answer)) { // check answer is correct 
        this.score += 1; // increase score 
        console.log("Dogru cevap verildi..") //debug
    }
    else{
        console.log("Yanlış cevap verildi...")
    }
    this.questionNo++; // pass the next question
}

// Question Samples
var q1 = new Question("En eski programlama dili hangisidir?", ["Python", "Java", "C"], "C");
var q2 = new Question("En kolay ve sık kullanılan JS framework'ü hangisidir?", ["React", "Angular", "Vue"], "React");
var q3 = new Question("Makine öğrenmesi hangi alt dala girmektedir?", ["Yapay zeka", "Denetimli Öğrenme", "Gözetimsiz Öğrenme"], "Yapay zeka");

//Debug
// console.log("Q1: ", q1.question_text, "\nAnswer: ", q1.checkAnswer("C"));
// console.log("Q2: ", q2.question_text, "\nAnswer: ", q2.checkAnswer("C"));
// console.log("Q3: ", q3.question_text, "\nAnswer: ", q3.checkAnswer("C"));

all_Questions = [q1, q2, q3]

// Begin the Quiz
var quiz = new QuizCons(all_Questions);

//init the first question
loadQuestion();

// Load Question
function loadQuestion() {
    if (quiz.isOver()) {
        showScore();
    }
    else {

        var current_question = quiz.getQuestion()
        var question_text = current_question.question_text;
        var options = current_question.options; 
        document.querySelector('#question-text').textContent = question_text;
        for (var i = 0; i < options.length; i++) {
            var element = document.querySelector('#option'+i);
            element.textContent = options[i];
            tahminEt(i);
        }
        showProgress();
    }

}

function tahminEt(id) {
    id = 'btn'+id;
    console.log("Tahmin et çalışıyor.:",id)
    var btn = document.getElementById(id);
    btn.onclick = function () {
        let givenAnswer = btn.innerText;
        console.log("Tahmin Edilen Cevap:",givenAnswer);
        quiz.predict(givenAnswer);
        loadQuestion();
    }
}
// Show Score

function showScore() {
    var html = `<h2> Score</h2><h4>${quiz.score}</h4>`
    document.querySelector('.card-body').innerHTML = html;
}

function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionNo+1;
    var html = 'Question '+ questionNumber + ' of ' + totalQuestion;

    if(totalQuestion === questionNumber){
        document.querySelector('#progress').innerHTML = "Quiz is Ended";
    }else{
        document.querySelector('#progress').innerHTML = html;
    }

  
}
console.log("Quiz is Over?: ", quiz.isOver());





