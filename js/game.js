class Game {
    constructor() {

    }

    
    getState() {
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value", function (data) {
        gameState = data.val();
      })
  
    }
  

    update(state) {
      database.ref('/').update({
        gameState: state
      });
    }


    async start() {
      if (gameState === 0) {
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if (playerCountRef.exists()) {
          playerCount = playerCountRef.val();
          player.getCount();
        }

        form = new Form()
        form.display();
      }



      player1 = createSprite(200, 800);
      player1.addImage("player1", player_img);
      player1.setCollider("rectangle",15,10,280,80,0)
     
  
      player2 = createSprite(800, 800);
      player2.addImage("player2", player_img);
      player2.setCollider("rectangle",15,10,290,80,0)

    
      players = [player1, player2];

    }

  
    play() {
  
      form.hide();
  
      Player.getPlayerInfo();    

      background(126,182,175);
      image(back_img, displayWidth-1800,0,displayWidth*10, displayHeight);
      
      var x = 100;
      var y = 200;
     
      var index = 0;

      drawSprites();
   

          for (var plr in allPlayers) {
          if (plr === "player1" || plr === "player2") {
       
          index = index + 1;
   
          x = 500 - allPlayers[plr].distance ;
          y = 760 + allPlayers[plr].distance1 ;

      
  
          players[index - 1].x = x;
          players[index - 1].y = y;


          player.playerGameState = 1;
          

            if (index === player.index) {

           
          // code for camera
             camera.position.x = players[index-1].x+100;
             camera.position.y = displayHeight/2;


             if (keyDown("space")) {
             createMissile(players[index - 1].x,players[index - 1].y);
            }
            
          }

          //for missile from airplane 
          function createMissile(x,y) {
            for(var i=0; i <20; i++)
            {
            missile= createSprite(100, 100, 60, 10);
            missile.addImage(missile_img);
            missile.x = x;
            missile.y = y;
            missile.velocityX = 50;
            missile.lifetime = 500;
            missile.scale=0.5
            missileGroup.add(missile)  
            }
            
          }

        //code for display score

          stroke("RED");
          textSize(25);
          fill("RED");
          text("Passengers"+":"+allPlayers[plr].score,players[index-1].x-600, index * 50);
         
          stroke("RED");
          textSize(25);
          fill("RED");
          text("Fuel"+":"+allPlayers[plr].score1,players[index-1].x-600, index * 75);
        
          stroke("RED");
          textSize(25);
          fill("RED");
          text("Kill"+":"+allPlayers[plr].score2,players[index-1].x-600, index * 100);

          
         
       }

      }

 



      if (player.playerGameState===1  ){


      invisibleGround = createSprite(displayWidth - 600,displayHeight+40460,1400,81000);
      
    
      invisibleGround2 = createSprite(13750,displayHeight+40460,1000,81100);
     

      wall = createSprite(1700,displayHeight-30,10,450)

      wall2 = createSprite(13450,displayHeight-50,10,480)
      
      wall3 = createSprite(19500,displayHeight-200,9900,11000)
 
      wall4 = createSprite(19600,displayHeight-200,9900,11000)

      upboder = createSprite(7500,displayHeight-980,16000,40) 
      
      downboder = createSprite(7500,displayHeight+100,16000,40) 



      wall.visible=false
      wall2.visible=false
      wall3.visible=false
      wall4.visible=false
      invisibleGround.visible=false
      invisibleGround2.visible=false


     player1.collide( invisibleGround)
      
     player2.collide( invisibleGround)
      
     player1.collide( invisibleGround2)
      
     player2.collide( invisibleGround2)
     
     player1.collide(wall3)
      
     player2.collide(wall3)

     player1.collide(wall4)
      
     player2.collide(wall4)



     //player 1 win
      
     if (player1.isTouching(wall3)||player1.isTouching(invisibleGround2)){
      
      player1.playerGameState=3

    }

    // player 2 win

    if (player2.isTouching(wall3)||player2.isTouching(invisibleGround2)){
   
      player2.playerGameState=3
 
    }

      

    // player 1 lose
      
    if (bulletGroup.isTouching(player1)||aliensGroup.isTouching(player1)||player1.isTouching(birdsGroup)||player1.isTouching(upboder)||player1.isTouching(downboder)||player1.isTouching(wall)||player1.isTouching(wall2)){
    
    
      player1.addImage("fire",fire_img)

      bulletGroup.destroyEach();         
      passengersGroup.destroyEach();
      fuelsGroup.destroyEach();
      aliensGroup.destroyEach();
      birdsGroup.destroyEach();
      player1.playerGameState=2  

      gameState=2

    
    }

      //player 2 lose
    if (bulletGroup.isTouching(player2)||aliensGroup.isTouching(player2)||player2.isTouching(birdsGroup)||player2.isTouching(downboder)||player2.isTouching(upboder)||player2.isTouching(wall)||player2.isTouching(wall2)){
     
      player2.changeImage("fire",fire_img)

      bulletGroup.destroyEach();         
      passengersGroup.destroyEach();
      fuelsGroup.destroyEach();
      aliensGroup.destroyEach();
      birdsGroup.destroyEach();
      gameState=2
      player2.playerGameState=2 
      
    }
      
 


    // for kill score

    if (missileGroup.isTouching(birdsGroup)){
      player.score2++;
      birdsGroup.destroyEach();
      missileGroup.destroyEach();
    }

    if (missileGroup.isTouching(aliensGroup)){
      player.score2++;
      aliensGroup.destroyEach();
      missileGroup.destroyEach();
    }




    if (missileGroup.isTouching(bulletGroup)){
      bulletGroup.destroyEach();         
    }

   console.log(player.playerGameState)

      if (gameState === 1) {
     console.log("player"+player.name)
        player.distance -= 10
        switch(player.score1){
          case 6:player.distance -= 15;
                  break;
          case 8:player.distance -= 20;
                  break;
          case 10:player.distance -= 25;
                  break;
          case 12:player.distance -= 30;
                  break;
          case 14:player.distance -= 35;
                  break;
            default: break;
        }
        
        player.update();
      }

      if (keyDown(RIGHT_ARROW)  && player.playerGameState === 1 && player.index !== null) {
        player.distance -= 20


       player.update();
      }
    
      if (keyDown(UP_ARROW) && player.playerGameState === 1 && player.index !== null) {
        player.distance1 -= 20
     
        player.update();
      } 

      if (keyDown(DOWN_ARROW) && player.playerGameState === 1 && player.index !== null) {

        player.distance1 += 20
        
        player.update();

        
      }
      


      //code for passengers

  
      if (frameCount % 50 === 0) {
        passengers = createSprite(random(1000,12000),random(30,displayHeight-30) , 100, 100);
        passengers.velocityX = -10;
        passengers.lifetime = 500
        passengers.addImage("passenger", passenger_img);
        passengersGroup.push(passengers);
  
      }
    

      //code for fuel
      if (frameCount % 50 === 0) {
        fuels = createSprite(random(1000,12000),random(30,displayHeight-30) , 100, 100);
        fuels.velocityX = -10;
        fuels.lifetime=500
        fuels.addImage("fuel", fuel_img);
        fuelsGroup.push(fuels);
      }

      //code for aliens
      if (frameCount % 50 === 0) {
        aliens = createSprite(random(3000,12000),random(30,displayHeight-30), 100, 100);
        aliens.velocityX = -10;
        aliens.lifetime=500
        aliens.addImage("alien", alien_img);
        createBullet(aliens.x,aliens.y);
        aliensGroup.push(aliens);
    

      }

//code for creating bullet from aliens
      function createBullet(x,y) {
        for(var i=0; i <50; i++)
        {
        bullet= createSprite(100, 100, 60, 10);
        bullet.addImage(bullet_img);
        bullet.x = x;
        bullet.y = y;
        bullet.velocityX = -20;
        bullet.lifetime = 100;
        bullet.scale = 0.5;
        bulletGroup.add(bullet)  
        }
        
      }

      //code for birds
      if (frameCount % 50 === 0) {
        birds = createSprite(random(1000,12000),random(30,displayHeight-30) , 100, 100);
        birds.velocityX = -10;
        birds.lifetime=500
        var rand = Math.round(random(1, 3));
        switch (rand) {
            case 1: birds.addImage("bird", bird_img);
            break;
            case 2: birds.addImage("bird2", bird1_img);
            break;
            case 3: birds.addImage("bird2", bird2_img);
            break;
        
        }
        
        birdsGroup.push(birds);
      }

  
      //for score
      if (player.index !== null) {

          for (let i = 0; i < passengersGroup.length; i++) {
          if (passengersGroup[i].isTouching(players[player.index - 1])) {
            player.score++;
            player.update();
            passengersGroup[i].destroy();
            passengersGroup.splice(i, 1);
          }
  
        }

    
        for (let i = 0; i < fuelsGroup.length; i++) {
          if (fuelsGroup[i].isTouching(players[player.index - 1])) {
            player.score1++;
            player.update();
            fuelsGroup[i].destroy();
            fuelsGroup.splice(i, 1);
          }
        }

      }


     
      }
    

   //player 1 lose

    if (player1.playerGameState===2){
      player1.distance+=0
      player1.distance1+=0

      fire=createSprite(player1.x,player1.y)
      fire.addImage("fire",fire_img)

      stroke("RED");
      textSize(25);
      fill("RED");
      text("Your Score"+":"+allPlayers[plr].score2 + allPlayers[plr].score1 + allPlayers[plr].score ,players[index-1].x-100, index * 20);

    }

    //player 2 lose

    if (player2.playerGameState===2){
      player2.distance+=0
      player2.distance1+=0
      fire=createSprite(player2.x,player2.y)
      fire.addImage("fire",fire_img)

      stroke("RED");
      textSize(25);
      fill("RED");
      text("Your Score"+":"+allPlayers[plr].score2 + allPlayers[plr].score1 + allPlayers[plr].score ,players[index-1].x-100, index * 20);
     
    }



    //player1 win

    if(player1.playerGameState===3){
      player1.distance+=0
      player1.distance1+=0

      stroke("RED");
      textSize(25);
      fill("RED");
      text("Your Score"+":"+allPlayers[plr].score2 + allPlayers[plr].score1 + allPlayers[plr].score ,players[index-1].x-100, index * 20);

     
    }

    //player2 win
    if(player2.playerGameState===3){
      player2.distance+=0
      player2.distance1+=0
      stroke("RED");
      textSize(25);
      fill("RED");
      text("Your Score"+":"+allPlayers[plr].score2 + allPlayers[plr].score1 + allPlayers[plr].score ,players[index-1].x-100, index * 20);
  
    }
    



  }

   
    end() {

    }

    win(){
     
    }
    

  }
