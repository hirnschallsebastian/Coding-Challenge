//
//  Challenge #1: Generating a maze
//
//
//  Idea: Daniel Shiffman - The Coding Train
//  http://shiffman.net/
//
// Author: Hirnschall Sebastian
// http://hirnschall.net
// Date: 20.May.2017
// Time: ~20min


var w = 40;
var cols = 0;
var rows = 0;

var grid = [];

var current = [0, 0];

var stack = [];
var stackc = 0;

var canvasHeight = 600+2;
var canvasWidth = 600+2;

var slider;
var button;

function preload(){
      slider = createSlider(0,50,20);
      slider.position(100,canvasHeight+20);
      button = createButton("Reset");
      button.position(25,canvasHeight+20);
      button.mousePressed(setup);
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(51);

    current = [0, 0];

    cols = floor(canvasWidth / w);
    rows = floor(canvasHeight / w);



    for (var x = 0; x < cols; ++x) {
        grid[x] = new Array(rows); // add 2d array
        for (var y = 0; y < rows; ++y) {
            var cell = new Cell(x, y);
            grid[x][y] = cell;
        }
    }


    for (var x = 0; x < cols; ++x) {
        for (var y = 0; y < rows; ++y) {
            grid[x][y].show();
        }
    }

    //setInterval(update, 1000/500); //set framerate to 500

    //noLoop();
}

function draw(){
  frameRate(slider.value());

  // drawing with the mouse:
  stroke(50, 200, 200);
  noFill();
  strokeWeight(3);
  if(mouseIsPressed){             //draw line with the mouse cursor
    line(pmouseX, pmouseY, mouseX, mouseY);
  }


  var currentCell = grid[current[0]][current[1]];

  currentCell.visited = 1; //mark current cell as visited

  var next = [];

  if (currentCell.x > 0 && !grid[currentCell.x - 1][currentCell.y].visited) {
      next.push(grid[currentCell.x - 1][currentCell.y]);
  }
  if (currentCell.y > 0 && !grid[currentCell.x][currentCell.y - 1].visited) {
      next.push(grid[currentCell.x][currentCell.y - 1]);
  }
  if (currentCell.x < cols - 1 && !grid[currentCell.x + 1][currentCell.y].visited) {
      next.push(grid[currentCell.x + 1][currentCell.y]);
  }
  if (currentCell.y < rows - 1 && !grid[currentCell.x][currentCell.y + 1].visited) {
      next.push(grid[currentCell.x][currentCell.y + 1]);
  }

  if (next.length) //if there are cells available
  {
      stack.push(currentCell); //push to stack
      ++stackc;

      var nextIndex = random(next.length);
      if (nextIndex == next.length)
          nextIndex -= 1;

      var nextCell = next[floor(nextIndex)];


      if (nextCell.x > current[0] && nextCell.y == current[1]) {
          nextCell.wall[3] = 0;
          currentCell.wall[1] = 0;
      } else if (nextCell.x < current[0] && nextCell.y == current[1]) {
          nextCell.wall[1] = 0;
          currentCell.wall[3] = 0;
      } else if (nextCell.x == current[0] && nextCell.y > current[1]) {
          nextCell.wall[0] = 0;
          currentCell.wall[2] = 0;
      } else if (nextCell.x == current[0] && nextCell.y < current[1]) {
          nextCell.wall[2] = 0;
          currentCell.wall[0] = 0;
      }

      current[0] = nextCell.x;
      current[1] = nextCell.y;

      window.console.log(nextCell.x);
      window.console.log(nextCell.y);



  } else { //no unvisited cells reachable
      if (stack.length) {
          window.console.log(stack[stackc - 1]);
          current[0] = stack[stackc - 1].x;
          current[1] = stack[stackc - 1].y;
          stack.splice(stackc - 1, 1);
          --stackc;
      } else {
          //setup();  // restart after finishing
          return;
      }
  }

  //update wall:
  currentCell.show();
  grid[current[0]][current[1]].show();


  noStroke();
  fill(0, 162, 255);
  if(current[0] || current[1])
    rect(current[0] * w +2, current[1] * w +2, w -3, w -3); // making sure the blue(current) position is smaller so the 3px stroke is not overwritten
}

function Cell(x, y) {
    this.x = x;
    this.y = y;


    this.wall = [1, 1, 1, 1];


    this.visited = 0;




    this.show = function () {
        var x = this.x * w;
        var y = this.y * w;
        if (this.visited) {
          if(!this.x && !this.y)
            fill(50,200,50);
          else if(this.x == cols-1 && this.y == rows-1)
            fill(200,50,50);
          else
            fill(150);
        } else {
            noFill();
        }


        noStroke();
        rect(x, y, w, w);

        stroke(255);
        if (this.wall[0]) //h line
        {
            line(x, y, x + w, y);
        }
        if (this.wall[1]) //h line
        {
            line(x + w, y, x + w, y + w);
        }
        if (this.wall[2]) //h line
        {
            line(x, y + w, x + w, y + w);
        }
        if (this.wall[3]) //h line
        {
            line(x, y, x, y + w);
        }
    }

}
