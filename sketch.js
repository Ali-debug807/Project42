
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var background0
var backgroundImage
var gameState="PLAY"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("forest-jungle-game-background-game-assets-sprite-sheet-sidescroller-sidescrolling-game.webp")
 
  FoodGroup=new Group()
  obstacleGroup=new Group()
}


function setup(){
 //creating monkey
  background0=createSprite(200,200)
  background0.addImage(backgroundImage)
  background0.scale=0.67
  background0.velocityX=-4
  console.log(background0.x)
  
  monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x) 
  
}
  



function draw() {
  //monkey.debug=true
  background("black");
 if(gameState==="PLAY"){
 
   ground.visible=false
   
  if(background0.x<150){
    background0.x=background0.width/3
}
  if(ground.x<0) {
    ground.x=ground.width/2;
  }

    if(keyDown("space") && monkey.y>=310 ) {
      monkey.velocityY = -16;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground); 
    food()
    obstacles()
   
   if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach()
     score=score+2
   }
  
    if(obstacleGroup.isTouching(monkey)){
      ground.velocityX=0
      monkey.velocityX=0
      FoodGroup.setVelocityXEach(0)
      obstacleGroup.setVelocityXEach(0)
      FoodGroup.setLifetimeEach(-1)
      obstacleGroup.setLifetimeEach(-1)
      background0.velocityX=0
      gameState="END"
    }
 
  drawSprites();
 }
  if(gameState==="END"){
    fill("red")
    textSize(30)
    text("Game Over",125,150)
  }
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Score: "+ score,100,50)
}

function food(){
  if(frameCount%80===0){
    banana=createSprite(600,300)
    banana.addImage(bananaImage)
    banana.velocityX=-4
    banana.scale=0.1
    banana.y=Math.round(random(120,200))
    banana.depth = monkey.depth
    monkey.depth = monkey.depth + 1
    banana.lifetime=150
    FoodGroup.add(banana)
  }
  
}

function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(600,320,10,40)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-6
    obstacle.scale=0.135
    obstacle.lifetime=100
    obstacleGroup.add(obstacle)
    
  }
}