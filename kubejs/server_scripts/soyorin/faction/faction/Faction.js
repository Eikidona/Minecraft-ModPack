/**
 * @class
 * @classdesc
 * @param {ResourceLocation} name 
 * @param {$Faction.$FactionType} factionType 
 * @param {Internal.CompoundTag} banner 
 * @param {$FactionRaidConfig} raidConfig 
 * @param {$FactionBoostConfig} boostConfig 
 * @param {$FactionRelations} relations 
 * @param {$FactionEntityType[]} entityTypes 
 * @param {ResourceLocation} activationAdvancement 
 * @param {ResourceLocation[]} homeDimensions 
 * @param {Set<Special.EntityType>} defaultEntities 
 * @param {$DominionSpawner} dominionSpawner 
 */
function $Faction(name, factionType, banner, raidConfig, boostConfig, relations, entityTypes, activationAdvancement, homeDimensions, defaultEntities) {
  /**
   * @type {ResourceLocation}
   */
  this.name = name;
  /**
   * @type {$Faction.$FactionType}
   */
  this.factionType = factionType;
  /**
 * @type {Internal.CompoundTag}
 */
  this.banner = banner;
  /**
 * @type {$FactionRaidConfig}
 */
  this.raidConfig = raidConfig;
  /**
   * @type {$FactionBoostConfig}
   */
  this.boostConfig = boostConfig;
  /**
 * @type {$FactionRelations}
 */
  this.relations = relations;
  /**
   * @type {$FactionEntityType[]}
   */
  this.entityTypes = entityTypes;
  /**
   * @type {ResourceLocation}
   */
  this.activationAdvancement = activationAdvancement;
  /**
   * @type {ResourceLocation[]}
   */
  this.homeDimensions = homeDimensions;
  /**
   * @type {Set<Special.EntityType>}
   */
  this.defaultEntities = defaultEntities;
  /**
   * @type {$DominionSpawner}
   */
  this.dominionSpawner = new $DominionSpawner(this);
}

$Faction.prototype.getName = function () {
  return this.name;
}

$Faction.prototype.getDefaultEntities = function () {
  return this.defaultEntities;
}

$Faction.GAIA = new $Faction(new ResourceLocation("faction", "gaia"), $FactionType.GAIA, new CompoundTag(), $FactionRaidConfig.DEFAULT, $FactionBoostConfig.DEFAULT, $FactionRelations.DEFAULT, [], new ResourceLocation("faction", "default"), [new ResourceLocation("minecraft", "overworld")], new Set(),)

