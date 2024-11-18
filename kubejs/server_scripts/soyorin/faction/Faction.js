/**
 * @class
 * @classdesc
 */
function $Faction() {
  /**
   * @type {ResourceLocation}
   */
  this.name;
  /**
   * @type {Set<Special.EntityType>}
   */
  this.defaultEntities;
  /**
   * @type {ResourceLocation[]}
   */
  this.homeDimensions;
  /**
   * @type {Internal.CompoundTag}
   */
  this.banner;
  /**
   * @type {$RaidConfig}
   */
  this.raidConfig;
  /**
   * @type {$BoostConfig}
   */
  this.boostConfig;
  /**
   * @type {$FactionRelations}
   */
  this.relations;
  /**
   * @type {ResourceLocation}
   */
  this.activationAdvancement;
}

$Faction.prototype.getName = function () {
  return this.name;
}