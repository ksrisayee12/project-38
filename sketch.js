//to create game states
var SERVE = 2;
var PLAY = 1;
var END = 0;
var gameState = SERVE;

//to create memory for each sprite
var asteroid, asteroidimage;

var asteroid2, asteroid2image

var rocket, rocketimage;

var star, starimage;

var next, nextimg

var earth, earthimage;



var sun, sunimage;

var moon, moonimage;

var galaxy2, galaxy2image;

var galaxy1, galaxy1image;

var logo, logoimage

var astronaut, astronaut_image



var flare, flareimage;


var soundtrack;

var opener, openerimage;

var crashsound;

var gameover, gameoverimage;

var restart, restartimage

// var leftkey,rightkey

var leftimage,rightimage

var asteroidsgroup;

var starsgroup;

var moongroup;

var mercurygroup;

var sungroup;

var galaxy1group;

var galaxy2group;

var saturngroup;

var earthgroup;

var astronautgroup;

//to create score
var Distance;

//to create edges
var edges;


function preload() {
  
  //to load images and animation
  sunimage = loadImage("assets/sun.png");
  logoimage = loadImage("assets/space download.png");
  moonimage = loadImage("assets/moon.png");
  
  flareimage = loadImage("assets/flare.png");
  earthimage = loadImage("assets/earth.png");
  starimage = loadImage("assets/startle.png");
  
  soundtrack = loadSound("assets/spaceship audio.mp3");
  galaxy2image = loadImage("assets/galaxy2.png");
 
  restartimage = loadImage("assets/reset download.png");
  openerimage = loadImage("assets/start button.png");
  rocketimage = loadImage("assets/rocketeer.png");
  galaxy1image = loadImage("assets/milkyWay.png");
  asteroidimage = loadImage("assets/asteroid.png");
  gameover_image = loadImage("assets/gameover.jpg");
  
  astronaut_image = loadImage("assets/astronaut.png");
  rocketimage = loadImage("assets/awesomerocketimage.png");

  crashsound = loadSound("assets/crash download.flac");
  
  leftimage = loadImage("assets/left button.png")
  
  rightimage = loadImage("assets/right button.png")
  
  // nextimg = loadImage("nextimg.png")
  
}


function setup() {
  
  //to create gamearea
  createCanvas(windowWidth, windowHeight);

  //to create rocket
  rocket = createSprite(windowWidth / 2, windowHeight - 50, 20, 5);
  rocket.addImage("rocket", rocketimage);
  rocket.scale = 0.18;
  
  //to set score 0
  Distance = 0;
 
  //to create right key and left key
  // rightkey = createSprite(windowWidth+(-70), windowHeight-450)
  // rightkey.addImage(rightimage)
  // rightkey.scale=0.15
  
  // leftkey = createSprite(windowWidth+(-1850), windowHeight-450)
  // leftkey.addImage(leftimage)
  // leftkey.scale=0.20
  
  //to give visibilty for right and leftkey
  // rightkey.visible=false
  // leftkey.visible=false
  
  /*next = createSprite(windowWidth / 1.2, windowHeight - 200, 10, 10)
  next.addImage(nextimg)
  next.visible = true
  next.scale=0.3*/
  
  //to create edges
  edges = createEdgeSprites();


  //to create newgroups
  asteroidsgroup = new Group();
  starsgroup = new Group();
  moongroup = new Group();
  
  sungroup = new Group();
  galaxy1group = new Group();
  galaxy2group = new Group();
  saturngroup = new Group();
  earthgroup = new Group();
  astronautgroup = new Group();
  
  flaregroup = new Group();
 
  //to create an background image in servestate
  logo = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  logo.addImage(logoimage);
  logo.scale = 1.2;
  logo.visible = true;
  
  //to create a play button to start the game
  opener = createSprite(windowWidth / 2, windowHeight - 215, 10, 10);
  opener.addImage(openerimage);
  opener.scale = 0.2;
  opener.visible = true;
  
  //to create gameover and restartimage
  gameover = createSprite(windowWidth / 2, windowHeight / 2, 10, 10);
  gameover.addImage(gameover_image);
  gameover.scale = 0.6;
  restart = createSprite(windowWidth - 360, windowHeight / 2, 10, 10);
  restart.addImage(restartimage);
  restart.scale = 0.30;
  
  //to give visibilty for gameover and restart
  gameover.visible = false;
  restart.visible = false;
}


