
// QUESTION CONSTRUCTOR
function Question(text, choices, answer) {
	this.text = text; // string
	this.choices = choices; // array
	this.answer = answer; // string
}
Question.prototype.isCorrect = function(choice) {
	// Return TRUE if choice matches correct answer
	return this.answer === choice; 
};

// QUIZ CONSTRUCTOR
function Quiz(questions) {
	// Array of questions
	this.questions = questions;
	// Track which question you're on, starting with the first question
	this.currentQuestionIndex = 0;
	this.score = 0; // Score keeper
}
Quiz.prototype.getCurrentQuestion = function() {
	return this.questions[this.currentQuestionIndex];
};
Quiz.prototype.checkAnswer = function(answer) {
	if(this.getCurrentQuestion().isCorrect(answer)) {
		this.score++; // Add 1 point if correct
	}
	this.currentQuestionIndex++; // Get ready for next question
};
// Check if quiz end is reached
Quiz.prototype.hasEnded = function() {
	// Return TRUE only after last question
	return this.currentQuestionIndex >= this.questions.length;
};

// QUIZ UI
var QuizUI = {
	displayNext: function() {
		if(quiz.hasEnded()) {
			this.showResults();
		} else {
			this.displayQuestion();
			this.displayChoices();
			this.displayProgress();
			this.displayScore();
		}
	},
	displayQuestion: function() {
		this.populateIdWithHTML('question', quiz.getCurrentQuestion().text);
	},
	displayChoices: function() {
		var choices = quiz.getCurrentQuestion().choices;
		// Loop through each choice and display on page
		for(var i = 0; i < choices.length; i++) {
			var choiceId = 'choice' + i;
			var choiceText = choices[i];
			this.populateIdWithHTML(choiceId, choiceText);
			this.checkAnswerHandler(choiceId, choiceText);
		}
	},
	checkAnswerHandler: function(id, guess) {
		var button = document.getElementById(id);
		button.onclick = function() {
			quiz.checkAnswer(guess);
			QuizUI.displayNext();
		};
	},
	displayScore: function() {
		var scoreText = 'Score: ' + quiz.score;
		this.populateIdWithHTML('score', scoreText);
	},
	displayProgress: function() {
		var questionNumber = quiz.currentQuestionIndex + 1;
		var totalQuestions = quiz.questions.length;
		var progressText = 'Question ' + questionNumber + ' of ' + totalQuestions;
		this.populateIdWithHTML('progress', progressText);
	},
	showResults: function() {
		var grade = quiz.score/quiz.questions.length;
		var results = '<h2>';
		if(grade >= 0.8) {
			results += 'Excellent!';
		} else if(grade < 0.8 && grade > 0.5) {
			results += 'Not Bad...';
		} else {
			results += 'Terrible!';
		}
		results += '</h2><h3>Your final score is: ' + quiz.score + '</h3>';
		results += '<button id="reset">Try Again?</button>';
		this.populateIdWithHTML('quiz', results);
		this.resetQuizHandler();
	},
	resetQuizHandler: function() {
		var resetBtn = document.getElementById('reset');
		// Reload quiz to start from beginning
		resetBtn.onclick = function() {
			window.location.reload(false);
		};
	},
	populateIdWithHTML: function(id, content) {
		var element = document.getElementById(id);
		element.innerHTML = content;
	}
};

// Hover effect - move button down
//var hoverBtn = document.getElementByTagName('button');
//hoverBtn.onmouseover = function() {
//	this.style['margin-top'] = '25px';
//}

// CREATE QUESTIONS
var questions = [
	new Question('How many character does a secure password consist of?', ['4', '6', '10'], '10'),
	new Question('Is it safe to use the years or dates (mine or family member) ?', ['Yes', 'Both','No'], 'No'),
	new Question('Should the password always be contained uppercase, number[0-9], special character[?$#_-] ?', ['Yes', 'Never mind', 'No'], 'Yes'),
  new Question('Meaningful words are less safe?', ['Yes', 'Never mind', 'No'], 'No'),
  new Question('Choose a strong but easily memorable password!', ['Beartrap.danger', 'Beartrap.is.DANG3R', '#ilikeappl3'], 'Beartrap.is.DANG3R'),
  new Question('I like to write my passwords down on a note or sticky notes. Is it safe?', ['Yes', 'Maybe', 'No'], 'No')
];
// CREATE QUIZ & DISPLAY FIRST QUESTION
var quiz = new Quiz(questions);
QuizUI.displayNext();


