/**
 * @class
 * @classdesc
 * @param {Internal.Mob} entity 
 */
function $FactionEntity(entity) {
  this.entity = entity;
  /**
   * @type {$Faction}
   */
  this.faction;
  /**
   * @type {$FactionEntity}
   */
  this.factionEntity;
  /**
   * @type {BlockPos}
   */
  this.targetPosition;
  /**
   * @type {Internal.LivingEntity}
   */
  this.nearestDamagedFactionAlly;
  /**
   * @type {$FactionEntityRank}
   */
  this.factionEntityRank;
  /**
   * @type {Boolean}
   */
  this.isStuck = false;
}

/**
 * 
 * @returns {Internal.Mob}
 */
$FactionEntity.prototype.getEntity = function () {
  return this.entity;
}

/**
 * 
 * @param {Internal.Mob} entity 
 */
$FactionEntity.prototype.setEntity = function (entity) {
  this.entity = entity;
}

/**
 * 
 * @returns {$Faction}
 */
$FactionEntity.prototype.getFaction = function () {
  return this.faction;
}

/**
 * 
 * @param {$Faction} faction 
 */
$FactionEntity.prototype.setFaction = function (faction) {
  this.faction = faction;
}

$FactionEntity.prototype.getNearestDamagedFactionAlly = function () {
  return this.nearestDamagedFactionAlly;
}

/**
 * 
 * @param {Internal.CompoundTag} nbt 
 */
$FactionEntity.prototype.deserializeNBT = function (nbt) {
  if (this.faction) {
    nbt.putString("Faction", String(this.faction.getName()));
  }
}

$FactionEntity.prototype.serializeNBT = function () {
  let nbt = new CompoundTag();
  if (this.faction) {
    nbt.putString("Faction", String(this.faction.getName()));
  }
  return nbt;
}

