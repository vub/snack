(function () {
    function Snack() {
        this.x = 10;
        this.y = 10;

        this.xv = 1;
        this.yv = 0;

        this.trail = [];

        this.tail = 5;
    }
    Snack.prototype.update = function() {
        this.x += this.xv;
        this.y += this.yv;

        this.trail.push({ x: this.x, y: this.y });
        while (this.trail.length > this.tail) {
            this.trail.shift();
        }
    }
    
    window.Snack = Snack;
}());