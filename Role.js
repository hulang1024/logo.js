var Role = (function() {
  return class extends EventManager {
    constructor(canvas) {
      super();
      // 当前坐标
      this.x = 0;
      this.y = 0;

      this.width = 46;
      this.height = 46;
      // 记录当前方向
      this.angle = 0;
      // 向量
      this.vx = 0;
      this.vy = -1;
      // 步长，一步多少像素
      this.stepSize = 1;

      this.isShow = true;

      this.div = document.getElementById('role');
    }

    draw() {
      if (!this.isShow)
        return;
      this.div.style.left = this.x - this.width / 2 + 'px';
      this.div.style.top = this.y - this.height / 2 + 'px';
    }

    setXY(x, y) {
      this.x = x;
      this.y = y;
      this._fire('move', this.x, this.y);
    }

    show(b) {
      this.isShow = b;
      this.div.style.display = b ? 'block' : 'none';
    }

    rotate(deg) {
      if (deg < 0)
        deg = 360 + deg;
      this.angle = deg % 360;
      this.div.style.transform = 'rotate(' + deg + 'deg)';
      this._fire('rotate', this.angle);
    }

  }
})();
