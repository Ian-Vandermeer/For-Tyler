// TITLE

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 1000;
cnv.height = 800;


// Global Var
let upgrade1price = 10
let upgrade2price = 500
let upgrade3price = 15000
let upgrade4price = 500000
let prestiegeprice = 10000000
let brokeval = 0
let prestiegelevel = 1

let jonPrice = 100
let jonevolvePrice = 1000
let odiePrice = 10000
let odiefoodPrice = 100000
let jonSpeed = 0
let odieSpeed = 0
let worshipSpeed = 0
let cultistsPrice = 1000000
let cultSpeedprice = 10000000

let clickValue = 1
let moneyTotal = 0

// da button factory

let xbucks = [];
let ybucks = [];
let wbucks = [];
let hbucks = [];
let xspdbucks = [];
let yspdbucks = [];

requestAnimationFrame(draw);

function draw() {

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    // Logic
    for (i = 0; i < xbucks.length; i++) {
        // Move bucks
        xbucks[i] += xspdbucks[i];
        ybucks[i] += yspdbucks[i] += 0.1;
        // Draw bucks
        ctx.drawImage(document.getElementById('gbuck'), xbucks[i], ybucks[i], wbucks[i], hbucks[i]);
        // Remove off screen bucks
        if (xbucks[i] + 20 > cnv.width || xbucks[i] + 100 < 0 || ybucks[i] + 20 > cnv.height) {
            xbucks.splice(i, 1)
            ybucks.splice(i, 1)
            wbucks.splice(i, 1)
            hbucks.splice(i, 1)
            xspdbucks.splice(i, 1)
            yspdbucks.splice(i, 1)
        }
    }

// jon/worker stuff
    moneyTotal += jonSpeed
    moneyTotal += odieSpeed
    moneyTotal += worshipSpeed

    // silly pictures
    if (brokeval == 0) {
        document.getElementById("broke").style.display = "none"
    } else if (brokeval == 1) {
        document.getElementById("broke").style.display = "unset"
    } else if (brokeval == 2) {
        document.getElementById("broke").src = 'Images/still-broke.jpg'
    } else if (brokeval == 3) {
        document.getElementById("broke").src = 'Images/please-stop.jpg'
    } else if (brokeval == 9) {
        document.getElementById("broke").src = 'Images/greta.jpg'
    }
    else if (brokeval == 10) {
        document.location.reload(true);
    }




    // Update text n stuff
    document.getElementById('totalmonie').innerHTML = 'Total money: ' + moneyTotal.toFixed(2);
    document.getElementById('value').innerHTML = ' Click Value ' + (clickValue * prestiegelevel).toFixed(2);
    document.getElementById('upgrade1cost').innerHTML = 'cost: ' + (upgrade1price).toFixed(2) + " Gbucks";
    document.getElementById('upgrade1reward').innerHTML = 'Gbuck harvest amount ' + ((clickValue + 0.5) * prestiegelevel).toFixed(2);
    document.getElementById('upgrade2cost').innerHTML = 'cost: ' + (upgrade2price).toFixed(2) + " Gbucks";
    document.getElementById('upgrade2reward').innerHTML = 'Gbuck harvest amount ' + ((clickValue + 10) * prestiegelevel).toFixed(2);
    document.getElementById('upgrade3cost').innerHTML = 'cost: ' + (upgrade3price).toFixed(2) + " Gbucks";
    document.getElementById('upgrade3reward').innerHTML = 'Gbuck harvest amount ' + ((clickValue + 75) * prestiegelevel).toFixed(2);
    document.getElementById('upgrade4cost').innerHTML = 'cost: ' + (upgrade4price).toFixed(2) + " Gbucks";
    document.getElementById('upgrade4reward').innerHTML = 'Gbuck harvest amount ' + ((clickValue + 1000) * prestiegelevel).toFixed(2);
    document.getElementById('prestiegecost').innerHTML = 'cost: ' + prestiegeprice.toFixed(2) + " Gbucks";
    document.getElementById('prestiegereward').innerHTML = 'ASCEND';

    if(jonSpeed == 0) {
        document.getElementById('jonprice').innerHTML = 'cost: ' + (jonPrice).toFixed(2) + " Gbucks";
    document.getElementById('jonreward').innerHTML = 'Gbuck harvest amount 3 per second' 
    } else {
        document.getElementById('jonprice').innerHTML = ''
        document.getElementById('jonreward').innerHTML = ''
    }
    
   
    document.getElementById('evolveprice').innerHTML = 'cost: ' + (jonevolvePrice).toFixed(2) + " Gbucks";
    document.getElementById('evolvereward').innerHTML = 'Gbuck harvest amount ??? per second'
    document.getElementById('odieprice').innerHTML = 'cost: ' + (odiePrice).toFixed(2) + " Gbucks";
    document.getElementById('odiereward').innerHTML = 'Gbuck harvest amount 10 per second' 
    document.getElementById('dogfoodprice').innerHTML = 'cost: ' + (odiefoodPrice).toFixed(2) + " Gbucks";
    document.getElementById('dogfoodreward').innerHTML = 'Gbuck harvest amount 60 per second'


// lots of price stuff
    addMandBandT(moneyTotal, 'totalmonie', 'Total money: ')
    addMandBandT((clickValue * prestiegelevel), 'value', ' Click Value ')
    addMandBandT(upgrade1price, 'upgrade1cost', 'cost: ')
    addMandBandT(((clickValue + 0.5) * prestiegelevel), 'upgrade1reward', 'Gbuck harvest amount ')
    addMandBandT(upgrade2price, 'upgrade2cost', 'cost: ')
    addMandBandT(((clickValue + 10) * prestiegelevel), 'upgrade2reward', 'Gbuck harvest amount ')
    addMandBandT(upgrade3price, 'upgrade3cost', 'cost: ')
    addMandBandT(((clickValue + 75) * prestiegelevel), 'upgrade3reward', 'Gbuck harvest amount ')
    addMandBandT(upgrade4price, 'upgrade4cost', 'cost: ')
    addMandBandT(((clickValue + 1000) * prestiegelevel), 'upgrade4reward', 'Gbuck harvest amount ')
    addMandBandT(prestiegeprice, 'prestiegecost', 'cost: ')

    if (prestiegelevel >= 10) {
        document.getElementById("sacrifice").style.display = "unset"
        document.getElementById("sacrificecost").innerHTML = "cost: 1T"
    }
    
    
    // Request another Animation Frame
    requestAnimationFrame(draw);
}

