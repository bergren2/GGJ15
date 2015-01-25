function Tests ($game) {
  var that = this;

  this.stepNumber = 0;
  this.pointer = new Coords([0, 0]);
  this.areRunning = false;

  var tests = [
    function () {
      var i;
      for (i = 0; i < 7; i++) {
        that.pointer = getRandomCoords();
        $game.click();
      }
    },
    function () {
      console.log('tests are done!');
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
