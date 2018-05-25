function Cars ($game, roadNetwork) {
  var that = this;
  var cars = [];

  this.add = function (car) {
    cars.push(car);
  };

  this.getCurrentCar = function () {
    return cars[cars.length - 1];
  };

  this.moveCurrentCarTo = function (coords) {
    // check if car is on a road and if coords are also on the same road
    if (roadNetwork.coordsOnRoad(coords)) {
      var i, d, dest, diff, instr, rCoords,
          roads = roadNetwork.getRoads(),
          car = that.getCurrentCar(),
          cCoords = car.getLocation();
      for (i = 0; i < roads.length; i++) {
        rCoords = roads[i].getCoords();
        d = roads[i].getDirection();
        // vertical
        if (cCoords[0] === rCoords[0] && rCoords[0] === coords.grid[0] && d === 1) {
          dest = coords.grid;
          diff = coords.grid[1] - cCoords[1];
          if (diff > 0) {
            instr = {top: '+=' + diff};
          } else {
            instr = {top: '-=' + -diff};
          }
        // horizontal
        } else if (cCoords[1] === rCoords[1] && rCoords[1] === coords.grid[1] && d === 0) {
          dest = coords.grid;
          diff = coords.grid[0] - cCoords[0];
          if (diff > 0) {
            instr = {left: '+=' + diff};
          } else {
            instr = {left: '-=' + -diff};
          }
        }
      }

      // if true, select "current" car and move towards coords
      if (!!dest && !car.moving) {
        car.moving = true;
        car.getDom().animate(instr, Math.abs(diff * 5), 'linear', function () {
          car.updateLocation(coords.grid);
          car.moving = false;
          car.checkBase(coords.grid);
        });
      }
    }
  };

  this.spawn = function () {
    var rCoords = roadNetwork.getRoadsArray();

    var notDirection = Math.floor(Math.random() * 2); // great name bro
    var potentials = rCoords[notDirection];

    var coords;
    if (notDirection === 1) {
      coords = new Coords([0, potentials[Math.floor(Math.random() * potentials.length)]]);
    } else {
      coords = new Coords([potentials[Math.floor(Math.random() * potentials.length)], 0]);
    }

    that.add(new Car($game, coords));
  };
}

function Car ($game, coords) {
  var that = this;
  var bases = $game.bases.getBases();
  var color = bases[Math.floor(Math.random() * bases.length)].getColor();
  var currentLocation = coords.grid;
  this.moving = false;

  var $dom = $('<div></div>').addClass('car').addClass(color).addClass('block')
             .width(P).height(P)
             .css('left', coords.grid[0]).css('top', coords.grid[1]);
  $game.append($dom);

  // methods
  this.checkBase = function (coords) {
    // find base
    var bases = $game.bases.getBases();
    var callback = function (base) {
      that.getDom().addClass('gone');
      setTimeout(function () {
        that.getDom().hide();
        base.reduce(function () {
          if ($game.bases.getBases().length === 2) {
            $game.cars.spawn();
          }
        });
      }, DELAY);
    };

    var i, ranges;
    for (i = 0; i < bases.length; i++) {
      if (bases[i].getColor() !== that.getColor()) {
        continue;
      }
      ranges = bases[i].getRanges();

      // TODO almost, need to check rest of range
      // car is left of base
      if (ranges[0][0] - coords[0] === P &&
          coords[1] >= ranges[1][0] &&
          coords[1] <= ranges[1][1]) {
        that.moving = true;
        that.getDom().animate({left: '+=' + P}, callback(bases[i]));
      // car is right of base
      } else if (coords[0] - ranges[0][1] === P &&
          coords[1] >= ranges[1][0] &&
          coords[1] <= ranges[1][1]) {
        that.moving = true;
        that.getDom().animate({left: '-=' + P}, callback(bases[i]));
      // car is above base
      } else if (ranges[1][0] - coords[1] === P &&
          coords[0] >= ranges[0][0] &&
          coords[0] <= ranges[0][1]) {
        that.moving = true;
        that.getDom().animate({top: '+=' + P}, callback(bases[i]));
      // car is below base
      } else if (coords[1] - ranges[1][1] === P &&
          coords[0] >= ranges[0][0] &&
          coords[0] <= ranges[0][1]) {
        that.moving = true;
        that.getDom().animate({top: '-=' + P}, callback(bases[i]));
      }
    }

    // move piece

    // reduce base
    return true;
  };

  this.getColor = function () {
    return color;
  };

  this.getDom = function () {
    return $dom;
  };

  this.getLocation = function () {
    return currentLocation;
  };

  this.updateLocation = function (gridCoords) {
    currentLocation = gridCoords;
  };
}
;
