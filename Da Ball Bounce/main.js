// TITLE

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1200;
cnv.height = 800;

// Global Var
let daBalls = []
let mouseX, mouseY;
let col = 0
let isMousePressed

// Detects a key press



// Main Program Loop
requestAnimationFrame(draw);
function draw() {

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    col++
    if (col == 7) {
    ctx.fillStyle = getRandomColor();
    ctx.strokeStyle = ctx.fillStyle;
    col = 0;
    }

    for (let i = 0; i < daBalls.length; i++) {
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(daBalls[i].x, daBalls[i].y, 10, 0, 2 * Math.PI);
        ctx.fill();

        daBalls[i].y += daBalls[i].spd
        daBalls[i].spd += 0.5
        if (daBalls[i].y + 10 > 800) {
            daBalls[i].spd = -daBalls[i].vi
        }
    }

    if(isMousePressed == true) {
        daBalls.push({ x: mouseX, y: mouseY, spd: 0, vi: Math.sqrt(2 * 0.5 * (cnv.height - mouseY))})
    }

    
    // Request another Animation Frame
    
    requestAnimationFrame(draw);
}


// Helper Functions
function randomDec(low, high) {
    // Return a random decimal between low (inclusive) and high (exclusive)
    return Math.random() * (high - low) + low;
}

function randomInt(low, high) {
    // Return a random decimal between low (inclusive) and high (exclusive)
    return Math.floor(Math.random() * (high - low) + low);
}






document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
    isMousePressed = true
}
function mouseupHandler() {
    isMousePressed = false
}



document.addEventListener("mousemove", mousemoveHandler);

function mousemoveHandler(event) {
    let cnvRect = cnv.getBoundingClientRect();

    mouseX = Math.round(event.clientX - cnvRect.left);
    mouseY = Math.round(event.clientY - cnvRect.top);

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }