

let scoopY = 600; 
let iceCreamY = 600; 
let vanButton,chocButton,strawButton,reSetButton;
let line = 0;




function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  drawButtons();

}


function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	}

  function icecream(x, y, size, colour){     //starting icecream
  noStroke();
  fill(255, 255, 150);
  triangle(x, y, x + 20, y + 40, x + 40, y);  //Cone
  fill(colour);    
  ellipseMode(CORNER);  //first scooop
  ellipse(x, y - 35, 40, 41);
}

function drawButtons(){
  vanButton = createButton('VANILLA');
  vanButton.position(20, 20);    //vanilla button
  vanButton.size (110,50);
  vanButton.mousePressed(addVanScoop);

  chocButton = createButton('CHOCOLATE');
  chocButton.position(vanButton.x , vanButton.y + 60);   //chocolate button
  chocButton.size (110,50);
  chocButton.mousePressed(addChocScoop);

  strawButton = createButton('STRAWBERRY');
  strawButton.position(vanButton.x , vanButton.y + 120);  //strawberry button
  strawButton.size (110,50);
  strawButton.mousePressed(addStrawScoop);

  reSetButton = createButton('NEW ICECREAM');
  reSetButton.position(vanButton.x , vanButton.y + 190);  //strawberry button
  reSetButton.size (110,50);
  reSetButton.mousePressed(resetIcecream);
}


function addVanScoop() {  // vanilla scoop
 
  scoopY -= 37;
  fill(245, 242, 235);
  ellipseMode(CORNER);
  ellipse(width/2, scoopY - 30, 40, 41);
 
}

function addChocScoop() {   //chocolate scoop
 
  scoopY -= 37;
  fill(89, 52, 38);
  ellipseMode(CORNER);
  ellipse(width/2, scoopY - 30, 40, 41);
  
}
function addStrawScoop() {   // strawberry scoop
 
  scoopY -= 37;
  fill(232, 172, 209);
  ellipseMode(CORNER);
  ellipse(width/2, scoopY - 30, 40, 41);
 
}



function draw(){
 
  icecream(width/2, iceCreamY, 30, color(245, 242, 235)); //starting cone

  if (scoopY < 40) {   
    GameOver() ;  
    hideButtons();  //hides buttons
    startAgain();
    
  
  }
}
 

function GameOver(){ // makes coloured lines down the screen when icecream gets too high

  noStroke();

  fill(245, 242, 235);
  rect(0,0,width/3,line);
  
  fill(89, 52, 35);
  rect(width/3, 0, width/3,line);

  fill(232, 172, 209);
  rect(width/3 + width/3, 0, width/3,line);

  line += 10;

}

function hideButtons(){  // hides buttons

  vanButton.hide();
  chocButton.hide();
  strawButton.hide();
  reSetButton.hide();

}

function resetIcecream (){     // resets icecream 
  background(50);
    icecream(width/2, iceCreamY, 30, color(255));
    scoopY = iceCreamY - 5;
    line = 0;
    drawButtons();
}


function startAgain(){  //Start again text

  let startAgain = createElement('h1','START AGAIN');
startAgain.position(width/3,height/2);
startAgain.style('color', 'black');
startAgain.center();
  

}