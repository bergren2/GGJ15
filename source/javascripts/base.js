function Bases ($game) {
  var that = this;
  var COUNT = {
    'blue': 1,
    'red': 1
  };
  var bases = [];

  var c, i, toChooseFrom = [];
  for (c in COUNT) {
    for (i = 0; i < COUNT[c]; i++) {
      toChooseFrom.push(c);
    }
  }

  this.count = function () {
    return bases.length;
  };

  this.isABase = function (coords) {
    return false; // TODO stubbed, this is more complicated
  };

  this.spawn = function (coords) {
    var n = Math.floor(Math.random() * toChooseFrom.length);
    var color = toChooseFrom.splice(n, 1)[0];
    var base = new Base($game, coords, color);
    bases.push(base);
    return base;
  };
}

function Base ($game, coords, color) {
  var $dom = $('<div></div>').addClass('base').addClass(color)
               .width(P).height(P)
               .css('left', coords.grid[0]).css('top', coords.grid[1]);

  $game.append($dom);

  // methods
  this.getDom = function () {
    return $dom;
  };
}
