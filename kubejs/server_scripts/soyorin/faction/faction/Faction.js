/**
 * @class 派系
 * @implements {$IFaction}
 * 
 * @param {Special.EntityType[]} entities 
 * @param {{factionEntityTypeId: string, weight: number}[]} factionEntityTypes 
 * @param {{factionId: string, relation: number}[]} factionRelations
 */
function $Faction(entities, factionEntityTypes, factionRelations) {
  /**
   * @description 成员实体
   * @private
   * @type {Set<Special.EntityType>}
   */
  this.entities = new Set(entities);
  /**
   * @description FactionEntityType权重列表
   * @private
   * @type {$WeightTable<$IFactionEntityType>}
   */
  this.factionEntityTypes = new $WeightTable(factionEntityTypes);
  /**
   * @description 派系关系
   * @type {$FactionRelations}
   */
  this.factionRelations = new $FactionRelations(factionRelations);
}

/**
 * @type {$IFaction}
 */
$Faction.prototype = Object.assign($IFaction.prototype);

/**
 * @description 获取派系实体
 * @returns {Set<Special.EntityType>}
 */
$Faction.prototype.getEntities = function () {
  return this.entities;
}

/**
 * @description 获取FactionEntityType权重列表
 * @returns {$WeightTable<$IFactionEntityType>}
 */
$Faction.prototype.getFactionEntityTypes = function () {
  return this.factionEntityTypes;
}

/**
 * @description 获取FactionRelations
 * @returns {$FactionRelations}
 */
$Faction.prototype.getFactionRelations = function () {
  return this.factionRelations;
}

/**
 * @description 是否为盟友
 * @param {$IFaction} faction
 * @returns {boolean}
 */
$Faction.prototype.isAlly = function (faction) {
  return this.getFactionRelations().isAlly(faction)
}

/**
 * @description 是否为敌人
 * @param {$IFaction} faction
 * @returns {boolean}
 */
$Faction.prototype.isEnemy = function (faction) {
  return this.getFactionRelations().isEnemy(faction)
}