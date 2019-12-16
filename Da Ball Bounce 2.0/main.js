// TITLE

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 600;

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


    

    for (let i = 0; i < daBalls.length; i++) {
        
        ctx.strokeStyle = "skyblue"  //"rgb(" + randomInt(0,255) + "," + randomInt(0,255) + "," + randomInt(0,255) + ")"
        ctx.fillStyle = "skyblue"   //"rgb(" + randomInt(0,255) + "," + randomInt(0,255) + "," + randomInt(0,255) + ")"
        ctx.stroke()
        ctx.beginPath();
        ctx.arc(daBalls[i].x, daBalls[i].y, daBalls[i].r, 0, 2 * Math.PI);
        ctx.fill();
       

        ctx.strokeStyle = "black"
        ctx.fillStyle = "black"
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        ctx.fillText(String(i), daBalls[i].x, daBalls[i].y + 5);


        
         
        
        

        daBalls[i].x += daBalls[i].xspd
        daBalls[i].y += daBalls[i].yspd


        // Bounce of walls
        if (daBalls[i].x + 10 > cnv.width) {
            daBalls[i].xspd = -daBalls[i].xspd
        }
        else if (daBalls[i].x - 10 < 0) {
            daBalls[i].xspd = -daBalls[i].xspd
        }
        else if (daBalls[i].y + 10 > cnv.height) {
            daBalls[i].yspd = -daBalls[i].yspd
        }
        else if (daBalls[i].y - 10 < 0) {
            daBalls[i].yspd = -daBalls[i].yspd
        }
    }


    // Ball hitting each other
    for (let a = 0; a < daBalls.length; a++) {
        for (let b = 0; b < daBalls.length; b++) {
            if (a != b && ballHit(daBalls[a], daBalls[b])) {
                daBalls[a].x += -daBalls[a].xspd
                daBalls[a].y += -daBalls[a].yspd
                daBalls[b].x += -daBalls[b].xspd
                daBalls[b].y += -daBalls[b].yspd

                


                // angle stuff
                phi = Math.atan2(daBalls[a].y - daBalls[b].y, daBalls[a].x - daBalls[b].x);
                theta1 = Math.atan2(daBalls[a].yspd, daBalls[a].xspd)
                theta2 = Math.atan2(daBalls[b].yspd, daBalls[b].xspd)
                // calculate scalar values of velocities
                v1 = Math.sqrt(daBalls[a].xspd * daBalls[a].xspd + daBalls[a].yspd * daBalls[a].yspd);
                v2 = Math.sqrt(daBalls[b].xspd * daBalls[b].xspd + daBalls[b].yspd * daBalls[b].yspd);

                

                daBalls[a].xspd = ((((v1 * Math.cos((theta1 - phi)) * (daBalls[a].m - daBalls[b].m)) + (2 * daBalls[b].m * v2 * Math.cos((theta2 - phi)))) / (daBalls[a].m + daBalls[b].m)) * Math.cos((phi))) + (v1 * Math.sin((theta1 - phi)) * Math.cos((phi + (Math.PI / 2))));
                daBalls[b].xspd = ((((v2 * Math.cos((theta2 - phi)) * (daBalls[b].m - daBalls[a].m)) + (2 * daBalls[a].m * v1 * Math.cos((theta1 - phi)))) / (daBalls[a].m + daBalls[b].m)) * Math.cos((phi))) + (v2 * Math.sin((theta2 - phi)) * Math.cos((phi + (Math.PI / 2))));

                daBalls[a].yspd = ((((v1 * Math.cos((theta1 - phi)) * (daBalls[a].m - daBalls[b].m)) + (2 * daBalls[b].m * v2 * Math.cos((theta2 - phi)))) / (daBalls[a].m + daBalls[b].m)) * Math.sin((phi))) + (v1 * Math.sin((theta1 - phi)) * Math.sin((phi + (Math.PI / 2))));
                daBalls[b].yspd = ((((v2 * Math.cos((theta2 - phi)) * (daBalls[b].m - daBalls[a].m)) + (2 * daBalls[a].m * v1 * Math.cos((theta1 - phi)))) / (daBalls[a].m + daBalls[b].m)) * Math.sin((phi))) + (v2 * Math.sin((theta2 - phi)) * Math.sin((phi + (Math.PI / 2))));



            }

        }
    }
    
    document.getElementById("output").innerHTML = ""
    

    for (let i = 0; i < daBalls.length; i++) {
         //document.getElementById("output").innerHTML += i + ": " + (daBalls[i].x).toFixed(2) + ", " + daBalls[i].y.toFixed(2) + "<br> "

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
document.addEventListener("mousemove", mousemoveHandler);


function mousedownHandler() {
    //let mass = Number(prompt("enter mass of ball"))
    daBalls.push({ x: mouseX, y: mouseY, m:10, r: randomDec(10, 10), xspd: randomDec(-2, 2), yspd: randomDec(-2, 2) })
    isMousePressed = true
}
function mouseupHandler() {
    isMousePressed = false
}



function mousemoveHandler(event) {
    let cnvRect = cnv.getBoundingClientRect();

    mouseX = Math.round(event.clientX - cnvRect.left);
    mouseY = Math.round(event.clientY - cnvRect.top);

}

function ballHit(firstBall, secondBall) {
    let distance = Math.sqrt(((firstBall.x - secondBall.x) * (firstBall.x - secondBall.x))
        + ((firstBall.y - secondBall.y) * (firstBall.y - secondBall.y)));
    if (distance < firstBall.r + secondBall.r) {

        return true

    }
}