function RoadNetwork ($game) {
  var that = this;
  var roads = [];
  var intersections = [];

  this.addRoad = function (road) {
    var r, coords = road.getCoords();
    for (r in roads) {
      // do something
    }

    roads.push(road);
  };

  this.getRoads = function () {
    return roads;
  };

  this.coordsOnRoad = function (realCoords) {
    var c, d, i;
    for (i = 0; i < roads.length; i++) {
      c = roads[i].getCoords();
      d = roads[i].getDirection();
      if (d === 0 && c[1] === realCoords.grid[1] ||
          d === 1 && c[0] === realCoords.grid[0]) {
        return true; // above not quite right
      }
    }
    return false;
  };

  this.size = function () {
    return that.getRoads().length;
  };

  this.nearestRoad = function(coords) {
    var i, rCoords = [[],[]];
    for (i = 0; i < roads.length; i++) {
      if (roads[i].getDirection() === 0) {
        rCoords[1].push(roads[i].getCoords()[1]);
      } else {
        rCoords[0].push(roads[i].getCoords()[0]);
      }
    }
    rCoords[0].sort();
    rCoords[1].sort();

    var j, returnCoords = [0, 0], range = [[0], [0]];
    for (j = 0; j < range.length; j++) {
      for (i = 0; i < rCoords[j].length; i++) {
        if (range[j].length !== 3 && coords.grid[j] > rCoords[j][i]) {
          if (i === rCoords[j].length - 1) {
            range[j].push(rCoords[j][i]);
          } else if (coords.grid[j] < rCoords[j][i + 1]) {
            range[j].push(rCoords[j][i]);
            range[j].push(rCoords[j][i + 1]);
          }
        }
      }

      if (range[j].length === 1) {
        returnCoords[j] = rCoords[j][0];
      } else {
        if (range[j].length === 3 && range[j][0] === 0) {
          range[j].splice(0, 1);
        }

        var dist1 = coords.grid[j] - range[j][0],
            dist2 = range[j][1] - coords.grid[j];
        if (dist1 < dist2) {
          returnCoords[j] = range[j][0];
        } else {
          returnCoords[j] = range[j][1];
        }
      }
    }

    // TODO need I do more?
    return new Coords(returnCoords);
  };
}

function Road ($game, coords) {
  // 0 is horizontal, 1 is vertical
  var direction = Math.floor(Math.random() * 2);
  var gridCoords = coords.grid;

  var $dom = $('<div></div>').addClass('road')
               .width(P).height(P)
               .css('left', coords.grid[0]).css('top', coords.grid[1]);
  $game.append($dom);

  // animate
  if (direction === 0) {
    window.setTimeout(function () {
      $dom.css('left', '0').width(WINDOW_W);
  }, DELAY);
  } else {
    window.setTimeout(function () {
      $dom.css('top', '0').height(WINDOW_H);
    }, DELAY);
  }

  // methods
  this.getCoords = function () {
    return gridCoords;
  };

  this.getDirection = function () {
    return direction;
  };

  this.getDom = function () {
    return $dom;
  };
}
