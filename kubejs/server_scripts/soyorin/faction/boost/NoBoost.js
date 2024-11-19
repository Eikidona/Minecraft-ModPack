/**
 * @class
 * @classdesc
 */
function $NoBoost() {
  $Boost.call(this);
}

/**@type {$Boost} */
$NoBoost.prototype = Object.create($Boost.prototype);
$NoBoost.prototype.constructor = $NoBoost;

/**
 * @override
 */
$NoBoost.prototype.getType = function () {
  return $Boost.$BoostType.SPECIAL;
}
/**
 * @override
 */
$NoBoost.prototype.getRarity = function () {
  return $Boost.$Rarity.NONE;
}
/**
 * @override
 */
$NoBoost.prototype.canApply = function () {
  return false
}

$NoBoost.INSTANCE = new $NoBoost();
