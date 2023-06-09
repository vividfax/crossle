class Pattern {

    constructor(w, h, spacing) {

        this.w = w;
        this.h = h;
        this.spacing = spacing;

        this.left = size/2 - this.w*spacing/2;
        this.top = size/2 - this.h*spacing/2;

        this.pattern = [];

        for (let i = 0; i < w*h; i++) {
            if (i < w*h*0.6-2) this.pattern.push(true);
            else this.pattern.push(false);
        }

        shuffle(this.pattern, true);
    }

    update() {

    }

    display() {

        if (fabric.complete()) return;

        fabricLayer.push();
        fabricLayer.translate(this.left, this.top);
        fabricLayer.translate(this.spacing/2, this.spacing/2);

        palette.dark.setAlpha(20);
        fabricLayer.fill(palette.dark);
        fabricLayer.noStroke();

        let index = 0;
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                if (this.pattern[index]) fabricLayer.rect(i*this.spacing, j*this.spacing, this.spacing);
                index++;
            }
        }

        palette.dark.setAlpha(100);
        fabricLayer.pop();
    }
}