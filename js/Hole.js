class Hole {

    constructor(index, x, y) {

        this.index = index;
        this.x = x;
        this.y = y;

        this.radius = width/25;
    }

    update() {

    }

    hover() {

        if (dist(this.x, this.y, mouseX, mouseY) < this.radius) return true;
    }

    display() {

        noStroke();
        fill(210);
        rectMode(CENTER);
        rect(this.x, this.y, this.radius, this.radius);
    }
}