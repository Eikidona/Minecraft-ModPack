/**
 * @class
 * @classdesc
 * @enum 
 * @param {string} name 
 */
function $RaidTargetType(name) {
  this.name = name;
}

$RaidTargetType.prototype.getName = function () {
  return this.name;
}

/**
 * @type {$RaidTargetType[]}
 */
$RaidTargetType.VALUES = [];

/**
 * 
 * @param {string} name 
 * @returns {$RaidTargetType}
 */
$RaidTargetType.create = function (name) {
  let type = new $RaidTargetType(name);
  this.VALUES.push(type);
  return type;
}

$RaidTargetType.VILLAGE = $RaidTargetType.create("village");
$RaidTargetType.PLAYER = new $RaidTargetType("player");
$RaidTargetType.BATTLE = new $RaidTargetType("battle");

/**
 * 
 * @param {string} name 
 * @param {$RaidTargetType} fallback
 */
$RaidTargetType.byName = function (name, fallback) {
  let type;
  for (const element of this.VALUES) {
    if (element.getName() == name) {
      type = element;
      break;
    }
  }
  return type ?? fallback;
}