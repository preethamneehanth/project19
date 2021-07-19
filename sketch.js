var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  //ghost.debug = true; 
  ghost.setCollider("rectangle" , 0 , 25, 200 , 250)
  
}

function draw(){
  background(0);
    
  if (frameCount % 61 === 0){
    
    score += 1
    
  }
  
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 6;
      
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 6;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -6  ;
    }
    
    ghost.velocityY = ghost.velocityY + 0.2
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
    fill("white")
  text("SCORE: " + score, 10, 100 )
  text("Keep going up by" ,10, 110)
  text("pressing the space bar",10, 120)
  text("and use the left", 10, 130)
  text("and right arrow keys to move.", 10, 140)
  text("Don't bump into the bottom of", 10, 150)
  text("the window sills.", 10, 160)
  text("Don't fall to the ground.", 10, 170)
  text("Gain score by going up and", 10, 180) 
  text("staying alive.", 10, 190)
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    //invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

