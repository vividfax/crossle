class Hole {

    constructor(index, x, y) {

        this.index = index;
        this.x = x;
        this.y = y;

        this.radius = 8;
    }

    update() {

    }

    hover() {

        if (dist(this.x, this.y, mouseX, mouseY) < this.radius) return true;
    }

    display() {

        noStroke();
        fill(220);
        rectMode(CENTER);
        rect(this.x, this.y, this.radius, this.radius);
    }
}