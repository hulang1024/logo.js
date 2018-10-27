class Pen {
  constructor(canvas) {
    // 当前笔触坐标
    this.x = 0;
    this.y = 0;
    // 上次坐标
    this.lastX = -1;
    this.lastY = -1;
    // 笔色
    this.color = 'black';
    // 笔粗
    this.width = 1;
    // 是否落下状态
    this.isDown = true;
    this.canvas = canvas;
    this.context = this.canvas.penLayer.context;

    this.setColor();
  }

  setPos(x, y) {
    this.x = x;
    this.y = y;
    if (this.lastX == -1 && this.lastY == -1) {
      this.lastX = x;
      this.lastY = y;
    }
  }

  setUp(b) {
    this.isDown = !b;
    if (this.isDown) {
      this.lastX = this.x;
      this.lastY = this.y;
    }
  }

  setColor(color) {
    if (color)
    	this.color = color;
    this.context.fillStyle = this.color;
  }

  draw() {
    if (!this.isDown)
      return;
    var ctx = this.context;
    var vx = Math.sign(this.x - this.lastX);
    var vy = Math.sign(this.y - this.lastY);
    var x = this.lastX;
    var y = this.lastY;
    var dx = -1, dy = -1;
    while (!(dx == 0 && dy == 0)) {
      ctx.fillRect(x, y, this.width, this.width);
      x += vx;
      y += vy;
      dx = x - this.x;
      dy = y - this.y;
      if ((vx > 0 && dx > 0) || (vx < 0 && dx < 0)) {
        x = this.x;
        dx = 0;
      }
      if ((vy > 0 && dy > 0) || (vy < 0 && dy < 0)) {
        y = this.y;
        dy = 0;
      }
    }
    ctx.fillRect(x, y, this.width, this.width);
    this.lastX = this.x;
    this.lastY = this.y;
  }

}
