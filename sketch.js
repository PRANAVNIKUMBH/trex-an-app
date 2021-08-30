//Global variables
var trexani,groundimg,trex,ground 
var gamestate = "start"
var score=0
var highs=0
//indentation - giving tab spaces

//load animation, images and sound

function preload(){
  trexani=loadAnimation('trex1.png','trex3.png','trex4.png')

  groundimg=loadImage('ground2.png')

  cloudimg=loadImage('cloud.png')

  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  
  gameoverimg=loadImage("gameOver.png")
  restartimg=loadImage("restart.png")

  trexend =loadAnimation("trex_collided.png")
  trexstart = loadAnimation("trex1.png")
  
  check = loadSound("checkPoint.mp3")

  die = loadSound("die.mp3")

  jump = loadSound("jump.mp3")

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  var message = "How are you";
  console.log (message);

  trex=createSprite(50,height-90,20,35)
  trex.addAnimation('standing',trexstart)
  trex.addAnimation('walking',trexani)
  trex.addAnimation('dead',trexend)
  trex.scale=0.5

  ground=createSprite(width/2,height-60,width,20)
  ground.addImage(groundimg)

  ground2=createSprite(width/2,height-50,width,20)
  ground2.visible=false
  
  cloudg=createGroup()
  obg=createGroup()
  trex.debug=false
  trex.setCollider("circle",0,0,40)
  gameover = createSprite(width/2,height/2,30,40)
  gameover.addImage(gameoverimg)
  gameover.scale=0.6

  restart = createSprite(width/2,height/2 + 50,50,60)
  restart.addImage(restartimg)
  restart.scale=0.6

  
}

function draw() {
  
  background('white');
  fill("black")

 text ("Score= "+ score,width - 100,50)
 text ("HS= "+ highs,width - 200,50)
  trex.collide(ground2)
  
  if (gamestate==="start"){
if (keyDown("space") || touches.length > 0){

  gamestate = "play"
  touches = []
}
gameover.visible=false
restart.visible=false
  }
  if (gamestate==="play"){
    trex.changeAnimation('walking',trexani)
    gameover.visible=false
restart.visible=false
    //getFrameRate() = fps
    score = score + Math.round(getFrameRate() / 60.9  )
    //touches = [x,y]  length = 2
  if((keyDown('space') || touches.length > 0)&&trex.y>height-100){
    trex.velocityY=-10
    jump.play()
    touches = []
  }

  trex.velocityY=trex.velocityY+0.5

  ground.velocityX=-(5+score/50)
  if(ground.x < 0){
    ground.x = 600  
  }
  clouds()
  obs()
  if(trex.isTouching(obg)){
    gamestate = "end"
    die.play()
    
    //trex.velocityY=-10
  }
  if(score%100===0&&score > 0){
    check.play()
  }
}
if(gamestate==="end"){
  cloudg.setVelocityXEach(0)
  obg.setVelocityXEach(0)
  ground.velocityX=0
  cloudg.setLifetimeEach(-1)
  obg.setLifetimeEach(-1)
  if(highs < score){
    highs = score
  }
  
  trex.velocityY=0
  gameover.visible=true
  restart.visible=true
  trex.changeAnimation('dead',trexend)
if (mousePressedOver(restart)){
  reset(); 
}
}
 
drawSprites()
}
function reset (){
  gamestate = 'start'
  obg.destroyEach();
  cloudg.destroyEach();
  trex.changeAnimation('standing',trexstart)
  score = 0
  
}

function clouds (){
  if(frameCount%80===0){
    var cloud = createSprite(width ,height-300,40,60)
    cloud.addImage(cloudimg)
    cloud.velocityX=-(4+score/50)
    cloud.scale=0.8
   
    trex.depth=cloud.depth+1
    
    cloud.lifetime=500
    cloudg.add(cloud)
  }
  
}

function obs (){
  if (frameCount%60===0){

    var obst=createSprite(width,height - 80,30,40)
    obst.velocityX=-(5+score/50)

    restart.depth = obst.depth+1
    
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1: obst.addImage(ob1)
      break

      case 2: obst.addImage(ob2)
      break

      case 3: obst.addImage(ob3)
      break

      case 4: obst.addImage(ob4)
      break

      case 5: obst.addImage(ob5)
      break

      case 6: obst.addImage(ob6)
      break
      
    }
    
    obst.scale=0.6
    obst.lifetime=500
    obg.add(obst)
  }
}






