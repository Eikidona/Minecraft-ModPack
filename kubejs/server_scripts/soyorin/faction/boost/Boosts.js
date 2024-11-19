/**
 * @class
 * @classdesc
 */
function $Boosts() {

}

/**
 * @type {Map<string, $Boost>}
 */
$Boosts.BOOSTS = new Map();

/**
 * 
 * @param {ResourceLocation} name 
 * @param {$Boost} boost 
 */
$Boosts.register = function (name, boost) {
    $Boosts.BOOSTS.set(String(name), boost);
}

/**
 * 
 * @param {ResourceLocation} factionResourcelocation 
 */
$Boosts.getBoost = function (factionResourcelocation) {
    return this.BOOSTS.get(String(factionResourcelocation)) ?? $NoBoost.INSTANCE;
}