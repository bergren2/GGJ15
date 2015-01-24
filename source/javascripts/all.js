//= require_tree .
//= require jquery

var w = 50, // blocks across
    h = 50, // blocks down
    p = 10; // block width in pixels

function coordsOf (e, $el) {
  var offset = $el.offset();
  var x = e.clientX - offset.left;
  var y = e.clientY - offset.top;
  return [x, y];
}

function createRoad ($game, coords) {
  var direction = Math.floor(Math.random() * 2);
  if (direction === 0) {
    console.log('horizontal');
  } else {
    console.log('vertical');
  }

  var $road = $('<div></div>').addClass('road').width(p).height(p)
                              .css('left', coords[0]).css('top', coords[1]);
  $game.append($road);
}

$(document).ready(function () {
  var w = $(document).width();
  var h = $(document).height();

  w = w - (w % p);
  h = h - (h % p);
  var $game = $('#game');
  $game.width(w).height(h);

  $game.on('click', function (e) {
    console.log(coordsOf(e, $(this)));
    createRoad($game, coordsOf(e, $(this))); // TODO refactor?
  });
});
