//= require_tree .
//= require jquery

// global vars
var P = 20,            // block width in pixels
    DELAY = 500,       // delay of animations in milliseconds
    WINDOW_W = null,   // window width
    WINDOW_H = null,   // window height
    isSoundOn = false; // default

// load the game
$(document).ready(function () {
  WINDOW_W = blockCeil($(document).width());
  WINDOW_H = blockCeil($(document).height());
  var music = document.getElementById('music');
  var $game = $('#game');
  var roadNetwork = new RoadNetwork($game);
  var bases = new Bases($game);

  $game.width(WINDOW_W).height(WINDOW_H);

  // music
  if (isSoundOn) {
    music.play();
  }

  // events
  $game.on('click', function (e) {
    var coords = coordsOf(e, $(this));

    // Road Phase
    if (roadNetwork.size() < 7 ) {
      if (!roadNetwork.coordsOnRoad(coords)) {
        roadNetwork.addRoad(new Road($game, coords));
      }
    // Base Phase
    } else if (bases.count() < 2) {
      if (!roadNetwork.coordsOnRoad(coords)) {
        bases.spawn(coords);
      }
    // Move-In Phase
    } else {
      // 
    }
  });

  $(document).on('keydown', function (e) {
    if (e.which === 83) {
      e.preventDefault();
      isSoundOn = !isSoundOn;
      if (isSoundOn) {
        music.play();
      } else {
        music.pause();
      }
    }
  });
});
