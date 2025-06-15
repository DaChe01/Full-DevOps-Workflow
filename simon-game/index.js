var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var gameStart = false;

// Event listner for keypress to start the game
$(document).keypress(function(){
    if(!gameStart){
        $("#level").text("Level "+level);
        nextSequence();
        gameStart = true;
    }
});


// Function to generate random color
function nextSequence(){
    userClickPattern = [];
    level++;
    $("#level").text("Level "+level);

    var randomNum = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNum];
    gamePattern.push(randomChoosenColor);

    $("#"+ randomChoosenColor).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChoosenColor);
}

// Event listner for button click
$(".button").on("click", function(){
    var userChoosenColor = $(this).attr("id");
    userClickPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animateClick(userChoosenColor);

    // Check user answer against game pattern
    checkAnswer(userClickPattern.length-1);
});

// Function to play sound corresponding to the color
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// Function to animate when button clicked
function animateClick(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

// Function to check user answer
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickPattern[currentLevel]){
        console.log("Success");

        if(userClickPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level").text("Game Over! Press Any Key to Start");

        // Reset the game
        startOver();
    }
}

// Function to reset the game state after a wrong answer
function startOver(){
    level = 0;
    gameStart = false;
    gamePattern = [];

}