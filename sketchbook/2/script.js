/*
- what are the games that are played in drowning by numbers?
- what is the game played with sheep and tea cups?
- use p5js to create a game of sheep and tea cups

How to Play:
- Click on the canvas to place tea cups.
- The sheep will move around randomly, and if they collide with a tea cup, the tea cup will be knocked over.
*/
let teaCups = [];
let sheep = [];
let numSheep = 5;
let sheepSize = 20;
let teaCupSize = 20;

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < numSheep; i++) {
    sheep.push(new Sheep(random(width), random(height), sheepSize));
  }
}

function draw() {
  background(220);
  for (let cup of teaCups) {
    cup.display();
  }
  for (let s of sheep) {
    s.move();
    s.display();
    for (let cup of teaCups) {
      if (s.collidesWith(cup)) {
        cup.knockOver();
      }
    }
  }
}

function mousePressed() {
  teaCups.push(new TeaCup(mouseX, mouseY, teaCupSize));
}

class TeaCup {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.knockedOver = false;
  }

  display() {
    if (this.knockedOver) {
      fill(150);
      ellipse(this.x, this.y, this.size, this.size / 2);
    } else {
      fill(255);
      ellipse(this.x, this.y, this.size, this.size);
    }
  }

  knockOver() {
    this.knockedOver = true;
  }
}

class Sheep {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 2;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  display() {
    fill(200);
    ellipse(this.x, this.y, this.size, this.size);
  }

  collidesWith(cup) {
    let d = dist(this.x, this.y, cup.x, cup.y);
    return d < this.size / 2 + cup.size / 2;
  }
}
