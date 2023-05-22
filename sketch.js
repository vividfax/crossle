let fabric;

let frontVisible = true;

let myCanvas;
let fabricLayer;
let perlinLayer;
let exportLayer;

let saveImageButton;
let resetButton;

let scoreFont;

let palette;

let puzzleNumber;

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
    colorMode(HSB, 100);
    
    fabricLayer = createGraphics(size, size);
    perlinLayer = createGraphics(size, size);
    exportLayer = createGraphics(size*2+30, size+20);

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

    let startDate = new Date("05/22/2023");
    let todayDate = new Date();
    let difference = startDate.getTime()-todayDate.getTime();
    puzzleNumber = int(difference/(1000*60*60*24));

    // randomSeed(seed);
    // noiseSeed(seed);

    newGame();
}

function draw() {

    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) frontVisible = false;
    else frontVisible = true;

    fabric.update();
    fabric.display(frontVisible);

    saveImageButton.style("display", "none");
    if (fabric.complete()) displayUI(fabricLayer, frontVisible);

    resetButton.style("display", "none");
    if (fabric.complete()) resetButton.style("display", "inline");

    image(fabricLayer, 0, 0);
}

function newGame() {

    palette = {
        white: color(random(100), random(0, 10), random(80, 100)),
        light: color(random(100), random(20, 40), random(80, 100)),
        mid: color(random(100), 100, 90),
        dark: color(random(100), 100, 30),
    }

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let perlin = noise(i/width*1.5, j/width*1.5);
            let colour = lerpColor(palette.light, palette.white, perlin);
            perlinLayer.set(i, j, colour);
        }
    }

    perlinLayer.updatePixels();

    fabric = new Fabric();
}

function mousePressed() {

    fabric.sew();
}

function displayUI(cnvs, frontSide) {

    cnvs.push();
    cnvs.noStroke();
    cnvs.strokeJoin(ROUND);
    cnvs.fill(palette.dark);
    cnvs.textSize(width/13);
    cnvs.textAlign(LEFT, TOP);
    cnvs.textFont(scoreFont);

    if (frontSide) {
        cnvs.text("CROSSLE #"+puzzleNumber, width/30, width/50);
        cnvs.textAlign(RIGHT, BOTTOM);
        cnvs.text(fabric.getFlossUsed()+" mm", width-width/30, width-width/50);
    } else {
        palette.dark.setAlpha(50);
        cnvs.fill(palette.dark);
        cnvs.scale(-1, 1);
        cnvs.text("CROSSLE #"+puzzleNumber, width/30-width, width/50);
        cnvs.textAlign(RIGHT, BOTTOM);
        cnvs.text(fabric.getFlossUsed()+" mm", width-width/30-width, width-width/50);
        palette.dark.setAlpha(100);
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
    displayUI(exportLayer, true);
    exportLayer.translate(width+10, 0);
    fabric.display(false);
    exportLayer.image(fabricLayer, 0, 0);
    displayUI(exportLayer, false);

    exportLayer.pop();

    save(exportLayer, "crossle", "png");
}

function reset() {

    fabric.path = [];
}