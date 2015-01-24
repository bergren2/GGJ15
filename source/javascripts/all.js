//= require_tree .
//= require jquery

// global vars
var P = 20,          // block width in pixels
    DELAY = 1000,    // delay of animations in milliseconds
    WINDOW_W = null,
    WINDOW_H = null;

// floors the number based on the block sizes in the grid
function blockFloor (num) {
  return num - (num % P);
}

// returns block coordinates of the click
function coordsOf (e, $el) {
  var offset = $el.offset();
  var x = e.clientX - offset.left;
  var y = e.clientY - offset.top;
  return [blockFloor(x), blockFloor(y)];
}

// creates a road element in the game
function createRoad ($game, coords) {
  var direction = Math.floor(Math.random() * 2);
  var $road = $('<div></div>').addClass('road').width(P).height(P)
                              .css('left', coords[0]).css('top', coords[1]);
  $game.append($road);

  if (direction === 0) {
    window.setTimeout(function () {
      $road.css('left', '0').width(WINDOW_W);
  }, DELAY);
  } else {
    window.setTimeout(function () {
      $road.css('top', '0').height(WINDOW_H);
    }, DELAY);
  }
}

// load the game
$(document).ready(function () {
  WINDOW_W = blockFloor($(document).width());
  WINDOW_H = blockFloor($(document).height());

  var $game = $('#game');
  $game.width(WINDOW_W).height(WINDOW_H);

  $game.on('click', function (e) {
    console.log(coordsOf(e, $(this)));
    createRoad($game, coordsOf(e, $(this))); // TODO refactor?
  });
});
