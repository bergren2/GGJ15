//= require_tree .
//= require jquery

// global vars
var P = 20,          // block width in pixels
    DELAY = 500,     // delay of animations in milliseconds
    WINDOW_W = null, // window width
    WINDOW_H = null; // window height

// load the game
$(document).ready(function () {
  WINDOW_W = blockCeil($(document).width());
  WINDOW_H = blockCeil($(document).height());
  var $game = $('#game');
  var roadNetwork = new RoadNetwork($game);

  $game.width(WINDOW_W).height(WINDOW_H);

  // events
  $game.on('click', function (e) {
    var coords = coordsOf(e, $(this));
    if (roadNetwork.size() < 7 && roadNetwork.coordsOnRoad(coords)) {
      roadNetwork.addRoad(new Road($game, coords));
    } else {
      console.log('create spawn bases');
    }
  });
});
