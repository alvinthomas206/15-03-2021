var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var ground2,ground3;
var player, form,game;
var player1,player2;
var players;
var passengers;
var passengersGroup;
var fuels;
var fuelGroup;
var bird_img;
var bird1_img;
var bird2_img;
var birds;
var birdsGroup;
var passenger_img, fuel_img
var player_img;
var invisibleGround;
var invisibleGround2;
var fire;
var fire1;
var fire2;
var fire3;
var fire_img;
var ground;
var ground2;
var wall;
var wall2;
var wall3;
var wall4;
var count=1;
var win;
var win_img;
var crash_sound;
var win_sound;
var aliens;
var alien_img;
var aliensGroup;
var bullet;
var bullet_img;
var bulletGroup ;
var missile;
var missile_img;
var missileGroup;
var lose;
var lose1;
var lose2;
var lose3;
var lose_img;
var upboder;
var downboder;
var rank;

function preload(){
  back_img = loadImage("images/sky.png");
  player_img = loadImage("images/airplane.png");
  passenger_img = loadImage("images/passenger.png");
  fuel_img = loadImage("images/fuel.png");
  bird_img= loadImage("images/bird.png");
  bird1_img= loadImage("images/bird1.png");
  bird2_img= loadImage("images/bird2.png");
  fire_img= loadImage("images/airplane1.png");
  alien_img= loadImage("images/alien.png");
  win_img= loadImage("images/win.jpg");
  bullet_img= loadImage("images/bullet.png");
  missile_img= loadImage("images/missile.png");
  lose_img= loadImage("images/lose.jpg")

  crash_sound= loadSound("sound/crash.mp3")
  win_sound= loadSound("sound/win.mp3")


  passengersGroup = new Group();
  fuelsGroup = new Group();
  birdsGroup = new Group();
  aliensGroup = new Group();
  bulletGroup = new Group();
  missileGroup = new Group();
}
function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
 
  database = firebase.database();
  
  game = new Game();

  game.getState();

  game.start();

console.log(count);
  

 
}

function draw() {

 
  
   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
     clear(); 
     game.play();
   }
   if (gameState === 2) {
    
     game.end();
   }
   if (gameState === 3) {
    
    game.win();
  }


   

}

