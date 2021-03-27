//
//  Challenge #5: Random Walker

// Author: Hirnschall Sebastian
// http://hirnschall.net
// Date: 20.May.2017
// Time: ~10min

var canvasHeight = 600+2;
var canvasWidth = 600+2;

var NumberOfWalkers = 1;

var ColorWalker = "cyan";  //cyan
var ColorLine = 255;  //white

var WidthLine = 1;

var MaxStepDistance = 20;


var walkers = [];

var fps = 20;

function setup() {
    c = createCanvas(canvasWidth, canvasHeight);
    background(51);
  

  frameRate(fps);
  
  for (i=0;i<NumberOfWalkers;++i){
    var walker = new RandomWalker(canvasWidth/2,canvasHeight/2);
    walkers.push(walker);
  }
}

function draw(){

  for(i=0;i<NumberOfWalkers;++i)
    walkers[i].update();

}

function RandomWalker(x, y) {
    this.x = x;
    this.y = y;

    this.update = function () {
      var currentX = this.x;
      var currentY = this.y;
      
      //update walker position using random: random(X) \in [0,X)
      //get some random direction
      var angle = random(2*PI);
      var stepSize = random(1,MaxStepDistance)
      //update current point usign sine/cosine
      this.x += floor(stepSize * cos(angle));
      this.y += floor(stepSize * sin(angle));
      
      
      //remove current walker point 
      //strokeWeight(WidthLine);
      //stroke(ColorWalker);
      //point(currentX,currentY);
      
      //draw line from currentX/Y to this.x/y
      strokeWeight(WidthLine);
      stroke(ColorLine);
      line(currentX, currentY, this.x, this.y);
      
      //draw walker at new position
      //strokeWeight(WidthLine);
      //stroke(ColorWalker);
      //point(this.x,this.y);
      
      
    }

}
