let fabric;
let floss;

let frontVisible = true;

function setup() {

    createCanvas(200, 200);

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
    floss = new Floss();
}

function mousePressed() {

    if (mouseButton == LEFT) fabric.sew();
    else fabric.finish();
}

function displayUI() {

    noStroke();
    fill(100);
    textSize(20);
    textAlign(LEFT, TOP);
    text(fabric.getFlossUsed(), 8, 6);
}