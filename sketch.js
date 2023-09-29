let fabric;

let frontVisible = true;

let myCanvas;
let fabricLayer;
let perlinLayer;

let saveImageButton;
let resetButton;
let seeBackButton;

let scoreFont;

let palette;

let puzzleNumber;
let myNoiseSeed;

let size = 300;
let mobile = false;

let interacted = false;

function preload() {

    scoreFont = loadFont("./fonts/Nunito-SemiBold.ttf");
}

function setup() {

    setupTouchEvents();

    size = 300;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        size = displayWidth < displayHeight ? displayWidth : displayHeight;
        mobile = true;
    }

    myCanvas = createCanvas(size*2+(size/30)*3, size+(size/30)*2);
    colorMode(HSB, 100);

    fabricLayer = createGraphics(size, size);
    perlinLayer = createGraphics(size, size);

    saveImageButton = select("#save-image");
    let buttonY = size/2+15;
    saveImageButton.style("transform", "translate(-50%, "+buttonY+"px)")
    saveImageButton.style("width", "200px")
    saveImageButton.mousePressed(saveImage);

    resetButton = select("#reset");
    buttonY = -size/2-15-40;
    let buttonX = 5;
    resetButton.style("transform", "translate("+buttonX+"px,"+buttonY+"px)")
    resetButton.mousePressed(reset);

    seeBackButton = select("#see-back");
    buttonY = -size/2-15-40;
    buttonX = -145-5;
    seeBackButton.style("transform", "translate("+buttonX+"px,"+buttonY+"px)")
    seeBackButton.mousePressed(seeBack);

    let startDate = new Date("09/30/2023");
    let todayDate = new Date();
    let difference = todayDate.getTime()-startDate.getTime();
    puzzleNumber = int(difference/(1000*60*60*24));

    let d = new Date();
    let day = d.getDate();
    if (day < 10) day = "0"+day;
    let month = d.getMonth();
    if (month < 10) month = "0"+month;
    let seed = day+""+month+""+d.getFullYear();
    // seed = "22042023";
    let hash = hashCode(seed);

    myNoiseSeed = int(random(123456789))
    randomSeed(hash);
    if (puzzleNumber == getItem("puzzleNumber")) {
        if (getItem("noiseSeed") != null) myNoiseSeed = getItem("noiseSeed");
    }
    noiseSeed(myNoiseSeed);

    newGame();

    if (puzzleNumber == getItem("puzzleNumber")) {
        fabric.path = getItem("path");
    }
}

function draw() {

    background(palette.black);
    push();
    translate(width/2-size/2, height/2-size/2);

    // if (interacted &&( mouseX < width/2-size/2 || mouseX > width/2+size/2 || mouseY < height/2-size/2 || mouseY > height/2+size/2)) frontVisible = false;
    // else frontVisible = true;

    // if (document.querySelector('button:hover')) {
    //     frontVisible = true;
    // }

    fabric.update();
    fabric.display(frontVisible);

    image(fabricLayer, 0, 0, size, size);

    saveImageButton.style("display", "none");
    if (fabric.complete()) displayUI(frontVisible);

    resetButton.style("display", "none");
    seeBackButton.style("display", "none");
    if (fabric.complete()) {
        resetButton.style("display", "inline");
        seeBackButton.style("display", "inline");
    }

    pop();
}

function newGame() {

    palette = {
        white: color(random(100), random(0, 10), random(80, 100)),
        light: color(random(100), random(40, 60), random(60, 100)),
        mid: color(random(100), 100, 90),
        dark: color(random(100), 100, 30),
        black: color("#839EA1"),
    }

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let perlin = noise(i/size, j/size);
            let colour = lerpColor(palette.light, palette.white, perlin);
            perlinLayer.set(i, j, colour);
        }
    }

    perlinLayer.updatePixels();

    fabric = new Fabric();

    // fabric.path = presetPath;
}

function mousePressed() {

    if (!interacted) interacted = true;

    if (!frontVisible) return;

    fabric.sew();

    if (fabric.complete()) {
        storeItem("puzzleNumber", puzzleNumber);
        storeItem("path", fabric.path);
        storeItem("noiseSeed", myNoiseSeed);
    }
}

function touchStarted() {

    mousePressed();
}

function displayUI(frontSide) {

    push();
    noStroke();
    strokeJoin(ROUND);
    fill(palette.dark);
    textSize(size/13);
    textAlign(LEFT, TOP);
    textFont(scoreFont);

    if (frontSide) {
        text("Crossle #"+puzzleNumber, size/30, size/50);
        textAlign(RIGHT, BOTTOM);
        text(fabric.getFlossUsed()+" mm", size-size/30, size-size/50);
    } else {
        palette.dark.setAlpha(50);
        fill(palette.dark);
        scale(-1, 1);
        text("Crossle #"+puzzleNumber, size/30-size, size/50);
        textAlign(RIGHT, BOTTOM);
        text(fabric.getFlossUsed()+" mm", size-size/30-size, size-size/50);
        palette.dark.setAlpha(100);
    }

    pop();

    saveImageButton.style("display", "inline");
}

function saveImage() {

    background(palette.black);

    push();

    translate((size/30), (size/30));
    fabric.display(true);
    image(fabricLayer, 0, 0);
    displayUI(true);
    translate(size+(size/30), 0);
    fabric.display(false);
    image(fabricLayer, 0, 0);
    displayUI(false);

    pop();

    if (mobile) {
        saveCanvas(canvas, "crossle", "png");
    } else {
        let dataUrl = canvas.toDataURL("png");
        window.location.href = dataUrl;
    }
}

function reset() {

    fabric.path = [];

    storeItem("puzzleNumber", puzzleNumber);
    storeItem("path", []);
}

function seeBack() {

    frontVisible = !frontVisible;

    if (frontVisible) {
        seeBackButton.html("View back");
    } else {
        seeBackButton.html("View front");
    }
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function setupTouchEvents() {

    canvas.addEventListener("gesturestart", absorbEvent);
    canvas.addEventListener("gesturechange", absorbEvent);
    canvas.addEventListener("gestureend", absorbEvent);
    canvas.addEventListener("touchstart", absorbEvent);
    canvas.addEventListener("touchend", absorbEvent);
    canvas.addEventListener("touchmove", absorbEvent);
    canvas.addEventListener("touchcancel", absorbEvent);
}

function absorbEvent(event) {

    event.preventDefault();
    event.returnValue = false;
}
