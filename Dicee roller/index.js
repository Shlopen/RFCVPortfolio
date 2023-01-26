
//Selecting the img elements.
var dice1 = document.querySelectorAll("img")[0];
var dice2 = document.querySelectorAll("img")[1];

//Generate a random number between 1 and 6
var n = Math.floor(Math.random() * 6) +1 ;
var n2 = Math.floor(Math.random() * 6) +1 ;
//Giving each dice a random number
dice1.setAttribute("src", "images/dice"+ n +".png")
dice2.setAttribute("src", "images/dice"+ n2 +".png")

//Who wins?
if(n>n2){
    document.querySelector("h1").innerHTML = "Player 1 wins!"
}
else if(n2>n){
    document.querySelector("h1").innerHTML = "Player 2 wins!"
}
else{
    document.querySelector("h1").innerHTML = "Draw!"
}