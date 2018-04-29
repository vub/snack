(function(){
    var that = null;
    function Game() {
        // Modal
        this.snack = new Snack();
        this.apple = new Apple();

        that = this;

        // View
        this.gs = 20; // Grid size
        this.tc = 20; // Tile count

        this.canv = document.getElementById('game-view');
        this.ctx = this.canv.getContext('2d');

        this.drawMap = function DrawMap() {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
        }

        this.drawSnack = function DrawSnack(snack) {
            this.ctx.fillStyle = "lime";
            for (var i = 0; i < snack.trail.length; i++) {
                this.ctx.fillRect(snack.trail[i].x * this.gs, snack.trail[i].y * this.gs, this.gs - 2, this.gs - 2);
                if (snack.trail[i].x == snack.x && snack.trail[i].y == snack.y) {
                    snack.tail = 5;
                }
            }
        }

        this.drawApple = function DrawApple(apple) {
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(apple.x * this.gs, apple.y * this.gs, this.gs - 2, this.gs - 2);
        }


        // Handler, controller
        this.getGameThread = function getGameThread() {
            return this.gameThread;
        }

        this.start = function Start() {
            this.interval = setInterval(this.gameThread, 1000 / 5);
        }

        // this.gameThread = function gameThread() {
        //     this.snack.update();
        //     this.gameCollisionHandler();
        //     this.drawMap();
        //     this.drawSnack(this.snack);
        //     this.drawApple(this.apple);
        // }

        this.gameCollisionHandler = function gameCollisionHandler() {
            // check snack eat apple
            if (this.apple.x == this.snack.x && this.apple.y == this.snack.y) {
                this.snack.tail++;
                this.apple.x = Math.floor(Math.random() * this.tc);
                this.apple.y = Math.floor(Math.random() * this.tc);
            }

            // Snack and map collison handler
            if (this.snack.x < 0) {
                this.snack.x = this.tc - 1;
            }
            if (this.snack.x > this.tc - 1) {
                this.snack.x = 0;
            }
            if (this.snack.y < 0) {
                this.snack.y = this.tc - 1;
            }
            if (this.snack.y > this.tc - 1) {
                this.snack.y = 0;
            }

            // Check snack eat him self
            // for (var i = 0; i < this.snack.trail.length; i++) {
            //     if(this.snack.trail[i].x== this.snack.x && this.snack.trail[i].y==this.snack.y) {
            //         this.snack.tail = 5;
            //     }
            // }
        }

        this.gameControl = function gameControl(keyCode) {
            switch (keyCode) {
                case 37:
                    this.snack.xv = -1; this.snack.yv = 0;
                    break;
                case 38:
                    this.snack.xv = 0; this.snack.yv = -1;
                    break;
                case 39:
                    this.snack.xv = 1; this.snack.yv = 0;
                    break;
                case 40:
                    this.snack.xv = 0; this.snack.yv = 1;
                    break;
            }
        }

    }

    // Game.prototype.gameThread = function () {
    //     this.snack.update();
    //     this.gameCollisionHandler();
    //     this.drawMap();
    //     this.drawSnack(this.snack);
    //     this.drawApple(this.apple);
    // }

    // Game.prototype.run = function () {
    //     setInterval(gameThread, 1000 / 5);
    //     function gameThread() {
    //         Game.gameThread();
    //     }
    // }

    Game.prototype.run = function () {
        var timerId = setInterval(function () {
            this.snack.update();
            this.gameCollisionHandler();
            this.drawMap();
            this.drawSnack(this.snack);
            this.drawApple(this.apple);
        }.bind(that), 150)
      }
    window.Game = Game;
}());