/**
 * @class
 * @classdesc
 * @enum
 * @param {string} name
 * @param {number} max
 */
function $BoostType(name, max) {
  this.name = name;
  this.max = max;
}

$BoostType.prototype.getName = function () {
  return this.name;
}

$BoostType.prototype.getMax = function () {
  return this.max;
}


$BoostType.SPECIAL = new $BoostType("special", 999);

$BoostType.ATTRIBUTE = new $BoostType("attribute", 999);

$BoostType.ARMOR = new $BoostType("armor", 1);

$BoostType.MOUNT = new $BoostType("mount", 1);

$BoostType.MAINHAND = new $BoostType("mainhand", 1);

$BoostType.OFFHAND = new $BoostType("offhand", 1);

$BoostType.AI = new $BoostType("ai", 10);

$BoostType.ROLE = new $BoostType("role", 1);

/**
* 
* @param {string} name 
* @param {$BoostType} fallback 
* @returns 
*/
$BoostType.byName = function (name, fallback) {
  let values = {
    "special": $BoostType.SPECIAL,
    "attribute": $BoostType.ATTRIBUTE,
    "armor": $BoostType.ARMOR,
    "mount": $BoostType.MOUNT,
    "mainhand": $BoostType.MAINHAND,
    "offhand": $BoostType.OFFHAND,
    "ai": $BoostType.AI,
    "role": $BoostType.ROLE
  }
  return values[name] ?? fallback;
}