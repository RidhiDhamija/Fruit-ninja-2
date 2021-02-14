var knife;
var PLAY= 1;
var END = 0;
var gameState = PLAY;
var score;

function preload(){
  knifeImage= loadImage("sword.png"); 
  fruitImage1=loadImage("fruit1.png");
  fruitImage2=loadImage("fruit2.png");
  fruitImage3=loadImage("fruit3.png");
  fruitImage4=loadImage("fruit4.png");
  fruitImage5=loadImage("fruit5.png");
  fruitImage6=loadImage("fruit6.png");
  gameoverImage=loadImage("gameover.png");
  monsterImage=loadImage("alien1.png");
  gameOverSound=loadSound("gameover.mp3");
  knifeSound=loadSound("knifeSwooshSound.mp3");
}
function setup(){
  createCanvas (600,600);
  knife=createSprite (0,0,300,330);
  knife.addImage(knifeImage);
  
 // fruit1=createSprite(200,200,20,20);
  
  //fruit2=createSprite(300,300,20,20);
  
 // fruit3=createSprite(400,400,20,20);
  
 // fruit4=createSprite(500,500,20,20);
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  knife.setCollider("rectangle",0,0,40,40);
  
}

function draw(){
  background('lightblue');
  if(gameState===PLAY){
    knife.x= World.mouseX;
    knife.y= World.mouseY;
    fruits();
    enemy();
  }
  if(fruitGroup.isTouching(knife)){
     fruitGroup.destroyEach();
     knifeSound.play();
     score=score+1;
    
  }
   if(enemyGroup.isTouching(knife)){
     enemyGroup.destroyEach();
     gameState=END;
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
     knife.y=300;
     knife.x=300;
     knife.addImage(gameoverImage);
     gameOverSound.play();
     
   }
  drawSprites();
  text("Score: "+ score, 500,50);
}
function fruits(){
  if(World.frameCount%80==0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    if(position==1){
      fruit.x=600;
      fruit.velocityX=-(7+(score/4));
    }
    else{
      if(position==2){
        fruit.x=0
        fruit.velocityX=(7+(score/4));
      }
    }
    fruit.scale=0.2;
    r=Math.round(random(1,6));
    if(r==1){
      fruit.addImage( fruitImage1);
    }
    else if (r==2){
      fruit.addImage(fruitImage2);
    }    
    else if (r==3){
      fruit.addImage(fruitImage3) ;
    } 
    else if(r==4){
      fruit.addImage(fruitImage4);
    }
    else if(r==5){
      fruit.addImage(fruitImage5);
      fruit.scale=0.75;
    }
    
    else if(r==6){
      fruit.addImage(fruitImage6);
      fruit.scale=0.75;
    }
  
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200==0){
    position = Math.round(random(1,2));
    monster=createSprite(400,200,20,20);
    if(position==1){
      monster.x=600;
      monster.velocityX=-(8+(score/10));
    }
    else{
      if(position==2){
        monster.x=0
        monster.velocityX=(8+(score/10));
      }
      }
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
   // monster.velocityX=-(8+(score/10));
    monster.setLifetime=100;
    enemyGroup.add(monster);
  
}
}