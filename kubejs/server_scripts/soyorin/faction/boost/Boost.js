/**
 * @class
 * @classdesc
 * @abstract
 */
function $Boost() {

}
$Boost.prototype.isEmpty = function () {
    return this == $Boost.EMPTY;
}
/**
 * 
 * @returns {$Boost.$BoostType}
 */
$Boost.prototype.getType = function () {
    
}

/**
 * 
 * @returns {$Boost.$Rarity}
 */
$Boost.prototype.getRarity = function () {
    
}

/**
 * 
 * @param {Internal.LivingEntity} livingEntity 
 */
$Boost.prototype.apply = function (livingEntity) {

}

/**
 * 
 * @param {Internal.LivingEntity} livingEntity 
 */
$Boost.prototype.canApply = function (livingEntity) {
    
}

$Boost.EMPTY = new $Boost();


