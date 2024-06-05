/*
  ChatGPT 4o prompts:
  - create a p5js script that plays the game of poles and rings
  - this should have been the game that has been known as towers of hanoi in the past. rewrite the game to play towers of hanoi but call it rings and poles.
  - There's a bug in the program. The rings are in the reverse order on the first pole at the beginning of the game. Correct the ordering of the rings on the first pole.
  - now move the poles so there isn't any empty space between the poles and the rings on the poles

  */
let poles = [];
let rings = [];
let numRings = 5;
let selectedRing = null;

function setup() {
  createCanvas(800, 600);
  let poleWidth = 10;
  let poleHeight = 150;
  let poleY = height - 100;
  let poleXStart = width / 4;
  for (let i = 0; i < 3; i++) {
    poles.push(new Pole(poleXStart + i * width / 4, poleY, poleWidth, poleHeight));
  }

  let ringHeight = 20;
  for (let i = 0; i < numRings; i++) {
    let size = (numRings - i) * 30;
    let ring = new Ring(poles[0].x, poles[0].y - (i + 1) * ringHeight, size, ringHeight, poles[0]);
    poles[0].addRing(ring); // Add ring to the first pole
    rings.push(ring);
  }
}

function draw() {
  background(220);
  for (let pole of poles) {
    pole.display();
  }
  for (let ring of rings) {
    ring.display();
  }
  if (selectedRing) {
    selectedRing.x = mouseX;
    selectedRing.y = mouseY;
  }
}

function mousePressed() {
  for (let ring of rings) {
    if (ring.contains(mouseX, mouseY)) {
      selectedRing = ring;
      ring.pole.removeRing(ring);
      break;
    }
  }
}

function mouseReleased() {
  if (selectedRing) {
    for (let pole of poles) {
      if (pole.contains(mouseX, mouseY)) {
        if (pole.canPlaceRing(selectedRing)) {
          selectedRing.pole = pole;
          pole.addRing(selectedRing);
        } else {
          selectedRing.resetPosition();
        }
        selectedRing = null;
        break;
      }
    }
  }
}

class Pole {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rings = [];
  }

  display() {
    fill(150);
    rectMode(CENTER);
    rect(this.x, this.y - this.height / 2, this.width, this.height);
  }

  contains(x, y) {
    return x > this.x - this.width / 2 && x < this.x + this.width / 2 && y > this.y - this.height / 2 && y < this.y + this.height / 2;
  }

  canPlaceRing(ring) {
    if (this.rings.length == 0) {
      return true;
    } else {
      let topRing = this.rings[this.rings.length - 1];
      return ring.size < topRing.size;
    }
  }

  addRing(ring) {
    this.rings.push(ring);
    ring.setPosition(this.x, this.y - this.rings.length * ring.height);
  }

  removeRing(ring) {
    this.rings = this.rings.filter(r => r !== ring);
  }
}

class Ring {
  constructor(x, y, size, height, pole) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.height = height;
    this.pole = pole;
  }

  display() {
    fill(100, 100, 250);
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.height);
  }

  contains(x, y) {
    return x > this.x - this.size / 2 && x < this.x + this.size / 2 && y > this.y - this.height / 2 && y < this.y + this.height / 2;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  resetPosition() {
    this.setPosition(this.pole.x, this.pole.y - (this.pole.rings.length + 1) * this.height);
  }
}
