let fabric;

let frontVisible = true;

let myCanvas;
let fabricLayer;
let exportLayer;

let saveImageButton;
let resetButton;

let scoreFont;

function preload() {

    scoreFont = loadFont("./fonts/Nunito-SemiBold.ttf");
}

function setup() {

    document.addEventListener('touchstart', {});

    let size = 200;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        size = displayWidth < displayHeight ? displayWidth : displayHeight;
    }

    myCanvas = createCanvas(size, size);
    
    fabricLayer = createGraphics(size, size);
    exportLayer = createGraphics(size*2+30, size+20);
    fabricLayer.textFont(scoreFont);

    saveImageButton = select("#save-image");
    let buttonY = size/2+20;
    saveImageButton.style("transform", "translate(-50%, "+buttonY+"px)")
    saveImageButton.mousePressed(saveImage);

    resetButton = select("#reset");
    buttonY = -size/2-20-40;
    resetButton.style("transform", "translate(-50%, "+buttonY+"px)")
    resetButton.mousePressed(reset);

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

    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) frontVisible = false;
    else frontVisible = true;

    fabric.update();
    fabric.display(frontVisible);

    saveImageButton.style("display", "none");
    if (fabric.complete()) displayUI(fabricLayer);

    resetButton.style("display", "none");
    if (fabric.complete()) resetButton.style("display", "inline");

    image(fabricLayer, 0, 0);
}

function newGame() {

    fabric = new Fabric();
}

function mousePressed() {

    fabric.sew();
}

function displayUI(cnvs) {

    cnvs.push();
    cnvs.noStroke();
    cnvs.strokeJoin(ROUND);
    cnvs.fill("#12263A");
    cnvs.textSize(width/10);
    cnvs.textAlign(LEFT, TOP);

    if (frontVisible || cnvs == exportLayer) {
        cnvs.text(fabric.getFlossUsed(), width/30, width/150);
    } else {
        cnvs.scale(-1, 1);
        cnvs.text(fabric.getFlossUsed(), width/30-width, width/150);
    }

    cnvs.pop();

    saveImageButton.style("display", "inline");
}

function saveImage() {

    exportLayer.background("#333");

    exportLayer.push();

    exportLayer.translate(10, 10);
    fabric.display(true);
    exportLayer.image(fabricLayer, 0, 0);
    displayUI(exportLayer);
    fabric.display(false);
    exportLayer.image(fabricLayer, width+10, 0);

    exportLayer.pop();

    save(exportLayer, "crossle", "png");
}

function reset() {

    fabric.path = [];
}