penUp();
setXY(-90, -180);
penDown();
repeat(8, function() {
  right(45);
  repeat(6, function() {
    repeat(90, function() {
      forward(4);
      right(2);
    });
    right(90);
  });
});
