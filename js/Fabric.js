let presetPath = [61, 69, 60, 68, 59, 51, 50, 58, 49, 59, 50, 42, 51, 43, 52, 42, 41, 33, 24, 32, 23, 31, 32, 40, 41, 31, 22, 30, 21, 29, 20, 12, 11, 21, 20, 28, 19, 29, 30, 38, 39, 47, 48, 40, 49, 39, 48, 56, 55, 47, 46, 38, 37, 47, 46, 56, 65, 57, 66, 58, 67, 57, 66, 56, 57, 47, 48, 38, 39, 29, 30, 20, 21, 31, 22, 32, 23, 33, 32, 42, 41, 51, 50, 60, 59, 69, 60, 70, 61];

class Fabric {

    constructor() {

        this.holes = [];
        this.path = [];
        this.hoverStitch = -1;

        let padding = size/14;
        this.spacing = (size-padding*2)/8;
        let index = 0;
        for (let i = padding; i <= size-padding/2; i += this.spacing) {
            for (let j = padding; j <= size-padding; j += this.spacing) {

                this.holes.push(new Hole(index, i, j, this.spacing));
                index++;
            }
        }

        this.pattern = new Pattern(6, 6, this.spacing);

        this.fromColour = palette.dark;
        this.toColour = palette.mid;
        this.shadowColour = lerpColor(this.fromColour, this.toColour, 0.5);
    }

    update() {

        this.hoverStitch = -1;

        for (let i = 0; i < this.holes.length; i++) {
            if (this.holes[i].hover() && this.path[this.path.length-1] != this.holes[i].index) {
                this.hoverStitch = this.holes[i].index;
            }
        }
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

        return int(distance/this.spacing*10)/10;
    }

    complete() {

        if (this.path.length > 1 && this.path[0] == this.path[this.path.length-1]) return true;
    }

    display(frontSide) {

        if (frontSide) {
            fabricLayer.image(perlinLayer, 0, 0);
        } else {
            fabricLayer.scale(-1, 1);
            fabricLayer.image(perlinLayer, -size, 0);
            fabricLayer.scale(-1, 1);
        }

        if (frontSide) this.pattern.display();

        for (let i = 0; i < this.holes.length; i++) {
            this.holes[i].display();
        }

        if (this.path.length == 0) return;

        if (frontSide) {
            for (let i = 0; i < this.path.length-1; i += 2) {
                fabricLayer.strokeWeight(size/20);
                fabricLayer.stroke(this.shadowColour);
                fabricLayer.line(this.holes[this.path[i]].x, this.holes[this.path[i]].y, this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
                fabricLayer.strokeWeight(size/20-size/75);
                fabricLayer.stroke(lerpColor(this.fromColour, this.toColour, i/this.path.length));
                if (i == this.path.length-2 && !this.complete()) fabricLayer.stroke(255);
                fabricLayer.line(this.holes[this.path[i]].x, this.holes[this.path[i]].y, this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
            }
            if (this.path.length%2 == 1 & this.hoverStitch != -1 && !this.complete() && !mobile) {
                fabricLayer.stroke(this.shadowColour);
                fabricLayer.strokeWeight(size/20);
                fabricLayer.line(this.holes[this.path[this.path.length-1]].x, this.holes[this.path[this.path.length-1]].y, this.holes[this.hoverStitch].x, this.holes[this.hoverStitch].y);
                fabricLayer.stroke(255);
                fabricLayer.strokeWeight(size/20-size/75);
                fabricLayer.line(this.holes[this.path[this.path.length-1]].x, this.holes[this.path[this.path.length-1]].y, this.holes[this.hoverStitch].x, this.holes[this.hoverStitch].y);
            }
            if (this.path.length == 1 || !this.complete()) {
                fabricLayer.stroke(this.shadowColour);
                fabricLayer.strokeWeight(size/150);
                fabricLayer.fill(palette.dark);
                fabricLayer.ellipse(this.holes[this.path[0]].x, this.holes[this.path[0]].y, size/15);
                fabricLayer.fill(255);
                fabricLayer.ellipse(this.holes[this.path[this.path.length-1]].x, this.holes[this.path[this.path.length-1]].y, size/15);
            }
        } else {
            for (let i = 1; i < this.path.length-1; i += 2) {
                fabricLayer.strokeWeight(size/20);
                fabricLayer.stroke(this.shadowColour);
                fabricLayer.line(size-this.holes[this.path[i]].x, this.holes[this.path[i]].y, size-this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
                fabricLayer.strokeWeight(size/20-size/75);
                fabricLayer.stroke(lerpColor(this.fromColour, this.toColour, i/this.path.length));
                if (i == this.path.length-2 && !this.complete()) fabricLayer.stroke(255);
                fabricLayer.line(size-this.holes[this.path[i]].x, this.holes[this.path[i]].y, size-this.holes[this.path[i+1]].x, this.holes[this.path[i+1]].y);
            }
            if (this.path.length == 1 || !this.complete()) {
                fabricLayer.stroke(this.shadowColour);
                fabricLayer.strokeWeight(size/150);
                fabricLayer.fill(palette.dark);
                fabricLayer.ellipse(size-this.holes[this.path[0]].x, this.holes[this.path[0]].y, size/15);
                fabricLayer.fill(255);
                fabricLayer.ellipse(size-this.holes[this.path[this.path.length-1]].x, this.holes[this.path[this.path.length-1]].y, size/15);
            }
        }

    }
}
