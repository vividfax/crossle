class Hole {

    constructor(index, x, y) {

        this.index = index;
        this.x = x;
        this.y = y;

        this.radius = width/30;
    }

    update() {

    }

    hover() {

        if (dist(this.x, this.y, mouseX, mouseY) < this.radius) return true;
    }

    display() {

        fabricLayer.noStroke();
        fabricLayer.fill(210);
        if (fabric.complete()) fabricLayer.fill(0, 40);
        fabricLayer.rectMode(CENTER);
        fabricLayer.rect(this.x, this.y, this.radius, this.radius);
    }
}