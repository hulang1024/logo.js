class LogoCanvas {
  constructor() {
    this.penLayer = document.getElementById('penLayer');
    var container = penLayer.parentNode;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    penLayer.width = container.clientWidth;
    penLayer.height = container.clientHeight;
    penLayer.style.width = penLayer.width + 'px';
    penLayer.style.height = penLayer.height + 'px';
    penLayer.context = penLayer.getContext('2d');
  }

  clear() {
    this.penLayer.context.clearRect(0, 0,
      this.penLayer.width, this.penLayer.height);
  }

  setBackgroundColor(color) {
    this.penLayer.style.backgroundColor = color;
  }
}
