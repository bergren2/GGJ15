function Base ($game, coords) {
  var color = chooseColor('base');
  console.log(coords);
  var $dom = $('<div></div>').addClass('base').addClass(color)
               .width(P).height(P)
               .css('left', coords.grid[0]).css('top', coords.grid[1]);

  $game.append($dom);

  // methods
  this.getDom = function () {
    return $dom;
  };
}
