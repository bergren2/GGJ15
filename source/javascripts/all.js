//= require_tree .
//= require jquery

// global vars
var P = 20,            // block width in pixels
    DELAY = 500,       // delay of animations in milliseconds
    WINDOW_W = null,   // window width
    WINDOW_H = null,   // window height
    isSoundOn = true;  // default

// load the game
$(document).ready(function () {
  WINDOW_W = blockCeil($(document).width());
  WINDOW_H = blockCeil($(document).height());
  var music = document.getElementById('music');
  var creditsShown = true;
  var $game = $('#game');
  var roadNetwork = new RoadNetwork($game);
  var cars = new Cars($game, roadNetwork);
  var bases = new Bases($game, roadNetwork);
  tests = new Tests($game);

  $game.width(WINDOW_W).height(WINDOW_H);

  // intro
  if (creditsShown) {
    $('#credits').fadeIn(2000, function () {
      $(this).addClass('hover');
      $(this).on('click', function () {
        var $this = $(this);
        creditsShown = false;
        $game.addClass('hover');
        $this.fadeOut(500).unbind('click');
      });
    });
  }

  // music
  if (isSoundOn) {
    music.play();
  }

  // game loop
  // TODO do we even need this?
  (function () {
    function main(tFrame) {
      $game.stopMain = window.requestAnimationFrame(main);
    }

    main(); // Start the cycle
  })();


  // events
  $game.on('click', function (e) {
    if (creditsShown) {
     return;
    }

    var coords;
    // for test harness
    if (isNaN(e.clientX)) {
      coords = tests.pointer;
    } else {
      coords = coordsOf(e, $(this));
    }

    // Road Phase
    if (roadNetwork.size() < 7) {
      if (!roadNetwork.coordsOnRoad(coords) &&
          !roadNetwork.coordsNextToRoad(coords) &&
          !bases.isABase(coords)) {
        var roads = roadNetwork.getRoads();
        var i, sum = 0;
        for (i = 0; i < roads.length; i++) {
          sum += roads[i].getDirection();
        }

        // all horizontal
        if (sum === 0) {
          roadNetwork.addRoad(new Road($game, coords, 1));
        // all vertical
        } else if (sum === roads.length) {
          roadNetwork.addRoad(new Road($game, coords, 0));
        } else {
          roadNetwork.addRoad(new Road($game, coords));
        }
      }
    // Base Phase
    } else if (bases.count() < 2) {
      // TODO check if in same quadrant as other bases
      if (!roadNetwork.coordsOnRoad(coords)) {
        bases.spawn(coords);
      }

      if (bases.count() === 2) {
        window.setTimeout(function () {
          cars.spawn();
        }, DELAY * 3); // NOTE hardcodez

        $game.removeClass('hover');
        $('.road').addClass('hover');
      }
    // Move-In Phase
    } else {
      cars.moveCurrentCarTo(coords);
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
