var World = (function(){
  return class extends EventManager {
    constructor() {
      super();
      var world = this;

      this.animationQueue = [];
      this.currentAnimation = null;
      this.animationReqId = null;

      // 动画速度
      this.speed = 1;

      var logoCanvas = new LogoCanvas();
      this.logoCanvas = logoCanvas;
      this.pen = new Pen(logoCanvas);
      this.role = new Role(logoCanvas);

      this.paused = true;

    }

    pause() {
      this.paused = true;
      cancelAnimationFrame(this.animationReqId);
    }

    resume() {
      if (this.paused) {
        this.paused = false;
        this.update();
      }
    }

    reset() {
      var world = this;
      var role = this.role;
      var pen = this.pen;
      this.paused = true;
      cancelAnimationFrame(world.animationReqId);

      this.animationQueue = [];
      this.currentAnimation = null;
      this.operandStack = [];
      this.animationReqId = null;

      world.logoCanvas.clear();
      world.logoCanvas.setBackgroundColor('transparent');
      role.vx = 0;
      role.vy = -1;
      role.angle = 0;
      role.rotate(0);
      role.show(true);
      pen.setUp(true);
      role.on('move', function(x, y) {
        pen.setPos(x, y);
        pen.draw();
      });
      role.setXY(world.logoCanvas.width / 2, world.logoCanvas.height / 2);
      role.draw();

      pen.setUp(false);
      pen.setColor('black');
    }

    update() {
      for (var t = 0; t < this.speed; t++) {
        if (this.paused)
          return;
        if (this.currentAnimation) {
          if (this.currentAnimation.done()) {
            this.currentAnimation = null;
          } else {
            this.currentAnimation.update();
          }
        } else {
          if (this.animationQueue.length > 0) {
            this.currentAnimation = this.animationQueue.shift();
            this.currentAnimation.start();
            this.currentAnimation.update();
          } else {
            this._fire('end');
            this.paused = true;
            break;
          }
        }

        this.role.draw();
      }
      this.animationReqId = requestAnimationFrame(this.update.bind(this));
    }

    pushAnimation(anim) {
      this.animationQueue.push(anim);
    }

    setSpeed(value) {
      this.speed = value;
      this._fire('speedChanged');
    }


  }
})();
