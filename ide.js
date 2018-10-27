window.onload = function() {
  var isMobile = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  if (isMobile() && !(window.innerWidth > window.innerHeight)) {
    alert('检测到您当前使用横屏，为了更好的体验，推荐切换到横屏');
  }
  window.game = new Game();
  exportMethods(game);
  var editor = new Editor();
  new Toolbar(game, editor);
}

function exportMethods(game) {
  ['left', 'right', 'forward', 'back', 'hideRole', 'showRole', 'penUp', 'penDown', 'setPenColor', 'setBackgroundColor', 'setXY', 'setSpeed', 'xcor', 'ycor', 'putOperands'].forEach(function(methodName) {
    window[methodName] = game[methodName].bind(game);
  });
}
