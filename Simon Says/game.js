
const buttonColors = ["red", "blue", "green", "yellow"]; 
let gamePattern = [];
let userPattern = [];
let started = false;
let userClick = 0; //Tracking the number of clicks the user has made per level.
let lvl=0;

$("body").keypress(function() { //Game Start
    if (!started) {
      $("h1").text("Level " + lvl);
      nextSequence();
      started = true;
    }
  }); 

  $(".btn").click(function(event){ //Per click, push value to userPattern array, play color sound, animate and check the answer against gamePattern.
    userPattern.push(event.target.id);
    playSound(event.target.id);
    animatePress(event.target.id);
    checkAnswer(userPattern.length-1);
})

function nextSequence() {
    userPattern = []; //User array reset for next level
    lvl++;
    $("h1").text("Level "+lvl);
    let nRand = Math.floor(Math.random() * 4);
    let randColor = buttonColors[nRand];
    gamePattern.push(randColor);
  
    $("#" + randColor).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randColor);
  }

  //Checks user click pattern against game generated pattern
function checkAnswer(currentLevel){
    console.log("User:"+userPattern);
    console.log("Game:"+gamePattern);
    //Checks user click pattern against game generated pattern
    if(userPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        //When both arrays have the same length implies the level is complete.
        if(userPattern.length===gamePattern.length){
            setTimeout(function() { nextSequence(); },1000);
        }
    }
    if(userPattern[currentLevel] !== gamePattern[currentLevel]){
        console.log("Wrong.");
        gameOver();
        restartGame();
    }
  }
function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game over, press any key to restart");
  }

function restartGame(){
    lvl=0;
    gamePattern = [];
    started = false;
}

function animatePress(currentColor){
    console.log(currentColor);
    
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}