// priority: 2000
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
   * @type {$FactionEntityType}
   */
  this.factionEntityType;
  /**
   * @type {$FactionEntityRank}
   */
  this.factionEntityRank;
  /**
   * @type {Boolean}
   */
  this.isStuck = false;

  this.deserializeNBT(entity.getPersistentData()); // 从数据创建
  $FactionEntity.VALUES.set(String(this.entity.getStringUuid()), this);
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
 * @param {$FactionEntityType} factionEntityType 
 */
$FactionEntity.prototype.getFactionEntityType = function () {
  return this.factionEntityType;
}

/**
 * 
 * @param {$FactionEntityType} factionEntityType 
 */
$FactionEntity.prototype.setFactionEntityType = function (factionEntityType) {
  this.factionEntityType = factionEntityType;
}

$FactionEntity.prototype.getFactionEntity = function () {
  return this.factionEntity;
}

/**
 * 
 * @param {$FactionEntity} factionEntity 
 */
$FactionEntity.prototype.setFactionEntity = function (factionEntity) {
  this.factionEntity = factionEntity;
}

$FactionEntity.prototype.getFactionEntityRank = function () {
  return this.factionEntityRank;
}

/**
 * 
 * @param {$FactionEntityRank} factionEntityRank 
 */
$FactionEntity.prototype.setFactionEntityRank = function (factionEntityRank) {
  this.factionEntityRank = factionEntityRank;
}

/**
 * 
 * @param {$FactionEntityRank} factionEntityRank 
 * @returns {boolean}
 */
$FactionEntity.prototype.hasRank = function (factionEntityRank) {
  return this.factionEntityRank == factionEntityRank;
}

/**
 * 反序列化为对象
 * @param {Internal.CompoundTag} nbt 
 */
$FactionEntity.prototype.deserializeNBT = function (nbt) {
  if (nbt.contains("Faction")) {
    this.setFaction($FactionRegistry.getFaction(String(nbt.getString("Faction"))));
    // nbt.putString("Faction", String(this.faction.getName()));
  }
  if (nbt.contains("FactionEntity")) {
    // this.setFactionEntityRank($FactionEntityRank)
    // nbt.putString("FactionEntity", String(this.factionEntity.getName()));
  }
  if (nbt.contains("FactionEntityRank")) {
    // nbt.putString("FactionEntityRank", String(this.factionEntityRank.getName()));
  }
  if (nbt.contains("FactionEntityType")) {
    // nbt.putString("FactionEntityType", String(this.factionEntityType.getName()));
  }
  if (nbt.contains("TargetPosition")) {
    // nbt.putString("FactionEntityType", String(this.factionEntityType.getName()));
  }
}

/**
 * 序列化为NBT
 * @returns {Internal.CompoundTag}
 */
$FactionEntity.prototype.serializeNBT = function () {
  let nbt = new CompoundTag();
  if (this.faction) {
    nbt.putString("Faction", String(this.faction.getName()));
  }
  if (this.factionEntity) {
    nbt.putString("FactionEntity", String(this.factionEntity.getName()));
  }
  if (this.factionEntityRank) {
    nbt.putString("FactionEntityRank", String(this.factionEntityRank.getName()));
  }
  if (this.factionEntityType) {
    nbt.putString("FactionEntityType", String(this.factionEntityType.getName()));
  }
  if (this.targetPosition) {
    nbt.putLongArray("TargetPosition", this.targetPosition);
  }
  return nbt;
}

/**
 * @type {Map<string, $FactionEntity>} Entity String Uuid : FactionEntity
 */
$FactionEntity.VALUES = new Map();