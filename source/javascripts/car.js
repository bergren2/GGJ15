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
        car.getDom().animate(instr, function () {
          car.updateLocation(coords.grid);
          car.moving = false;
          car.checkBase();
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
  var color = ['red', 'blue'][Math.floor(Math.random() * 2)]; // this will prolly change later
  var currentLocation = coords.grid;
  this.moving = false;

  var $dom = $('<div></div>').addClass('car').addClass(color).addClass('block')
             .width(P).height(P)
             .css('left', coords.grid[0]).css('top', coords.grid[1]);
  $game.append($dom);

  this.checkBase = function () {
    return true;
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
