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

class Planet {
  constructor(src, i, scale) {
    this.src = src;
    this.travel = 0.1;
    this.i = i;
    this.scale = scale;
  }

  draw(context, canvas) {
    context.save();

    const x = getXPointOnEllipse(getXRadius(this.i), getYRadius(this.i), Math.PI/2 * this.travel)//(Math.PI+ Math.PI) * this.travel );
    const y = getYPointOnEllipse(getXRadius(this.i), getYRadius(this.i), Math.PI/2 * this.travel) // (Math.PI+ Math.PI) * this.travel);
    
    const img = new Image();
    img.onload = () => {
      context.drawImage(img, x+10, canvas.height-100-y, img.width/15, img.height/15);
    };
    img.src = this.src;
    context.restore();
  }
}


function draw() {
  const canvas = document.getElementById("galaxyCanvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(255, 255, 255)";
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = "rgba(255, 255, 255)";
      ctx.beginPath();
      // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
      ctx.ellipse(90, canvas.height-50, getXRadius(i), getYRadius(i), 0, 0, 2 * Math.PI);
      ctx.stroke();
    }
    // Load and display planet
    ctx.imageSmoothingEnabled = true;
    for (let i = 0; i < 10; i++) {
      const mars = new Planet(`/images/planet_${i+1}.png`, i);
      mars.travel = 0.1*i;
      mars.draw(ctx, canvas);
    }
    
  }
}
draw();