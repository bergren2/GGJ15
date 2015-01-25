function Bases ($game, roadNetwork) {
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

  this.getBases = function () {
    return bases;
  };

  this.count = function () {
    return bases.length;
  };

  this.isABase = function (coords) {
    return false; // TODO stubbed, this is more complicated
  };

  this.spawn = function (coords) {
    var n = Math.floor(Math.random() * toChooseFrom.length);
    var color = toChooseFrom.splice(n, 1)[0];
    var expandTo = roadNetwork.nearestRoad(coords);
    var base = new Base($game, coords, color, expandTo);
    bases.push(base);
    return base;
  };
}

function Base ($game, coords, color, expandTo) {
  var $dom = $('<div></div>').addClass('base').addClass(color)
               .width(P).height(P)
               .css('left', coords.grid[0]).css('top', coords.grid[1]);
  var ranges = [[0,0],[0,0]];
  var that = this;
  var c = color;

  $game.append($dom);

  // animate
  // TODO please refactor me
  if (coords.grid[0] > expandTo.grid[0]) {
    window.setTimeout(function () {
      $dom.css('left', expandTo.grid[0] + P)
          .width(coords.grid[0] - expandTo.grid[0]);
    }, DELAY);

    ranges[0] = [expandTo.grid[0] + P, coords.grid[0]];
  } else {
    window.setTimeout(function () {
      $dom.width(expandTo.grid[0] - coords.grid[0]);
    }, DELAY);

    ranges[0] = [coords.grid[0], expandTo.grid[0] - P];
  }

  if (coords.grid[1] > expandTo.grid[1]) {
    window.setTimeout(function () {
      $dom.css('top', expandTo.grid[1] + P)
          .height(coords.grid[1] - expandTo.grid[1]);
    }, DELAY);

    ranges[1] = [expandTo.grid[1] + P, coords.grid[0]];
  } else {
    window.setTimeout(function () {
      $dom.height(expandTo.grid[1] - coords.grid[1]);
    }, DELAY);

    ranges[1] = [coords.grid[1], expandTo.grid[1] - P];
  }

  // methods
  this.getColor = function () {
    return c;
  };

  this.getDom = function () {
    return $dom;
  };

  this.getRanges = function () {
    return ranges;
  };

  this.reduce = function () {
    if (ranges[0][0] !== ranges[0][1]) {
      ranges[0][1] -= P;
      var dom = that.getDom();
      dom.width(dom.width() - P);
    }
  };
}
