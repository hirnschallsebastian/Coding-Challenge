//
//  Challenge #2: Minesweeper
//  
//
//  Idea: Daniel Shiffman - The Coding Train
//  http://shiffman.net/
//
// Author: Hirnschall Sebastian
// http://hirnschall.net
// Date: 24.May.2017
// Time: ~45min


var cols;
var rows;

var w = 400;
var h = 400;

var s = 20;

var grid = [];

var totalBombCount = 50;


function setup() {
  createCanvas(w, h);

  cols = floor(w / s);
  rows = floor(h / s);


  background(51);

  for (var x = 0; x < cols; ++x) {
    for (var y = 0; y < rows; ++y) {
      var cell = new Cell(x, y);
      grid.push(cell);
      cell.draw();
    }
  }

  //place bombs
  for (var i = 0; i < totalBombCount; ++i) {
    var ok = 0;
    while (!ok) {
      var bombCell = random(grid);
      if (!bombCell.bomb) {
        bombCell.bomb = 1;
        ok = 1;
      }
    }
  }

  //get cells with bomb
  for (var i = 0; i < grid.length; ++i) {
    grid[i].update();
  }
}

function mouseClicked() {
  var x = floor(winMouseX / s);
  var y = floor(winMouseY / s);

  grid[x * cols + y].show();
}

function Cell(x, y) {
  this.x = x;
  this.y = y;

  this.bomb = 0;

  this.isShown = 0;

  this.neighbours = [];
  this.neighboursWithBomb = 0;


  this.update = function() {
    if (x > 0) {
      this.neighbours.push((x - 1) * cols + y);
      if (grid[(x - 1) * cols + y].bomb) {
        ++this.neighboursWithBomb;
      }
    }
    if (y > 0) {
      this.neighbours.push((x) * cols + y - 1);
      if (grid[(x) * cols + y - 1].bomb) {
        ++this.neighboursWithBomb;
      }
    }
    if (y < rows - 1) {
      this.neighbours.push((x) * cols + y + 1);
      if (grid[x * cols + y + 1].bomb) {
        ++this.neighboursWithBomb;
      }
    }
    if (x < cols - 1) {
      this.neighbours.push((x + 1) * cols + y);
      if (grid[(x + 1) * cols + y].bomb) {
        ++this.neighboursWithBomb;
      }
    }
    if (x < cols - 1 && y > 0) {
      this.neighbours.push((x + 1) * cols + y - 1);
      if (grid[(x + 1) * cols + y - 1].bomb) {
        ++this.neighboursWithBomb;
      }
    }
    if (x < cols - 1 && y < rows - 1) {
      this.neighbours.push((x + 1) * cols + y + 1);
      if (grid[(x + 1) * cols + y + 1].bomb) {
        ++this.neighboursWithBomb;
      }
    }
    if (y < rows - 1 && x > 0) {
      this.neighbours.push((x - 1) * cols + y + 1);
      if (grid[(x - 1) * cols + y + 1].bomb) {
        ++this.neighboursWithBomb;
      }
    }
    if (y > 0 && x > 0) {
      this.neighbours.push((x - 1) * cols + y - 1);
      if (grid[(x - 1) * cols + y - 1].bomb) {
        ++this.neighboursWithBomb;
      }
    }
  }


  this.draw = function() {
    var x = this.x * s;
    var y = this.y * s;

    stroke(255);
    noFill();
    rect(x, y, s, s);
  }

  this.show = function() {

    if (this.isShown) {
      return 0;
    }

    this.isShown = 1;

    var x = this.x * s;
    var y = this.y * s;

    stroke(255);
    fill(200);
    rect(x, y, s, s);
    textSize(20);
    noStroke();
    fill(0);
    if (this.bomb) {
      text("B", x + s / 4, y + (3.5 * s) / 4);

      fill(0, 162, 255);
      textSize(100);
      text("Game\n Over", w / 7, h / 2.5);
      noLoop();
      return;
    } else if (this.neighboursWithBomb) {
      text(this.neighboursWithBomb, x + s / 4, y + (3.5 * s) / 4);
    }

    //console.log(this.neighbours.length);
    if (!this.neighboursWithBomb) {
      for (var i = 0; i < this.neighbours.length; ++i) {
        if (!grid[this.neighbours[i]].bomb)
          grid[this.neighbours[i]].show();
      }
    }
  }
}
