class Hole {

    constructor(index, x, y, spacing) {

        this.index = index;
        this.x = x;
        this.y = y;

        this.radius = width/30;
        this.spacing = spacing;
    }

    update() {

    }

    hover() {

        if (dist(this.x, this.y, mouseX, mouseY) < this.spacing/2) return true;
    }

    display() {

        fabricLayer.noStroke();
        fabricLayer.fill(210);
        palette.dark.setAlpha(10);
        if (fabric.complete()) fabricLayer.fill(palette.dark);
        fabricLayer.rectMode(CENTER);
        fabricLayer.rect(this.x, this.y, this.radius, this.radius);
        palette.dark.setAlpha(100);
    }
}