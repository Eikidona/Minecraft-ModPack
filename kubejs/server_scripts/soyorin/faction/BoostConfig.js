/**
 * @class
 * @classdesc
 * @param {$BoostDistributionType} boostDistributionType 
 * @param {ResourceLocation[]} mandatoryResourceLocations 
 * @param {ResourceLocation[]} whitelistResourceLocations 
 * @param {ResourceLocation[]} blacklistResourceLocations 
 * @param {Map<string, $Boost.Rarity>} rarityOverridesLocations 
 */
function $BoostConfig(boostDistributionType, mandatoryResourceLocations, whitelistResourceLocations, blacklistResourceLocations, rarityOverridesLocations) {
  
}

/**
 * @class
 * @classdesc 
 * @param {string} name 
 */
$BoostConfig.$BoostDistributionType = function (name) {
  this.name = name;
}

$BoostConfig.$BoostDistributionType.prototype.getName = function () {
  return this.name;
}

$BoostConfig.$BoostDistributionType.RANDOM = "random";
$BoostConfig.$BoostDistributionType.UNIFORM_ALL = "uniform_all";
$BoostConfig.$BoostDistributionType.UNIFORM_TYPE = "uniform_type";
$BoostConfig.$BoostDistributionType.LEADER = "leader";
$BoostConfig.$BoostDistributionType.STRONG_FAVOURED = "strong_favoured";
$BoostConfig.$BoostDistributionType.WEAK_FAVOURED = "weak_favoured";