// Gmaning time 

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;

let backgroundScrollX = 0
let backgroundScrollY = 0
let backgroundZoom = 50
let timer = 0
let AIs = []
let yummies = []

// Da Glob Vars
let mouseIsPressed = false;
let mouseX, mouseY;

let player = {
    x: 500,
    y: 400,
    r: 10,
    xSpd: 0,
    ySpd: 0,
}

class AI {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.r = 10;
        this.xSpd = 0;
        this.ySpd = 0;
        this.distance2 = 99999;
        this.distance1;
        this.run;
        this.rise;
        this.h;
        this.dx;
        this.dy;
        this.dx1;
        this.dy1;
        this.distance;
        this.close;
        this.newSA;

    }

    AIHit(yummiess) {

        this.dx = (this.x + backgroundScrollX) - (yummiess.x + backgroundScrollX);
        this.dy = (this.y + backgroundScrollY) - (yummiess.y + backgroundScrollY);
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (this.distance < this.r + yummiess.r) {
            return true
        }
    }

    findCloseYummie() {
        this.close = yummies[0]
        this.distance2 = 99999
        for (let i = 1; i < yummies.length; i++) {
            this.dx1 = (this.x + backgroundScrollX) - (yummies[i].x + backgroundScrollX);
            this.dy1 = (this.y + backgroundScrollY) - (yummies[i].y + backgroundScrollY);
            this.distance1 = Math.sqrt(this.dx1 * this.dx1 + this.dy1 * this.dy1);

            if (this.distance1 < this.distance2) {
                this.close = yummies[i]
                this.distance2 = this.distance1
            }

        }
        this.goPlease()
    }

    goPlease() {
        if (yummies.length > 0) {
            this.run = (this.x + backgroundScrollX) - (this.close.x + backgroundScrollX)
            this.rise = (this.y + backgroundScrollY) - (this.close.y + backgroundScrollY)
            this.h = Math.hypot(this.run, this.rise)
            this.dx = (this.run / this.h) * ((40 / (this.r / 1.25)) + 2)

            this.rise = (this.y + backgroundScrollY) - (this.close.y + backgroundScrollY)
            this.run = (this.x + backgroundScrollX) - (this.close.x + backgroundScrollX)
            this.h = Math.hypot(this.run, this.rise)
            this.dy = (this.rise / this.h) * ((40 / (this.r / 1.25)) + 2)

            this.x += -this.dx
            this.y += -this.dy
        }

    }

    AIEatYummie(i) {
        if (yummies[i] != undefined) {
            if (this.AIHit(yummies[i])) {
                this.newSA = Math.pow(this.r, 2) * Math.PI + Math.pow(yummies[i].r, 2) * Math.PI
                this.r = Math.sqrt(this.newSA / Math.PI)
                yummies.splice(i, 1)
            }
        }
    }
}



function AICanibalize(firstAI, secondAI) {
    if (firstAI != undefined && secondAI != undefined) {
        let distance = Math.sqrt(((firstAI.x - secondAI.x) * (firstAI.x - secondAI.x))
            + ((firstAI.y - secondAI.y) * (firstAI.y - secondAI.y)));
        //    Improve the collsion please
        if (distance < firstAI.r / 2 + secondAI.r) {
            return true
        }
    }
}

// Add AI to the array
for (let i = 0; i < 100; i++) {
    AIs.push(new AI(randomInt(500, 5000), randomInt(400, 5000), goodcolor()))
}

// Main Program Loop
requestAnimationFrame(draw);

function draw() {
    // Logic
    timer++
    if (timer >= 0) {
        timer = 0
        if (yummies.length <= 7500) {
            // Make yummies
            yummies.push({ x: randomInt(500, 5480), y: randomInt(400, 5390), r: randomDec(10, 10), color: getRandomColor() })
        }
    }

    // Moves the player and checks if its in the boundaries
    trackPlayer()

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // Draw the lines in  the background
    for (let z = 0; z < 180; z++) {

        ctx.beginPath();
        ctx.moveTo(z * 50 + backgroundScrollX + 485, 0);
        ctx.lineTo(z * 50 + backgroundScrollX + 485, 5000);
        ctx.stroke();

        ctx.moveTo(0, z * 50 + backgroundScrollY + 385);
        ctx.lineTo(5000, z * 50 + backgroundScrollY + 385);
        ctx.stroke();

    }

    // draw da yummies
    for (let i = 0; i < yummies.length; i++) {

        // Detects if yummie is on screen
        if (yummies[i].x + backgroundScrollX <= cnv.width && yummies[i].x + backgroundScrollX >= 0 && yummies[i].y + backgroundScrollY <= cnv.height && yummies[i].y + backgroundScrollY >= 0) {


            // draws yummies
            ctx.fillStyle = yummies[i].color
            ctx.beginPath();
            ctx.arc(yummies[i].x + backgroundScrollX, yummies[i].y + backgroundScrollY, yummies[i].r, 0, 2 * Math.PI);
            ctx.fill();

            // Checks if the player touched a yummie
            playerEatYummie(i)
        }
    }

    // calls functions for all of the AI
    for (let i = yummies.length - 1; i >= 0; i--) {
        for (let j = 0; j < AIs.length; j++) {
            AIs[j].AIEatYummie(i)

        }
    }
    for (let j = 0; j < AIs.length; j++) {
        AIs[j].findCloseYummie()
    }

    // AI hitting each other
    AICollide()

    // draw da player
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
    ctx.fill();

    // draw da AI
    for (let j = 0; j < AIs.length; j++) {
        if (AIs[j].x + backgroundScrollX <= cnv.width + AIs[j].r && AIs[j].x + backgroundScrollX >= 0 - AIs[j].r && AIs[j].y + backgroundScrollY <= cnv.height + AIs[j].r && AIs[j].y + backgroundScrollY >= 0 - AIs[j].r) {
            ctx.fillStyle = AIs[j].color
            ctx.beginPath();
            ctx.arc(AIs[j].x + backgroundScrollX, AIs[j].y + backgroundScrollY, AIs[j].r, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Draw border
    ctx.beginPath();
    ctx.lineWidth = "10";
    ctx.strokeStyle = "hotpink";
    ctx.rect(backgroundScrollX + 485, backgroundScrollY + 385, 5000, 5000);
    ctx.stroke();

    // Minimap
    ctx.lineWidth = "3";
    ctx.strokeStyle = "hotpink"
    ctx.fillStyle = "white"
    ctx.fillRect(850, 0, 150, 150)
    ctx.fillStyle = "black"
    ctx.strokeRect(850, 0, 150, 150)

    // Draw mini player
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.arc((-backgroundScrollX / 33.3) + 850, (-backgroundScrollY / 33.3), player.r / 33, 0, 2 * Math.PI);
    ctx.fill();

    // Draw mini AI
    for (let j = 0; j < AIs.length; j++) {
        ctx.fillStyle = AIs[j].color
        ctx.beginPath();
        ctx.arc((AIs[j].x / 33.3) + 835, (AIs[j].y / 33.3) - 12, AIs[j].r / 33, 0, 2 * Math.PI);
        ctx.fill();
    }
    // Request another Animation Frame
    requestAnimationFrame(draw);
}



