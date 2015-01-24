//= require_tree .
//= require jquery

// global vars
var P = 10; // block width in pixels

// floors the number based on the block sizes in the grid
function blockFloor (num) {
  return num - (num % P);
}

// returns block coordinates of the click
function coordsOf (e, $el) {
  var offset = $el.offset();
  var x = e.clientX - offset.left;
  var y = e.clientY - offset.top;
  return [x, y];
}

// creates a road element in the game
function createRoad ($game, coords) {
  var direction = Math.floor(Math.random() * 2);
  if (direction === 0) {
    console.log('horizontal');
  } else {
    console.log('vertical');
  }

  var $road = $('<div></div>').addClass('road').width(P).height(P)
                              .css('left', coords[0]).css('top', coords[1]);
  $game.append($road);
}

// load the game
$(document).ready(function () {
  var w = $(document).width();
  var h = $(document).height();

  w = blockFloor(w);
  h = blockFloor(h);
  var $game = $('#game');
  $game.width(w).height(h);

  $game.on('click', function (e) {
    console.log(coordsOf(e, $(this)));
    createRoad($game, coordsOf(e, $(this))); // TODO refactor?
  });
});
