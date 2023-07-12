var userClickedPattern = [];


var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*3)+1;

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    level++;
    $("#level-title").text("level "+level);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");

   setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
   },100);
}

var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        var wrongaudio = new Audio("sounds/wrong.mp3");
        wrongaudio.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}