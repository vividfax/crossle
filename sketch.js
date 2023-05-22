let fabric;

let frontVisible = true;

function setup() {

    document.addEventListener('touchstart', {});

    let size = 200;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        size = displayWidth < displayHeight ? displayWidth : displayHeight;
    }

    createCanvas(size, size);

    let d = new Date();
    let day = d.getDate();
    if (day < 10) day = "0"+day;
    let month = d.getMonth();
    if (month < 10) month = "0"+month;
    let seed = day+""+month+""+d.getFullYear();

    randomSeed(seed);

    newGame();
}

function draw() {

    background(255);

    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) frontVisible = false;
    else frontVisible = true;

    fabric.update();
    fabric.display();

    if (fabric.complete()) displayUI();
}

function newGame() {

    fabric = new Fabric();
}

function mousePressed() {

    fabric.sew();
}

function displayUI() {

    noStroke();
    fill(100);
    textSize(width/10);
    textAlign(LEFT, TOP);

    if (frontVisible) {
        text(fabric.getFlossUsed(), width/30, width/30);
    } else {
        scale(-1, 1);
        text(fabric.getFlossUsed(), width/30-width, width/30);
    }
}