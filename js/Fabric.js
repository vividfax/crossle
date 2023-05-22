class Fabric {

    constructor() {

        this.holes = [];
        this.path = [];

        let padding = width/14;
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

    complete() {

        if (this.path.length > 1 && this.path[0] == this.path[this.path.length-1]) return true;
    }

    display(frontSide) {

        fabricLayer.background(255);

        if (frontSide) this.pattern.display();

        for (let i = 0; i < this.holes.length; i++) {
            this.holes[i].display();
        }

        fabricLayer.stroke(150);
        fabricLayer.strokeWeight(3);

        if (this.path.length == 0) return;

        if (frontSide) {

            fabricLayer.stroke(100);
            fabricLayer.strokeWeight(6);
            for (let i = 0; i < this.path.length-1; i += 2) {
                fabricLayer.stroke(100);
                fabricLayer.strokeWeight(width/20);
                fabricLayer.line(this.holes[this.path[i]].x, this.holes[this.path[i]].y, this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
                fabricLayer.stroke(150);
                fabricLayer.strokeWeight(width/20-width/75);
                if (i == this.path.length-2 && !this.complete()) fabricLayer.stroke(255);
                fabricLayer.line(this.holes[this.path[i]].x, this.holes[this.path[i]].y, this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
            }
            if (this.path.length == 1 || !this.complete()) {
                fabricLayer.stroke(100);
                fabricLayer.strokeWeight(width/150);
                fabricLayer.fill(150);
                fabricLayer.ellipse(this.holes[this.path[0]].x, this.holes[this.path[0]].y, width/15);
                fabricLayer.fill(255);
                fabricLayer.ellipse(this.holes[this.path[this.path.length-1]].x, this.holes[this.path[this.path.length-1]].y, width/15);
            }
        } else {
            for (let i = 1; i < this.path.length-1; i += 2) {
                fabricLayer.stroke(100);
                fabricLayer.strokeWeight(width/20);
                fabricLayer.line(width-this.holes[this.path[i]].x, this.holes[this.path[i]].y, width-this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
                fabricLayer.stroke(150);
                fabricLayer.strokeWeight(width/20-width/75);
                if (i == this.path.length-2 && !this.complete()) fabricLayer.stroke(255);
                fabricLayer.line(width-this.holes[this.path[i]].x, this.holes[this.path[i]].y, width-this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
            }
            if (this.path.length == 1 || !this.complete()) {
                fabricLayer.stroke(100);
                fabricLayer.strokeWeight(width/150);
                fabricLayer.fill(150);
                fabricLayer.ellipse(width-this.holes[this.path[0]].x, this.holes[this.path[0]].y, width/15);
                fabricLayer.fill(255);
                fabricLayer.ellipse(width-this.holes[this.path[this.path.length-1]].x, this.holes[this.path[this.path.length-1]].y, width/15);
            }
        }

    }
}
