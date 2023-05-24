class Hole {

    constructor(index, x, y, spacing) {

        this.index = index;
        this.x = x;
        this.y = y;

        this.radius = size/30;
        this.spacing = spacing;
    }

    update() {

    }

    hover() {

        if (dist(this.x, this.y, mouseX-width/2+size/2, mouseY-height/2+size/2) < this.spacing/2) return true;
    }

    display() {

        fabricLayer.noStroke();
        fabricLayer.rectMode(CENTER);
        // palette.dark.setAlpha(15);
        // fabricLayer.fill(palette.dark);
        // fabricLayer.rect(this.x-size/300, this.y-size/300, this.radius, this.radius);
        fabricLayer.fill(255);
        fabricLayer.rect(this.x, this.y, this.radius, this.radius);
        palette.black.setAlpha(70);
        fabricLayer.fill(palette.black);
        fabricLayer.rect(this.x, this.y, this.radius, this.radius);
        // palette.dark.setAlpha(35);
        // fabricLayer.fill(palette.dark);
        // fabricLayer.rect(this.x, this.y, this.radius, this.radius);
        palette.black.setAlpha(100);
    }
}