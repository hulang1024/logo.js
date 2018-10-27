setBackgroundColor('black')
penUp();
setXY(230, 370);
penDown();
repeat(12, function() {
  setPenColor(getRandomColor());
  right(45);
  repeat(75, function() {
    forward(100);
    back(100);
    right(2);
  });
  back(250);
});
hideRole();
