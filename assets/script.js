var startButton = document.querySelector(".startBtn");//creating a start button
var initialsDiv = document.querySelector("#initials");
var startTime = 50;//time starts from 0
var timeDisplay = document.querySelector("#displayTime")// a area to display the time
var container = document.querySelector("#container");


startButton.onclick=setTime;// declaring a action to perform on click-when we click start btn setTime function is triggered


function setTime() { //declaring a function called setTime

    // display start time
    timeDisplay.textContent = startTime;
    // show 1st question
    startGame();

    // start timer
    var setTime = setInterval(function(){
        startTime--;
        timeDisplay.textContent = startTime;
 
        if (startTime<0) {
            clearInterval(setTime);
            timeDisplay.textContent = "Game Over"
        }
    }, 1000);   

}


function startGame() {
    // have to call the start buttom here and give event listener

    var scoreDiv = document.querySelector("#score");
    var questions = document.querySelector("#questions");

    var score = 0;
    var questionIndex = 0;
    scoreDiv.textContent = "Your score is " + score;

    var allQuestions = ["Biggest Planet in solar system?"," What type of galaxy is most common in the universe?" , " Which planet has the fastest rotation? ","Which constellation represents a hunter and weapons? ","Which astronaut is famous for having written his daughter initials on the moon?"];

    var firstOptions = ["Jupiter","Earth", "Mars", "Sun","pluto"];
    var secondOptions = ["Dwarf Galaxies","Elliptical Galaxies","Irregular Galaxy","Quasars","Seyfert Galaxies"];
    var thirdOptions = ["jupiter","Mars","Saturn","Uranus","pluto"];
    var fourthOptions = ["orion","Hydra","Ursamajor","Hercules","cetus"];
    var fifthOptions =["Gene Cernan", "Frank Borman","Fred Haise","Georgy Dobrovolsky","Patsayev"];
    
    var allAnswers = [firstOptions, secondOptions, thirdOptions , fourthOptions,fifthOptions]; 

    // display first question
    displayQuestion(allQuestions[questionIndex], allAnswers[questionIndex]);

    // function displayQuestion have arguments 
    //questionNumber gets value from questionIndex i.e 0 ,options are firstOptions.
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

        for(i=0;i<5;i++)
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
        container.textContent = "right answer";
        score++;
        scoreDiv.textContent = "Your score is " + score;
        questionIndex++;
        endGame();
    }

    function wrongOption() {
        container.textContent = "wrong answer. Thu nee bathuku maada, idhi koda thelidha."
        questionIndex++;
        startTime = startTime - 5;
        endGame();
    }

    function endGame() {
        if (questionIndex === 5) {
            var remainingTime = startTime;
            container.textContent = "You had " + remainingTime + " seconds left.";
            startTime = 0;

            var initials = window.prompt(" You scored " + score + "! What are your initials?" );
            // show input for
            localStorage.setItem(initials, score);
            scoreDiv.textContent = "hey " +initials+ " Your score is " + score;
            questions.textContent = "";

        } else {
            displayQuestion(allQuestions[questionIndex], allAnswers[questionIndex]);// entres the values as increased on click.
        }
    }

}