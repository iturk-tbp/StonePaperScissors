var database
var playerCount = 0
var database
var gameState = 0
var form, player
var allPlayers
var score1, score2
var scores, a, b, plr, choice, a1, a2
function preload(){
  
}

function setup(){
  var canvas = createCanvas(1400,700);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw(){
  background(235,52,201)
  if(playerCount === 2){
    game.updateState(1);
  }
  if(gameState === 1){
    game.play();
  } 
}