document.getElementById('lasagna').addEventListener('click', addmoney);
document.getElementById('upgrade1').addEventListener('click', upgradeclick);
document.getElementById('upgrade2').addEventListener('click', upgradeclick2);
document.getElementById('upgrade3').addEventListener('click', upgradeclick3);
document.getElementById('upgrade4').addEventListener('click', upgradeclick4);
document.getElementById('prestiege').addEventListener('click', prestiege);
document.getElementById('sacrifice').addEventListener('click', vicroy);
document.getElementById('jon').addEventListener('click', buyJon);
document.getElementById('jonevolve').addEventListener('click', evolveJon);
document.getElementById('odie').addEventListener('click', buyOdie);
document.getElementById('dogfood').addEventListener('click', feedOdie);





function addMandBandT(aValue, element, displayText) {
    if (aValue >= 1000000 && aValue < 1000000000) {
        document.getElementById(element).innerHTML = displayText + (Number(aValue) / 1000000).toFixed(3) + "M";
    }
    if (aValue >= 1000000000 && aValue < 1000000000000) {
        document.getElementById(element).innerHTML = displayText + (Number(aValue) / 1000000000).toFixed(3) + "B";
    }
    if (aValue >= 1000000000000 && aValue < 1000000000000000) {
        document.getElementById(element).innerHTML = displayText + (Number(aValue) / 1000000000000).toFixed(3) + "T";
    }

}

function addmoney() {
    brokeval = 0
    moneyTotal += clickValue * prestiegelevel
    document.getElementById("broke").src = 'Images/Broke.jpg'

    xbucks.push(randomDec(400, 450));
    ybucks.push(300);
    wbucks.push(randomInt(100, 100));
    hbucks.push(randomInt(100, 100));
    xspdbucks.push(randomDec(-5, 5));
    yspdbucks.push(randomDec(-10, -5));
}

function upgradeclick() {
    if (moneyTotal >= upgrade1price) {
        moneyTotal -= upgrade1price
        upgrade1price *= 1.07
        clickValue += 0.5
        brokeval = 0

    }
    else {
        brokeval += 1
    }


}
function upgradeclick2() {
    if (moneyTotal >= upgrade2price) {
        moneyTotal -= upgrade2price
        upgrade2price *= 1.11
        clickValue += 10;
        brokeval = 0
    }
    else {
        brokeval += 1
    }

}
function upgradeclick3() {
    if (moneyTotal >= upgrade3price) {
        moneyTotal -= upgrade3price
        upgrade3price *= 1.13
        clickValue += 75;
        brokeval = 0
    }
    else {
        brokeval += 1
    }


}
function upgradeclick4() {
    if (moneyTotal >= upgrade4price) {
        moneyTotal -= upgrade4price
        upgrade4price *= 1.17
        clickValue += 1000;
        brokeval = 0
    }
    else {
        brokeval += 1
    }

}
function prestiege() {
    if (moneyTotal >= prestiegeprice) {
        moneyTotal = 0;
        clickValue = 1;
        prestiegeprice *= 1.43
        upgrade1price = 10
        upgrade2price = 500
        upgrade3price = 15000
        upgrade4price = 500000
        prestiegelevel *= 1.5;


    }
}
function vicroy() {
    if (moneyTotal >= 1000000000000) {
        document.getElementById('html').style.display = 'none'
        document.getElementById("fluteMan").style.display = "unset";
        document.getElementById("vicroytext").innerHTML = "you can now vibe with the gods";


    }

}

function buyJon () {
    if(moneyTotal >= jonPrice) {
        moneyTotal -= jonPrice;
        document.getElementById("jon").src = "Images/jondancing.gif"
        jonSpeed += 0.05
    }
}


function evolveJon() {
    if(moneyTotal >= jonevolvePrice) {
        moneyTotal -= jonevolvePrice
        jonSpeed *= 1.1 
        jonSpeed += 1
        jonevolvePrice *= 1.18

    }
}

function buyOdie() {
   if (moneyTotal >= odiePrice) {

    moneyTotal -= odiePrice;
        document.getElementById("odie").src = ""
        odieSpeed += 1.2
   }
}

function feedOdie() {
    if(moneyTotal >= odiefoodPrice) {
        moneyTotal -= odiefoodPrice
        odieSpeed *= 1.4
        odieSpeed += 5
        odiefoodPrice *= 1.2
    }
}
function buyCultists() {
    if(moneyTotal >= cultistsPrice) {
        moneyTotal -= cultistsPrice
        worshipSpeed += 100
        cultistsPrice *= 1.3
    }
}
function upgradeCultists() {
    if(moneyTotal >= cultSpeedprice) {
        moneyTotal -= cultSpeedprice
        worshipSpeed *= 1.6
        worshipSpeed += 25
        cultSpeedprice *= 1.5
   
    }
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