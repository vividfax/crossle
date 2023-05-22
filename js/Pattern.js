class Pattern {

    constructor(w, h, spacing) {

        this.w = w;
        this.h = h;
        this.spacing = spacing;

        this.left = width/2 - this.w*spacing/2;
        this.top = height/2 - this.h*spacing/2;

        this.pattern = [];
        for (let i = 0; i < w*h; i++) {
            if (random() < 0.6) this.pattern.push(true);
            else this.pattern.push(false);
        }
    }

    update() {

    }

    display() {

        push();
        translate(this.left, this.top);
        translate(this.spacing/2, this.spacing/2);

        fill(240);
        noStroke();

        let index = 0;
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                if (this.pattern[index]) rect(i*this.spacing, j*this.spacing+1, this.spacing+1);
                index++;
            }
        }

        pop();
    }
}