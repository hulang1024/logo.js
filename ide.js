window.onload = function() {
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
