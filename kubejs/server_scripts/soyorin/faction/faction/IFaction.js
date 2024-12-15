// priority: 1000
/**
 * @interface $IFaction 派系
 */
function $IFaction() {

}

/**
 * @description 获取派系显示名
 * @returns {Internal.CompoundTag}
 */
$IFaction.prototype.getName = function () {
  
}

/**
 * @deprecated 不再需要
 * @description 获取派系注册名
 * @returns {string}
 */
$IFaction.prototype.getEncodeId = function () {

}

/**
 * @description 获取派系默认实体
 * @returns {Set<Special.EntityType>}
 */
$IFaction.prototype.getEntities = function () {

}

/**
 * @description 获取派系关系
 * @returns {$FactionRelations}
 */
$IFaction.prototype.getFactionRelations = function () {

}

/**
 * @description 是否为敌人
 * @param {$IFaction} faction
 * @returns {boolean}
 */
$IFaction.prototype.isEnemy = function (faction) {
  return this.getFactionRelations().isEnemy(faction);
}

/**
 * @description 是否为盟友
 * @param {$IFaction} faction
 * @returns {boolean}
 */
$IFaction.prototype.isAlly = function (faction) {
  return this.getFactionRelations().isAlly(faction);
}

/**
 * @description 获取派系
 * @returns {Set<Special.EntityType>}
 */
$IFaction.prototype.getEntities = function () {

}

/**
 * @description 获取FactionEntityType权重表
 * @returns {$WeightTable<$IFactionEntityType>}
 */
$IFaction.prototype.getFactionEntityTypes = function () {

}