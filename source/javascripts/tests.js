function Tests ($game) {
  var that = this;

  this.stepNumber = 0;
  this.pointer = new Coords([0, 0]);
  this.areRunning = false;

  var tests = [
    // lay roads
    function () {
      var i, x = 100;
      for (i = 0; i < 7; i++) {
        that.pointer = new Coords([x, x]);
        $game.click();
        x += 100;
      }
    },
    // lay bases
    function () {
      that.pointer = new Coords([150, 150]);
      $game.click();
      that.pointer = new Coords([250, 250]);
      $game.click();
    }
  ];

  this.run = function () {
    if (!that.areRunning) {
      that.areRunning = true;
      for (; that.stepNumber < tests.length; that.stepNumber++) {
        tests[that.stepNumber]();
      }
      that.areRunning = false;
      that.stepNumber = 0;
    }
  };
}

var tests; // inits in game loading
