// priority: 1000
/**
 * @class
 * @classdesc
 * @param {$BoostDistributionType} boostDistributionType 提升分布类型
 * @param {ResourceLocation[]} mandatoryResourceLocations 强制拥有的提升
 * @param {ResourceLocation[]} whitelistResourceLocations 白名单提升
 * @param {ResourceLocation[]} blacklistResourceLocations 黑名单提升
 * @param {$Pair<ResourceLocation, $Boost.Rarity>[]} rarityOverridesLocations 稀有度覆盖
 */
function $FactionBoostConfig(boostDistributionType, mandatoryResourceLocations, whitelistResourceLocations, blacklistResourceLocations, rarityOverridesLocations) {
  this.boostDistributionType = boostDistributionType;
  this.mandatoryResourceLocations = mandatoryResourceLocations;
  this.whitelistResourceLocations = whitelistResourceLocations;
  this.blacklistResourceLocations = blacklistResourceLocations;
  this.rarityOverridesLocations = rarityOverridesLocations;
}

$FactionBoostConfig.prototype.getBoostDistributionType = function () {
  return this.boostDistributionType;
}

$FactionBoostConfig.prototype.getMandatoryResourceLocations = function () {
  return this.mandatoryResourceLocations;
}

$FactionBoostConfig.prototype.getMandatoryBoosts = function () {
  return this.mandatoryResourceLocations.map(factionName => $Boosts.getBoost(factionName));
}

$FactionBoostConfig.prototype.getWhitelistResourceLocations = function () {
  return this.whitelistResourceLocations;
}

$FactionBoostConfig.prototype.getWhitelistBoosts = function () {
  return this.whitelistResourceLocations.map(factionName => $Boosts.getBoost(factionName));
}

$FactionBoostConfig.prototype.getBlacklistResourceLocations = function () {
  return this.blacklistResourceLocations;
}

$FactionBoostConfig.prototype.getBlacklistBoosts = function () {
  return this.blacklistResourceLocations.map(factionName => $Boosts.getBoost(factionName));
}

$FactionBoostConfig.prototype.getRarityOverridesLocations = function () {
  return this.rarityOverridesLocations;
}

$FactionBoostConfig.prototype.getRarityOverrides = function () {
  /**@type {Map<$Boost, $Boost.$Rarity>} */
  let map = new Map();
  this.rarityOverridesLocations.forEach(pair => {
    let boost = $Boosts.getBoost(pair.getFirst());
    map.set(boost, boost.getRarity());
  });
  return map;
}

$FactionBoostConfig.DEFAULT = new $FactionBoostConfig($BoostDistributionType.RANDOM, [], [], [], []);

