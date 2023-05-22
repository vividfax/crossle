class Fabric {

    constructor() {

        this.holes = [];
        this.path = [];

        let padding = 15;
        this.spacing = (width-padding*2)/8;
        let index = 0;
        for (let i = padding; i <= width-padding/2; i += this.spacing) {
            for (let j = padding; j <= height-padding; j += this.spacing) {

                this.holes.push(new Hole(index, i, j));
                index++;
            }
        }

        this.pattern = new Pattern(6, 6, this.spacing);
    }

    update() {

    }

    sew() {

        let newHoleIndex = -1;

        for (let i = 0; i < this.holes.length; i++) {
            if (this.holes[i].hover()) {
                newHoleIndex = this.holes[i].index;
                break;
            }
        }

        if (newHoleIndex == -1) return;

        let oldHoleIndex = this.path[this.path.length-1];

        if (newHoleIndex == oldHoleIndex) {
            this.path.pop();
        } else {
            this.path.push(newHoleIndex);
        }
    }

    getFlossUsed() {

        if (this.path.length <= 1) return 0;

        let distance = 0;

        for (let i = 0; i < this.path.length-1; i++) {
            distance += dist(this.holes[this.path[i]].x, this.holes[this.path[i]].y, this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
        }

        return int(distance/this.spacing*100)/100;
    }

    finish() {

    }

    display() {

        if (frontVisible) this.pattern.display();

        for (let i = 0; i < this.holes.length; i++) {
            this.holes[i].display();
        }

        stroke(150);
        strokeWeight(3);

        if (this.path.length == 0) return;

        if (frontVisible) {

            stroke(100);
            strokeWeight(6);
            for (let i = 0; i < this.path.length-1; i += 2) {
                stroke(100);
                strokeWeight(10);
                line(this.holes[this.path[i]].x, this.holes[this.path[i]].y, this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
                stroke(150);
                strokeWeight(6);
                if (i == this.path.length-2 && !this.path[0] != this.path[this.path.length-1]) stroke(255);
                line(this.holes[this.path[i]].x, this.holes[this.path[i]].y, this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
            }
            if (this.path.length == 1 || this.path[0] != this.path[this.path.length-1]) {
                stroke(100);
                strokeWeight(2);
                fill(150);
                ellipse(this.holes[this.path[0]].x, this.holes[this.path[0]].y, 15);
                fill(255);
                ellipse(this.holes[this.path[this.path.length-1]].x, this.holes[this.path[this.path.length-1]].y, 15);
            }
        } else {
            for (let i = 1; i < this.path.length-1; i += 2) {
                stroke(100);
                strokeWeight(10);
                line(width-this.holes[this.path[i]].x, this.holes[this.path[i]].y, width-this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
                stroke(150);
                strokeWeight(6);
                if (i == this.path.length-2 && this.path[0] != this.path[this.path.length-1]) stroke(255);
                line(width-this.holes[this.path[i]].x, this.holes[this.path[i]].y, width-this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
            }
            if (this.path.length == 1 || this.path[0] != this.path[this.path.length-1]) {
                stroke(100);
                strokeWeight(2);
                fill(150);
                ellipse(width-this.holes[this.path[0]].x, this.holes[this.path[0]].y, 15);
                fill(255);
                ellipse(width-this.holes[this.path[this.path.length-1]].x, this.holes[this.path[this.path.length-1]].y, 15);
            }
        }
    }
}
