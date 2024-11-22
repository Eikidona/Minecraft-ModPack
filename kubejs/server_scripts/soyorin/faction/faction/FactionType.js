// priority: 1000
/**
 * @class
 * @classdesc
 * @enum
 * @param {string} name 
 */
function $FactionType(name) {
  this.name = name;
}

$FactionType.prototype.getName = function () {
  return this.name;
}

$FactionType.GAIA = new $FactionType("gaia");
$FactionType.PLAYER = new $FactionType("player");
$FactionType.VILLAGE = new $FactionType("village");
$FactionType.MONSTER = new $FactionType("monster");

/**
 * 
 * @param {string} name 
 * @param {$FactionType} fallback 
 */
$FactionType.byName = function (name, fallback) {
  let values = {
    "gaia": $FactionType.GAIA,
    "player": $FactionType.PLAYER,
    "village": $FactionType.VILLAGE,
    "monster": $FactionType.MONSTER
  }
  return values[name] ?? fallback;
}