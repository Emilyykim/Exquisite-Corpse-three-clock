let counter = 0;
let imgs = [];
let currentIndex = 0;
let imgWidth;
let imgHeight;
let spacing = 50;
let totalWidth;
let blackhole, mss, nebula, supermassive, supernova;
let displayCounter = 0; // Counter to keep track of displayNextImage calls
let imgPositions = [];
let movementSpeed = 2;
let events = [5, 3, 8, 2, 6]; // Example dataset: frequencies of different events
let gameState = "start"; // State of the game
let rooms = ["Nebula Room", "MSS Room", "Supermassive Room", "Blackhole Room", "Supernova Room"];
let currentRoom = "";

function preload() {
  blackhole = loadImage('images/blackhole.png');
  mss = loadImage('images/mss.png');
  nebula = loadImage('images/nebula.png');
  supermassive = loadImage('images/supermassive.png');
  supernova = loadImage('images/supernova.png');

  imgs.push(nebula);
  imgs.push(mss);
  imgs.push(supermassive);
  imgs.push(blackhole);
  imgs.push(supernova);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  background(22, 12, 41);
  imageMode(CENTER);

  imgWidth = windowWidth / 6;  // Width of each image in relation to window size
  imgHeight = imgWidth; // Creates symmetrical images

  for (let i = 0; i < imgs.length; i++) {
    imgPositions.push({
      x: (windowWidth / 10) + i * (imgWidth + spacing),
      y: windowHeight / 2,
      direction: random([-1, 1])
    });
  }

  setInterval(displayNextImage, 2000);
}

function draw() {
  background(22, 12, 41, 25); // Slightly transparent background for a trailing effect

  switch (gameState) {
    case "start":
      drawStartScreen();
      break;
    case "explore":
      drawExploreScreen();
      break;
    case "discover":
      drawDiscoverScreen();
      break;
    case "room":
      drawRoomScreen();
      break;
    case "end":
      drawEndScreen();
      break;
  }
}

function drawStartScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Welcome to the Space Station", width / 2, height / 2 - 40);
  textSize(20);
  text("Press 'E' to Explore the Station", width / 2, height / 2);
  text("Press 'D' to Discover Astronomical Events", width / 2, height / 2 + 40);
}

function drawExploreScreen() {
  drawImages();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Exploring the Space Station...", width / 2, height / 2 - 40);
  textSize(20);
  text("Press 'B' to go Back", width / 2, height / 2 + 40);
  text("Press '1' to enter Nebula Room", width / 2, height / 2 + 80);
  text("Press '2' to enter MSS Room", width / 2, height / 2 + 120);
  text("Press '3' to enter Supermassive Room", width / 2, height / 2 + 160);
  text("Press '4' to enter Blackhole Room", width / 2, height / 2 + 200);
  text("Press '5' to enter Supernova Room", width / 2, height / 2 + 240);
}

function drawDiscoverScreen() {
  drawBarChart();
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Discovering Astronomical Events", width / 2, height / 2 - 40);
  textSize(20);
  text("Press 'B' to go Back", width / 2, height / 2 + 40);
}

function drawRoomScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(`You are in the ${currentRoom}`, width / 2, height / 2);
  textSize(20);
  text("Press 'B' to go Back", width / 2, height / 2 + 40);
}

function drawEndScreen() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Thank you for playing!", width / 2, height / 2);
}

function keyPressed() {
  if (gameState === "start") {
    if (key === 'E') {
      gameState = "explore";
    } else if (key === 'D') {
      gameState = "discover";
    }
  } else if (gameState === "explore" || gameState === "discover") {
    if (key === 'B') {
      gameState = "start";
    }
  }
  
  if (gameState === "explore") {
    if (key >= '1' && key <= '5') {
      currentRoom = rooms[key - 1];
      gameState = "room";
    }
  } else if (gameState === "room") {
    if (key === 'B') {
      gameState = "explore";
    }
  }
}

function drawImages() {
  // Draw moving stars
  if (frameCount % 2 === 0) {
    drawStar(random(windowWidth), random(windowHeight), 5, 4, 2, 0);
  }

  // Move and draw images
  for (let i = 0; i < imgs.length; i++) {
    let pos = imgPositions[i];
    pos.x += pos.direction * movementSpeed;

    // Reverse direction if the image hits the screen edge
    if (pos.x < imgWidth / 2 || pos.x > windowWidth - imgWidth / 2) {
      pos.direction *= -1;
    }

    image(imgs[i], pos.x, pos.y, imgWidth, imgHeight);
  }
}

function drawBarChart() {
  let barWidth = 50;
  let chartHeight = 200;
  let xOffset = 20;
  let yOffset = height - chartHeight - 20;

  for (let i = 0; i < events.length; i++) {
    fill(255);
    rect(xOffset + i * (barWidth + 10), yOffset + chartHeight - events[i] * 20, barWidth, events[i] * 20);
  }
}

function displayNextImage() {
  displayCounter++; // Increment the display counter (number of images on screen)

  if (displayCounter >= 5) { // Check if it has been called 5 times
    setTimeout(resetCanvas, 2000); // Reset the canvas after a delay of 2 seconds
    displayCounter = 0; // Reset the display counter
  }
}

function resetCanvas() {
  background(22, 12, 41);
  displayCounter = 0;
}

function drawStar(x, y, n, outerRadius, innerRadius, rotation) { // This will draw the stars randomly
  noStroke();
  fill(190);
  let theta = TAU / n;
  beginShape();
  for (let i = 0; i < n; i++) {
    let x1 = x + cos(i * theta + rotation) * outerRadius;
    let y1 = y + sin(i * theta + rotation) * outerRadius;
    vertex(x1, y1);
    let x2 = x + cos((i + 0.5) * theta + rotation) * innerRadius;
    let y2 = y + sin((i + 0.5) * theta + rotation) * innerRadius;
    vertex(x2, y2);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(22, 12, 41);
}