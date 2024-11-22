/**
* @class
* @classdesc
* @enum
* @param {string} name
* @param {number} weight
*/
function $Rarity(name, weight) {
  this.name = name;
  this.weight = weight;
}

$Rarity.prototype.getName = function () {
  return this.name;
}

$Rarity.prototype.getWeight = function () {
  return this.weight;
}

$Rarity.SUPER_COMMON = new $Rarity("super_common", 40);

$Rarity.COMMON = new $Rarity("common", 10);

$Rarity.UNCOMMON = new $Rarity("uncommon", 5);

$Rarity.RARE = new $Rarity("rare", 2);

$Rarity.VERY_RARE = new $Rarity("very_rare", 1);

$Rarity.NONE = new $Rarity("none", 0);

/**
* 
* @param {string} name 
* @param $Rarity} fallback 
* @returns $Rarity}
*/
$Rarity.byName = function (name, fallback) {
  let values = {
    "super_common": $Rarity.SUPER_COMMON,
    "common": $Rarity.COMMON,
    "uncommon": $Rarity.UNCOMMON,
    "rare": $Rarity.RARE,
    "very_rare": $Rarity.VERY_RARE,
    "none": $Rarity.NONE
  }
  return values[name] ?? fallback;
}
