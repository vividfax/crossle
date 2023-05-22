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
        palette.dark.setAlpha(15);
        fabricLayer.fill(palette.dark);
        fabricLayer.rect(this.x-width/300, this.y-width/300, this.radius, this.radius);
        fabricLayer.fill(255);
        fabricLayer.rect(this.x, this.y, this.radius, this.radius);
        palette.dark.setAlpha(35);
        fabricLayer.fill(palette.dark);
        fabricLayer.rectMode(CENTER);
        fabricLayer.rect(this.x, this.y, this.radius, this.radius);
        palette.dark.setAlpha(100);
    }
}