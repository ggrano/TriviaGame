var triviaQuestions = [{
	question: "Agent Smith calls Neo 'Mr. Anderson'. But what is Mr. Anderson's first name?",
	answerList: ["Michael.", "Johnathan.", "Thomas.", "James."],
	answer: 2
},{
	question: "We mostly saw Agent Smith do most of the talking for the agents. But what were the other agents' names though?",
	answerList: ["Agent Cross and Agent Bourne.", "Agent Jones and Agent Brown.", "Agent Kennedy and Agent Redfield.", "The Matrix did not distinguish it's sentient programs."],
	answer: 1
},{
	question: "Which member of the crew designed 'The woman in the red dress?",
	answerList: ["Cypher.", "Tank.", "Morpheus.", "Mouse."],
	answer: 3
},{
	question: "Before Neo got unplugged from the Matrix, who did he help take out their garbage?",
	answerList: ["His Land Lady.", "His Grandmother.", "His Neighbor.", "His Roommate."],
	answer: 0
},{
	question: "When Neo went to visit the Oracle, he accidentally knocked over something in her kitchen. What was it?",
	answerList: ["A flower pot.", "A spoon.", "A picture frame.", "A vase."],
	answer: 3
},{
	question: "Mr. Anderson's first scene has him asleep at his desk listening to music with his headphones on. What brand was he wearing?",
	answerList: ["Panasonic.", "Motorola.", "Samsung.", "Sony."],
	answer: 0
},{
	question: "After meeting Trinity in person, Neo woke up late for work! By the way...where did he work?",
	answerList: ["An umbrella corporation.", "Metacortex.", "Enron.", "IBM."],
	answer: 1
},{
	question: "What brand of phone did Morpheus mail Neo the first time they talked?",
	answerList: ["Samsung.", "Motorola.", "Nokia.", "Blackberry."],
	answer: 2
},{
	question: "What bodily phenomenon gives evidence that there's a glitch or change in the Matrix?",
	answerList: ["Presque Vu - feeling that something is on the tip of your tongue.", "Deja Visite - Unexplained knowledge of a new place.", "Deja Vu - a feeling of experiencing a new situation previously.", "Deja senti - feeling of already having felt something."],
	answer: 2
},{
	question: "What is the first martial art form Neo learns?",
	answerList: ["Kung Fu.", "Ju-Jitsu.", "Tae Kwon Do.", "Judo."],
	answer: 1
},{
	question: "What organism does Agent Smith classify human beings as?",
	answerList: ["A mammal.", "A virus.", "A microorgansim.", "An embryonic plague."],
	answer: 1
},{
	question: "What helicopter does Trinity learn to fly on the spot?",
	answerList: ["Bell OH-58.", "Bell UH-1.", "Bell ARH-70.", "Bell 212."],
	answer: 3
},{
	question: "After saving Morpheus, Neo ran to apt 303 where there was an armed Agent Smith. How many times did Neo get shot before he flatlined?",
	answerList: ["Nine.", "Eleven.", "Eight.", "Six."],
	answer: 1
},{
	question: "Like Morpheus previously stated - Neo didn't have to dodge bullets in the end. How many bullets did Neo stop?",
	answerList: ["Eleven.", "Thirteen.", "Twelve.", "Nine thousand."],
	answer: 0
},{
	question: "When Neo met Trinity in person at the club - what song was playing in the background?",
	answerList: ["Dragula.", "Clubbed to Death.", "Du Hast.", "Wake Up."],
	answer: 0
}];
var search = ['the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix', 'the+matrix','the+matrix','the+matrix'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct. The intelligence of humans is proven.",
	incorrect: "Incorrect. Only human.",
	endTime: "Trying to 'Dodge This'?",
	finished: "Dialing your operator..."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//giphy api
	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=the+matrix" + search[currentQuestion] + "&limit=15&rating=pg&api_key=dc6zaTOxFJmzC"
	$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
		var currentGif = giphy.data;
		$.each(currentGif, function(index,value){
		var embedGif = value.images.original.url;
		newGif = $('<img>');
		newGif.attr('src', embedGif);
		newGif.addClass('gifImg');
		$('#gif').html(newGif);
		});
	});
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Reconnect?');
}
