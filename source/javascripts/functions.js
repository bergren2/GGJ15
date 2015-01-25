// floors the number based on the block sizes in the grid
function blockFloor (num) {
  return num - (num % P);
}

function blockCeil (num) {
  return blockFloor(num) + P;
}

function Coords (realCoords) {
  var gridCoords = [blockFloor(realCoords[0]), blockFloor(realCoords[1])];
  return {
    grid: gridCoords,
    real: realCoords
  };
}

function coordsOf (e, $el) {
  var offset = $el.offset();
  var x = e.clientX - offset.left;
  var y = e.clientY - offset.top;
  return new Coords([x, y]);
}

function getRandomCoords () {
  var x = Math.floor(Math.random() * (WINDOW_W - P));
  var y = Math.floor(Math.random() * (WINDOW_H - P));
  return new Coords([x, y]);
}
