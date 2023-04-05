var startButton = document.querySelector(".startBtn");//getting the start button
var initialsDiv = document.querySelector("#initials");
var startTime = 50;
var timeDisplay = document.querySelector("#displayTime");
var container = document.querySelector("#container");


startButton.onclick = function setTime() {
    startTime = 50;
    container.textContent = "";
    // display start time
    timeDisplay.textContent = startTime;
    // start game
    startGame();

    // start timer
    var setTime = setInterval(function(){
        startTime--;
        timeDisplay.textContent = startTime;
 
        if (startTime<0) {
            clearInterval(setTime);
            questions.textContent = "";
            timeDisplay.textContent = "Game Over"

        }
    }, 1000);   

}


function startGame() {
    var scoreDiv = document.querySelector("#score");
    var questions = document.querySelector("#questions");

    var score = 0;
    var questionIndex = 0;
    scoreDiv.textContent = "Your score is " + score;

    var allQuestions = ["Biggest Planet in solar system?"," What type of galaxy is most common in the universe?" , " Which planet has the fastest rotation? ","Which constellation represents a hunter and weapons? ","Which astronaut is famous for having written his daughter initials on the moon?","How many earths could fit inside the sun? "];

    var firstOptions = ["Jupiter","Earth", "Mars", "Sun",];
    var secondOptions = ["Dwarf Galaxies","Elliptical Galaxies","Irregular Galaxy","Quasars"];
    var thirdOptions = ["jupiter","Mars","Saturn","Uranus",];
    var fourthOptions = ["orion","Hydra","Ursamajor","Hercules"];
    var fifthOptions =["Gene Cernan", "Frank Borman","Fred Haise","Georgy Dobrovolsky"];
    var sixthOptions =["One million", "4 millions","5 million","10 million"];

    
    var allAnswers = [firstOptions, secondOptions, thirdOptions , fourthOptions,fifthOptions,sixthOptions]; 

    // display first question
    displayQuestion(allQuestions[questionIndex], allAnswers[questionIndex]);

    // function that displays questions
    function displayQuestion(question, options) {
        questions.textContent = "";

        var section = document.createElement("section");
        var headerOne = document.createElement("h1");
        var ulList = document.createElement("ul");

        headerOne.textContent = question;
        headerOne.setAttribute("class","questionsList");
        questions.append(section);
        section.append(headerOne);
        section.append(ulList);

        for(i=0;i<4;i++)
        {
            var li = document.createElement("li");
            var button = document.createElement("button");

            button.textContent = options[i];
            button.setAttribute("class","display")

            if (i==0) {
                button.onclick = rightOption;
            } else {
                button.onclick = wrongOption;
            }
            
            li.append(button);
            ulList.append(li);
        }
    }

    function rightOption() {
        container.textContent = "right answer!";
        score++;
        scoreDiv.textContent = "Your score is " + score;
        questionIndex++;
        endGame();
    }

    function wrongOption() {
        container.textContent = "wrong answer..."
        questionIndex++;
        startTime = startTime - 5;
        endGame();
    }

    function endGame() {
        if (questionIndex === allQuestions.length) {
            var remainingTime = startTime;
            container.textContent = "You had " + remainingTime + " seconds left.";
            startTime = 0;

            var initials = window.prompt(" You scored " + score + "! What are your initials?" );

            localStorage.setItem(initials, score);
            scoreDiv.textContent = "hey " +initials+ ". Your score is " + score;
            questions.textContent = "";

        } else {
            displayQuestion(allQuestions[questionIndex], allAnswers[questionIndex]);
        }
    }

}