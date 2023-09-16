// Testing file connection
console.log("banananan");

// Canvas drawing

// Orbit globals (haha)
function getXRadius(i) {
  return 150+150*(i+1);
}

function getYRadius(i) {
  return 150+90*(i+1);
}

function getXPointOnEllipse(a, b, theta) {
  const res = (a*b) / Math.sqrt(b**2 + a**2 * (Math.tan(theta)**2))
  return res;
}

function getYPointOnEllipse(a, b, theta) {
  const res = (a*b) / Math.sqrt(a**2 + b**2 / (Math.tan(theta)**2))
  return res;
}

function distance(x0, y0, x1, y1) {
  return ((x1-x0)**2 + (y1-y0)**2)**0.5
}

class Planet {
  constructor(src, i, scale = (1/15)) {
    this.src = src;
    this.travel = 0.1;
    this.i = i;
    this.scale = scale;
  }

  getXY() {
    const x = getXPointOnEllipse(getXRadius(this.i), getYRadius(this.i), Math.PI/2 * this.travel)
    const y = getYPointOnEllipse(getXRadius(this.i), getYRadius(this.i), Math.PI/2 * this.travel) 
    return x, y
  }

  draw(context, canvas) {
    context.save();

    const x = getXPointOnEllipse(getXRadius(this.i), getYRadius(this.i), Math.PI/2 * this.travel)
    const y = getYPointOnEllipse(getXRadius(this.i), getYRadius(this.i), Math.PI/2 * this.travel) 
    
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, x+10, canvas.height-100-y, img.width*this.scale, img.height*this.scale);
    };
    img.src = this.src;
    context.restore();
  }
}

const planetList = [];
for (let i = 0; i < 5; i++) {
  let scale = 1/15;
  if (i === 4) {
    scale = 1/12;
  }
  const mars = new Planet(`/images/planet_${i+1}.png`, i, scale=scale);
  mars.travel = 0.1*i;
  planetList.push(mars);
}


// TRYING KONVA 

var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: "galaxyCanvas",
  width: width,
  height: height,
});


var layer = new Konva.Layer();
// add the layer to the stage
stage.add(layer);


for (let i = 0; i < 5; i++) {
  var oval = new Konva.Ellipse({
    x: 10,
    y: stage.height(),
    radiusX: getXRadius(i),
    radiusY: getYRadius(i),
    fill: '',
    stroke: 'white',
    strokeWidth: 4,
  });
  
  // add the shape to the layer
  layer.add(oval);
}


// add the layer to the stage

// for loops are 4 losers
// PLANET 1
let i = 0;
var imageObj = new Image();
var planetLayer = new Konva.Layer();
imageObj.onload = function () {
  var img = new Konva.Image({
    image: imageObj,
    x: getXPointOnEllipse(getXRadius(i), getYRadius(i), Math.PI /(2)) - 100,
    y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(i), getYRadius(i),  Math.PI /2),
    width: 200,
    height: 137,
    draggable: true,
    dragBoundFunc: function (pos) {
      let theta;
      if (pos.x > getXRadius(i)) theta = 0;
      else theta =  Math.PI/2 * (1 - pos.x/getXRadius(i));
      return {
        x: getXPointOnEllipse(getXRadius(i), getYRadius(i), theta) - 100,
        y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(i), getYRadius(i), theta),
      };
    },
  });
  planetLayer.add(img);
  stage.add(planetLayer);
};
imageObj.src = `/images/planet_1.png`;

// PLANET 2
let j = 1;
var imageObj2 = new Image();
var planetLayer = new Konva.Layer();
imageObj2.onload = function () {
  var img = new Konva.Image({
    image: imageObj2,
    x: getXPointOnEllipse(getXRadius(j), getYRadius(j), Math.PI /(2)) - 100,
    y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(j), getYRadius(j),  Math.PI /2),
    width: 200,
    height: 137,
    draggable: true,
    dragBoundFunc: function (pos) {
      let theta;
      if (pos.x > getXRadius(j)) theta = 0;
      else theta =  Math.PI/2 * (1 - pos.x/getXRadius(j));
      return {
        x: getXPointOnEllipse(getXRadius(j), getYRadius(j), theta) - 100,
        y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(j), getYRadius(j), theta),
      };
    },
  });
  planetLayer.add(img);
  stage.add(planetLayer);
};
imageObj2.src = `/images/planet_2.png`;


// PLANET 3
let k = 2;
var imageObj3 = new Image();
var planetLayer = new Konva.Layer();
imageObj3.onload = function () {
  var img = new Konva.Image({
    image: imageObj3,
    x: getXPointOnEllipse(getXRadius(k), getYRadius(k), Math.PI /(2)) - 100,
    y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(k), getYRadius(k),  Math.PI /2),
    width: 200,
    height: 137,
    draggable: true,
    dragBoundFunc: function (pos) {
      let theta;
      if (pos.x > getXRadius(k)) theta = 0;
      else theta =  Math.PI/2 * (1 - pos.x/getXRadius(k));
      return {
        x: getXPointOnEllipse(getXRadius(k), getYRadius(k), theta) - 100,
        y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(k), getYRadius(k), theta),
      };
    },
  });
  planetLayer.add(img);
  stage.add(planetLayer);
};
imageObj3.src = `/images/planet_3.png`;

// PLANET 4
let q = 3;
var imageObj4 = new Image();
var planetLayer = new Konva.Layer();
imageObj4.onload = function () {
  var img = new Konva.Image({
    image: imageObj4,
    x: getXPointOnEllipse(getXRadius(q), getYRadius(q), Math.PI /(2)) - 100,
    y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(q), getYRadius(q),  Math.PI /2),
    width: 200,
    height: 137,
    draggable: true,
    dragBoundFunc: function (pos) {
      let theta;
      if (pos.x > getXRadius(q)) theta = 0;
      else theta =  Math.PI/2 * (1 - pos.x/getXRadius(q));
      return {
        x: getXPointOnEllipse(getXRadius(q), getYRadius(q), theta) - 100,
        y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(q), getYRadius(q), theta),
      };
    },
  });
  planetLayer.add(img);
  stage.add(planetLayer);
};
imageObj4.src = `/images/planet_4.png`;

// PLANET 5
let h = 4;
var imageObj5 = new Image();
var planetLayer = new Konva.Layer();
imageObj5.onload = function () {
  var img = new Konva.Image({
    image: imageObj5,
    x: getXPointOnEllipse(getXRadius(h), getYRadius(h), Math.PI /(2)) - 100,
    y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(h), getYRadius(h),  Math.PI /2),
    width: 200,
    height: 137,
    draggable: true,
    dragBoundFunc: function (pos) {
      let theta;
      if (pos.x > getXRadius(h)) theta = 0;
      else theta =  Math.PI/2 * (1 - pos.x/getXRadius(q));
      return {
        x: getXPointOnEllipse(getXRadius(h), getYRadius(h), theta) - 100,
        y: stage.height() - 50 -  getYPointOnEllipse(getXRadius(h), getYRadius(h), theta),
      };
    },
  });
  planetLayer.add(img);
  stage.add(planetLayer);
};
imageObj5.src = `/images/planet_5.png`;