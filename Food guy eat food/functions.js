document.addEventListener("mousemove", mousemoveHandler);

function mousemoveHandler(event) {
    let cnvRect = cnv.getBoundingClientRect();

    mouseX = Math.round(event.clientX - cnvRect.left);
    mouseY = Math.round(event.clientY - cnvRect.top);

}


document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
    mouseIsPressed = true;
}
function mouseupHandler() {
    mouseIsPressed = false;
}



function findxVibes() {
    run = player.x - mouseX
    rise = player.y - mouseY
    h = Math.hypot(run, rise)
    dx = (run / h) * ((40 / (player.r / 1.25)) + 6.75) //speed here
    return -dx
}

function findyVibes() {
    rise = player.y - mouseY
    run = player.x - mouseX
    h = Math.hypot(run, rise)
    dy = (rise / h) * ((40 / (player.r / 1.25)) + 6.75) // speed here
    return -dy
}


function playerEatYummie(i) {

    if (ballHit(yummies[i])) {
        if (player.r >= 325) {

            backgroundZoom -= yummies[i].r / 100

        } else {
            player.r += yummies[i].r / 10

        }


        if (yummies[i].r >= 4) {
            let audio = document.getElementById('eat1')
            audio.currentTime = 0;
            audio.play();
        }
        else if (yummies[i].r >= 3) {
            let audio = document.getElementById('eat2')
            audio.currentTime = 0;
            audio.play();
        }
        else if (yummies[i].r >= 2) {
            let audio = document.getElementById('eat3')
            audio.currentTime = 0;
            audio.play();
        }

        yummies.splice(i, 1)
    }

}

function trackPlayer() {
    // Checks if mouse is in the canvas and does the move stuff/thing
    if (mouseX <= cnv.width && mouseX >= 0 && mouseY <= cnv.height && mouseY >= 0) {

        // What direction the player needs to move
        player.xSpd = findxVibes()
        player.ySpd = findyVibes()

        backgroundScrollX -= player.xSpd
        backgroundScrollY -= player.ySpd

        // checks and keeps the ball in the boundries 
        if (backgroundScrollX >= 0) {
            backgroundScrollX = 0
        }

        if (backgroundScrollX <= -4970) {
            backgroundScrollX = -4970
        }

        if (backgroundScrollY >= 0) {
            backgroundScrollY = 0

        }

        if (backgroundScrollY <= -4970) {
            backgroundScrollY = -4970
        }
    }

}


function ballHit(yummiess) {
    dx = (player.x) - (yummiess.x + backgroundScrollX);
    dy = (player.y) - (yummiess.y + backgroundScrollY);
    distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < player.r + yummiess.r) {
        return true
    }
}

// AI functions

function AICollide(){
    for (let a = 0; a < AIs.length; a++) {
        for (let b = 0; b < AIs.length; b++) {
            if (a != b && AICanibalize(AIs[a], AIs[b])) {
                if (AIs[a].r > AIs[b].r * 1.1) {
                    // SA Adding here
                    newSA = (Math.pow(AIs[a].r, 2) * Math.PI) + (Math.pow(AIs[b].r, 2) * Math.PI)
                    //   find new radius
                    AIs[a].r = Math.sqrt(newSA / Math.PI)

                    AIs.splice(b, 1)

                } else if (AIs[b].r > AIs[a].r * 1.1) {
                    // SA Adding here
                    newSA = (Math.pow(AIs[a].r, 2) * Math.PI) + (Math.pow(AIs[b].r, 2) * Math.PI)
                    //   find new radius
                    AIs[b].r = Math.sqrt(newSA / Math.PI)

                    AIs.splice(a, 1)
                }
            }
        }
    }
}


    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function goodcolor() {
        colors = ['#7FFF00','#008000','#ADFF2F','#00FF00','#00FF7F','#3CB371','#00FA9A','#7CFC00','#228B22','#00FFFF','#7FFFD4','#6495ED','#00FFFF','#00CED1','#1E90FF','#ADD8E6','#E0FFFF','#87CEFA','#0000CD','#4169E1','#40E0D0',]
        return colors[randomInt(0, colors.length)]
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






// \/\/\/\/\/\/\/ stupid stuff no one wants \/\/\/\/\/\/


// function AIEatYummie(i) {
//     if (AIHit(yummies[i])) {
//             AI.r += yummies[i].r / 10
//         yummies.splice(i, 1)
//     }
// }


//  function AIHit(yummiess) {
//     dx = (AI.x + backgroundScrollX) - (yummiess.x + backgroundScrollX);
//      dy = (AI.y + backgroundScrollY) - (yummiess.y + backgroundScrollY);
//      distance = Math.sqrt(dx * dx + dy * dy);
//      if (distance < AI.r + yummiess.r) {
//          return true
//     }
    
    
//  }


// function findCloseYummie() {
//     close = yummies[0]
//     distance2 = 99999
//     for (let i = 1; i < yummies.length; i++) {
//         dx1 = (AI.x + backgroundScrollX) - (yummies[i].x + backgroundScrollX);
//         dy1 = (AI.y + backgroundScrollY) - (yummies[i].y + backgroundScrollY);
//         distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        
//         if (distance1 < distance2) {
//             close = yummies[i]
//             distance2 = distance1
//         }

//     }
//     goPlease(close)
// }

// function goPlease(close) {
//    if (yummies.length > 0) {
//     run = (AI.x + backgroundScrollX) - (close.x + backgroundScrollX)
//     rise = (AI.y + backgroundScrollY) - (close.y + backgroundScrollY)
//     h = Math.hypot(run, rise)
//     dx = (run / h) * ((40 / (AI.r / 1.25)) + 5)
    
//     rise = (AI.y + backgroundScrollY) - (close.y + backgroundScrollY)
//     run = (AI.x + backgroundScrollX) - (close.x + backgroundScrollX)
//     h = Math.hypot(run, rise)
//     dy = (rise / h) * ((40 / (AI.r / 1.25)) + 5)
    
//     AI.x += -dx 
//     AI.y += -dy 
//    }
    
// }

