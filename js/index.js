_MINLENGTH_ = 50;
var hasStarted = false;
var tempPoints = [];
var colorDictionary = {};
var speed = 1;
var canvElement;
var context;

function Point(x,y){ //Creation of point class to hold point data
  this.x = x;
  this.y = y;
}

function Triangle(p1,p2,p3){ //Creation of point class to hold triangles
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
}

function onLoad(){
  //Canvas setup
  canvElement = document.querySelector("#topCanv");
  context = canvElement.getContext("2d");
  generatePolygons();
}

function generatePolygons(){
  canvElement.setAttribute('width',window.innerWidth);

  var points = [];

  if(!hasStarted){
    
    for(var i = 0; i < window.innerWidth/_MINLENGTH_; i++){ //Generate points on canvas
      var point = new Point(getRndInteger(-200, window.innerWidth+200),getRndInteger(-100, 150));
      for(var j = 0; j < points.length; j++){
        if(lineDistance(points[j],point) < _MINLENGTH_){
          i--;
          point = false;
          break;
        }
      }

      if(point != false){
        points.push(point);
      }
    }
    tempPoints = points;
  }else{ //Check if points are outside of view window then set them to left side of screen
    for(var i = 0; i < tempPoints.length; i++){
      if(tempPoints[i].x > window.innerWidth+200){
        newPoint = new Point(getRndInteger(-200, 0),getRndInteger(-100, 150));
        for(var j = 0; j < tempPoints.length; j++){
          if(lineDistance(newPoint,tempPoints[j]) < _MINLENGTH_){
            i--;
            newPoint = null;
            break;
          }
        }
        if(newPoint != null){
          tempPoints[i] = newPoint;
          console.log(newPoint);
        }
      }
    }
  }


  drawPolygons(points,context);
}

function drawPolygons(points,context){
  tempPoints.sort(function(a,b){return a.x - b.x}); // Sorts array in terms of smallest point on x axis to largest
  points = tempPoints;
  context.clearRect(0,0,window.innerWidth,150);

  for(var i = 0; i < points.length-4; i++){ //Drawing of polygons
    var randCol = getRndInteger(0,11);
    context.beginPath();
    context.moveTo(points[i].x,points[i].y);
    context.lineTo(points[i+1].x,points[i+1].y);
    context.lineTo(points[i+2].x,points[i+2].y);
    context.lineTo(points[i+3].x,points[i+3].y);
    context.lineTo(points[i+4].x,points[i+4].y);
    context.closePath();

    if(hasStarted){
      randCol = colorDictionary[i];
    }
    switch(randCol){
      case 0:
        context.fillStyle = "#fd8485";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 1:
        context.fillStyle = "#fd81bf";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 2:
        context.fillStyle = "#fd81fd";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 3:
        context.fillStyle = "#bf81fd";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 4:
        context.fillStyle = "#8181fd";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 5:
        context.fillStyle = "#81bffd";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 6:
        context.fillStyle = "#81fdfd";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 7:
        context.fillStyle = "#81fdbf";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 8:
        context.fillStyle = "#81fd81";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 9:
        context.fillStyle = "#bffd81";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 10:
        context.fillStyle = "#fdfd81";
        context.fill();
        colorDictionary[i] = randCol;
        break;
      case 11:
        context.fillStyle = "#fdbf81";
        context.fill();
        colorDictionary[i] = randCol;
        break;
    } //randomizes color fill of polygon
    context.strokeStyle = '#d3d3d3';
    context.stroke();
  }
  if(!hasStarted){
    hasStarted = true;
  }

  for(var i = 0; i < tempPoints.length; i++){
    tempPoints[i].x += speed;
  }

  window.requestAnimationFrame(generatePolygons);
}

function lineDistance( point1, point2 ){
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt( xs + ys );
}

function getRndInteger(min, max) { //Randomisation function
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
