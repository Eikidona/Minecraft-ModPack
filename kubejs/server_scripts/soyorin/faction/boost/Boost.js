/**
 * @class
 * @classdesc
 * @abstract class
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


/**
 * @class
 * @classdesc
 * @param {string} name
 * @param {number} max
 */
$Boost.$BoostType = function (name, max) {
    this.name = name;
    this.max = max;
}

$Boost.$BoostType.prototype.getName = function () {
    return this.name;
}

$Boost.$BoostType.prototype.getMax = function () {
    return this.max;
}


$Boost.$BoostType.SPECIAL = new $Boost.$BoostType("special", 999);

$Boost.$BoostType.ATTRIBUTE = new $Boost.$BoostType("attribute", 999);

$Boost.$BoostType.ARMOR = new $Boost.$BoostType("armor", 1);

$Boost.$BoostType.MOUNT = new $Boost.$BoostType("mount", 1);

$Boost.$BoostType.MAINHAND = new $Boost.$BoostType("mainhand", 1);

$Boost.$BoostType.OFFHAND = new $Boost.$BoostType("offhand", 1);

$Boost.$BoostType.AI = new $Boost.$BoostType("ai", 10);

$Boost.$BoostType.ROLE = new $Boost.$BoostType("role", 1);

/**
 * 
 * @param {string} name 
 * @param {$Boost.$BoostType} fallback 
 * @returns 
 */
$Boost.$BoostType.byName = function (name, fallback) {
    let values = {
        "special": $Boost.$BoostType.SPECIAL,
        "attribute": $Boost.$BoostType.ATTRIBUTE,
        "armor": $Boost.$BoostType.ARMOR,
        "mount": $Boost.$BoostType.MOUNT,
        "mainhand": $Boost.$BoostType.MAINHAND,
        "offhand": $Boost.$BoostType.OFFHAND,
        "ai": $Boost.$BoostType.AI,
        "role": $Boost.$BoostType.ROLE
    }
    return values[name] ?? fallback;
}

/**
 * @class
 * @classdesc
 * @param {string} name
 * @param {number} weight
 */
$Boost.$Rarity = function (name, weight) {
    this.name = name;
    this.weight = weight;
}

$Boost.$Rarity.prototype.getName = function () {
    return this.name;
}

$Boost.$Rarity.prototype.getWeight = function () {
    return this.weight;
}

$Boost.$Rarity.SUPER_COMMON = new $Boost.$Rarity("super_common", 40);

$Boost.$Rarity.COMMON = new $Boost.$Rarity("common", 10);

$Boost.$Rarity.UNCOMMON = new $Boost.$Rarity("uncommon", 5);

$Boost.$Rarity.RARE = new $Boost.$Rarity("rare", 2);

$Boost.$Rarity.VERY_RARE = new $Boost.$Rarity("very_rare", 1);

$Boost.$Rarity.NONE = new $Boost.$Rarity("none", 0);

/**
 * 
 * @param {string} name 
 * @param {$Boost.$Rarity} fallback 
 * @returns {$Boost.$Rarity}
 */
$Boost.$Rarity.byName = function (name, fallback) {
    let values = {
        "super_common": $Boost.$Rarity.SUPER_COMMON,
        "common": $Boost.$Rarity.COMMON,
        "uncommon": $Boost.$Rarity.UNCOMMON,
        "rare": $Boost.$Rarity.RARE,
        "very_rare": $Boost.$Rarity.VERY_RARE,
        "none": $Boost.$Rarity.NONE
    }
    return values[name] ?? fallback;
}
