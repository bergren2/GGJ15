// floors the number based on the block sizes in the grid
function blockFloor (num) {
  return num - (num % P);
}

function blockCeil (num) {
  return blockFloor(num) + P;
}

function chooseColor (type) {
  var base = ['blue', 'red'];
  var i;
  if (type === 'base') {
    i = Math.floor(Math.random() * 2);
    return base[i];
  }
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
