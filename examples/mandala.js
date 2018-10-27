repeat(12, function() {
  setPenColor('red');
  repeat(45, function() {
    forward(7);
    left(4);
    penUp();
    forward(7);
    left(4);
    penDown();
  });
  setPenColor('blue');
  repeat(45, function() {
    forward(7);
    left(-4);
    penUp();
    forward(7);
    left(-4);
    penDown();
  });
  right(30);
});
