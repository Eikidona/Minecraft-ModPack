/**
 * @class
 * @classdesc
 * @param {ResourceLocation} name 
 * @param {$FactionType} factionType 
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
   * @type {$FactionType}
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

$Faction.prototype.getFactionType = function () {
  return this.factionType;
}

$Faction.prototype.getRaidConfig = function () {
  return this.raidConfig;
}

$Faction.prototype.getBoostConfig = function () {
  return this.boostConfig;
}

$Faction.prototype.getEntityTypes = function () {
  return this.entityTypes;
}

$Faction.prototype.getActivationAdvancement = function () {
  return this.activationAdvancement;
}

$Faction.prototype.getHomeDimensions = function () {
  return this.homeDimensions;
}

$Faction.prototype.getDefaultEntities = function () {
  return this.defaultEntities;
}

/**
 * 
 * @param {$FactionEntityRank} rank 
 */
$Faction.prototype.getWeightMapForRank = function (rank) {
  
}

/**
 * 
 * @param {$EntityWeightMapProperties} properties 
 */
$Faction.prototype.getWeightMap = function (properties) {
  
}

$Faction.prototype.getBannerInstance = function () {
  // return Item.of(this.banner);
}

/**
 * 
 * @param {Internal.Mob} mob 
 */
$Faction.prototype.makeBannerHolder= function (mob) {
  mob.setEquipment("head", Item.of("white_banner"));
  mob.setDropChance("head", 2.0);
}

$Faction.prototype.addEntityTypes = function (factionEntityTypes) {
  
}

/**
 * 
 * @param {$Faction} faction 
 */
$Faction.prototype.isAllyOf = function (faction) {
  let isAlly;
  if (!faction || faction == $Faction.GAIA) {
    isAlly = false;
  } else {
    isAlly = this.relations.isAllyOf(faction);
  }
  return isAlly;
}

/**
 * 
 * @param {$Faction} faction 
 */
$Faction.prototype.isEnemyOf = function (faction) {
  let isEnemy;
  if (!faction || faction == $Faction.GAIA) {
    isEnemy = false;
  } else {
    isEnemy = this.relations.isEnemyOf(faction);
  }
  return isEnemy;
}

$Faction.prototype.getDominionSpawners = function () {
  
}

$Faction.prototype.getSpawnableFactionEntityTypes = function () {
  
}




$Faction.GAIA = new $Faction(new ResourceLocation("faction", "gaia"), $FactionType.GAIA, new CompoundTag(), $FactionRaidConfig.DEFAULT, $FactionBoostConfig.DEFAULT, $FactionRelations.DEFAULT, [], new ResourceLocation("faction", "default"), [new ResourceLocation("minecraft", "overworld")], new Set(),)

