var Game = (function(){
  return class {
    constructor() {
      var game = this;
      var world = new World();
      this.world = world;
      this.operandStack = [];
      this.isFastRunMode = false;

      var textX = document.getElementById('coord-x');
      var textY = document.getElementById('coord-y');
      world.role.on('move', function(x, y) {
        if (game.isFastRunMode)
          return;
        textX.innerText = x.toFixed(2);
        textY.innerText = y.toFixed(2);
      });
      var textAngle = document.getElementById('angle');
      world.role.on('rotate', function(angle) {
        if (game.isFastRunMode)
          return;
        textAngle.innerText = angle.toFixed(2);
      });
      world.reset();
    }

    setFastRunMode(b) {
      this.world.speed = Number.MAX_VALUE;
      this.isFastRunMode = b;
    }

    forward(steps) {
      this.world.pushAnimation(new ForwardAnimation(this.world, this, steps));
    }

    back(steps) {
      this.world.pushAnimation(new BackAnimation(this.world, this, steps));
    }

    left(angle) {
      this.world.pushAnimation(new LeftAnimation(this.world.role, angle));
    }

    right(angle) {
      this.world.pushAnimation(new RightAnimation(this.world.role, angle));
    }

    hideRole() {
      this.world.pushAnimation(new ShowRoleAnimation(this.world.role, false));
    }
    showRole() {
      this.world.pushAnimation(new ShowRoleAnimation(this.world.role, true));
    }

    penUp() {
      this.world.pushAnimation(new PenUpAnimation(this.world.pen, true));
    }
    penDown() {
      this.world.pushAnimation(new PenUpAnimation(this.world.pen, false));
    }

    setPenColor(color) {
      this.world.pushAnimation(new SetPenColorAnimation(this.world.pen, color));
    }

    setBackgroundColor(color) {
      this.world.pushAnimation(new SetBackgroundColorAnimation(this.world, color));
    }

    setXY(x, y) {
      if (typeof x != 'undefined' && typeof y != 'undefined') {
        this.putOperands([
          function() { return y },
          function() { return x },
        ]);
      }
      this.world.pushAnimation(new GoXYAnimation(this.world, this));
    }

    setSpeed(v) {
      this.world.pushAnimation(new SetSpeedAnimation(this.world, v));
    }

    xcor() { return this.world.role.x; }
    ycor() { return this.world.role.y; }

    putOperands(operandGetFuncs) {
      this.world.pushAnimation(new PutOperandAnimation(this.operandStack, operandGetFuncs));
    }

  }

  function Animation() {
    this.isDone = false;
    this.start = function() {}
    this.update = function() {}
    this.done = function() { return this.isDone; }
  }

  function ForwardAnimation(world, game, steps) {
    GoXYAnimation.call(this, world, game);
    var role = world.role;
    this.start = function() {
      this.endX = role.x + role.vx * role.stepSize * steps;
      this.endY = role.y + role.vy * role.stepSize * steps;
    }
  }

  function BackAnimation(world, game, steps) {
    GoXYAnimation.call(this, world, game);
    var role = world.role;
    this.start = function() {
      if (role.vx != 0)
        role.vx = -role.vx;
      if (role.vy != 0)
        role.vy = -role.vy;

      this.endX = role.x + role.vx * role.stepSize * steps;
      this.endY = role.y + role.vy * role.stepSize * steps;
    }
  }

  function RightAnimation(role, angle) {
    Animation.call(this);
    var startAngle = 0;
    var endAngle = 0;
    this.start = function() {
      startAngle = role.angle;
      endAngle = role.angle + angle;
      var radian = endAngle * Math.PI / 180;
      role.vy = -1 * Math.cos(radian).toFixed(2);
      role.vx = 1 * Math.sin(radian).toFixed(2);
    }

    this.update = function() {
      startAngle += role.stepSize * 2;
      if (startAngle >= endAngle) {
        startAngle = endAngle;
        this.isDone = true;
      }
      role.rotate(startAngle);
    }
  }

  function LeftAnimation(role, angle) {
    Animation.call(this);
    var startAngle = 0;
    var endAngle = 0;
    this.start = function() {
      startAngle = role.angle;
      endAngle = role.angle - angle;
      var radian = endAngle * Math.PI / 180;
      role.vy = -1 * Math.cos(radian).toFixed(2);
      role.vx = 1 * Math.sin(radian).toFixed(2);
    }

    this.update = function() {
      startAngle -= role.stepSize * 2;
      if (startAngle <= endAngle) {
        startAngle = endAngle;
        this.isDone = true;
      }
      role.rotate(startAngle);
    }
  }

  function ShowRoleAnimation(role, isShow) {
    Animation.call(this);
    this.start = function() {
      role.show(isShow);
      this.isDone = true;
    }
  }

  function PenUpAnimation(pen, isUp) {
    Animation.call(this);
    this.start = function() {
      pen.setUp(isUp);
      this.isDone = true;
    }
  }

  function GoXYAnimation(world, game) {
    var role = world.role;
    Animation.call(this);
    this.start = function() {
      this.endX = game.operandStack.pop();
      this.endY = game.operandStack.pop();
      if (this.endX < 0)
        this.endX = Math.abs(this.endX);
      if (this.endY < 0)
        this.endY = world.logoCanvas.height + this.endY;

      role.vx = Math.sign(this.endX - role.x);
      role.vy = Math.sign(this.endY - role.y);
    }

    this.update = function() {
      var vx = role.vx;
      var vy = role.vy;
      var x = role.x + vx;
      var y = role.y + vy;
      var dx = x - this.endX;
      var dy = y - this.endY;
      if ((vx > 0 && dx > 0) || (vx < 0 && dx < 0)) {
        x = this.endX;
        dx = 0;
      }
      if ((vy > 0 && dy > 0) || (vy < 0 && dy < 0)) {
        y = this.endY;
        dy = 0;
      }

      role.setXY(x, y);

      if (dx == 0 && dy == 0) {
        this.isDone = true;
      }
    }
  }

  function SetSpeedAnimation(world, speed) {
    Animation.call(this);
    this.start = function() {
      world.setSpeed(speed);
      this.isDone = true;
    }
  }

  function SetPenColorAnimation(pen, color) {
    Animation.call(this);
    this.start = function() {
      pen.setColor(color);
      this.isDone = true;
    }
  }

  function SetBackgroundColorAnimation(world, color) {
    Animation.call(this);
    this.start = function() {
      world.logoCanvas.setBackgroundColor(color);
      this.isDone = true;
    }
  }

  function PutOperandAnimation(operandStack, operandGetFuncs) {
    Animation.call(this);
    this.start = function() {
      operandGetFuncs.forEach(function(func) {
        operandStack.push(func());
      });
      this.isDone = true;
    }
  }
})();

function getRandomColor() {
  return '#' + ('00000'+ (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

function repeat(n, func) {
  for (var i = 0; i < n; i++) {
    func(i + 1);
  }
}