function draw() {

  
  
  //to make a variable for edges
  edges = createEdgeSprites();
  
  //to give charecteristics for every gamestates
  if (gameState === SERVE) {
    
    if(mousePressedOver(opener)){
    background("white")
    textSize(25)
    fill("red")
    text("Help!.There is an powerful radiation coming from the Saturn.There is a machine in your rocket which can reduse the radiation coming from Saturn.So you can only stop it from affecting all the planets but be careful when crossing the asteriod belt between Mars and Jupiter",windowWidth/2,windowHeight/2)
  }
    
      //  rightkey.visible=false
      //  leftkey.visible=false
   
    background(260);
    rocket.visible = false;
     
    if (mousePressedOver(opener)||touches.opener){
      gameState = PLAY
    }
  }
  if (gameState === PLAY) {
    rocket.collide(edges);
    gameover.visible = false;
    restart.visible = false;
    logo.visible = false;
    opener.visible = false;
    soundtrack.play();
    crashsound.stop()
    background(20);
    
    // rightkey.visible=true
    // leftkey.visible=true
    
    fill("red")
    stroke("#7FFFD4")
    textSize(30);
    text("Distance: " + Distance, windowWidth - 250, windowHeight - 350);
    Distance = Distance + Math.round(frameCount / 180);
    rocket.visible = true;
    if (keyDown("LEFT_ARROW")) {
      rocket.x = rocket.x - 34;
    }
    if (keyDown("RIGHT_ARROW")){      
       
      rocket.x = rocket.x + 34;
        
    }
    asteroidShower();
    illution();
    rocket.setCollider("circle", 0, 0, 150);


    if (asteroidsgroup.isTouching(rocket)) {

     
      gameState = END;
      asteroid.velocityY = 0;
      
      crashsound.play();
      soundtrack.stop()
    }



  }
  if (gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    asteroidsgroup.setVelocityYEach(0);
    asteroidsgroup.destroyEach();
    sungroup.destroyEach();
    moongroup.destroyEach();
    galaxy1group.destroyEach();
    galaxy2group.destroyEach();
    
  //  rightkey.visible=false
  //  leftkey.visible=false
    
    earthgroup.destroyEach();
    astronautgroup.destroyEach();
    flaregroup.destroyEach();
    
    starsgroup.setVelocityYEach(0);
  rocket.x = windowWidth - 1250;
    rocket.y = windowHeight / 2;

    
    
    if (mousePressedOver(restart)||touches.restart) {
      reset();
    }

  }
  
  //to display sprites
  drawSprites();
}

//to create asteroids and to give characteristics 
function asteroidShower() {
  if (frameCount % 10 === 0) {
    asteroid = createSprite(30, 0, 500, 500);
    asteroid.addImage("asteroid", asteroidimage);
    asteroid.setCollider("circle", 0, 40, 415);

    asteroid.x = Math.round(random(windowWidth));
    asteroid.velocityY = +(10 + 5 * Distance / 1000)
    asteroid.scale = 0.09;
    asteroid.lifetime=windowHeight - 50
    //adding asteroids in asteroids group
    asteroidsgroup.add(asteroid);
    asteroid.depth = asteroid.depth + 5;
  }


}


//to create a illution that the rocket is moving
function illution() {
  if (frameCount % 0.5 === 0) {
    star = createSprite(500, 0, 40, 10);
    star.x = Math.round(random(windowWidth));
    star.addImage(starimage);
    star.velocityY = 45;
    star.depth = rocket.depth;
    rocket.depth = rocket.depth + 1;
    star.scale = 0.02;
    star.lifetime=windowHeight + 50
    starsgroup.add(star);
  }

  if (frameCount % 425 === 0) {
    earth = createSprite(500, 0, 40, 10);
    earth.addImage(earthimage);
    earth.x = Math.round(random(windowWidth));
    earth.scale = 0.4;
    earth.velocityY = 10;
    earth.lifetime=windowHeight - 500
    earthgroup.add(earth);



  }


  

  

  if (frameCount % 243 === 0) {
    galaxy2 = createSprite(500, 0, 40, 10);
    galaxy2.addImage(galaxy2image);
    galaxy2.x = Math.round(random(windowWidth));
    galaxy2.scale = 0.4;
    galaxy2.velocityY = 15;
    galaxy2.lifetime=windowHeight - 50
    galaxy2group.add(galaxy2);
  }

  if (frameCount % 159 === 0) {
    galaxy1 = createSprite(500, 0, 40, 10);
    galaxy1.addImage(galaxy1image);
    galaxy1.x = Math.round(random(windowWidth));
    galaxy1.scale = 0.2;
    galaxy1.velocityY = 15;
    galaxy1.lifetime=windowHeight - 50
    galaxy1group.add(galaxy1);
  }

  if (frameCount % 744 === 0) {
    sun = createSprite(500, 0, 40, 10);
    sun.addImage(sunimage);
    sun.x = Math.round(random(windowWidth));
    sun.scale = 0.5;
    sun.velocityY = 10;
    sun.lifetime=windowHeight - 50
    sungroup.add(sun);

  }
  
  if (frameCount % 288 === 0) {
    moon = createSprite(500, 0, 40, 10);
    moon.addImage(moonimage);
    moon.scale = 0.5;
    moon.x = Math.round(random(windowWidth));
    moon.velocityY = 5;
    moon.lifetime=windowHeight - 50
    moongroup.add(moon);

  }
  if (frameCount % 388 === 0) {
    astronaut = createSprite(0, 300, 40, 10);
    astronaut.addImage(astronaut_image);
    astronaut.scale = 0.1;
    astronaut.y = Math.round(random(windowWidth));
    astronaut.velocityX = 5;
    astronaut.lifetime = windowWidth - 500
    astronautgroup.add(astronaut);

  }
  
  if (frameCount % 233 === 0) {
    flare = createSprite(500, 0, 40, 10);
    flare.addImage(flareimage);
    flare.scale = 0.4;
    flare.x = Math.round(random(windowWidth));
    flare.velocityY = 5;
    lifetime=windowHeight - 50
    flaregroup.add(flare);

  }
}

//to reset the game
function reset() {
  gameState = PLAY;
  starsgroup.destroyEach();
  Distance = 0;
  rocket.x = windowWidth / 2;
  rocket.y = windowHeight - 50;

}