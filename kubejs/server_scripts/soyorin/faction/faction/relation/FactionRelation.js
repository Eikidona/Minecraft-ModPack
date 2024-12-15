// priority: 2000

/**
 * @class 派系关系
 * 
 * @param {string} targetFaction 目标派系注册名
 * @param {number} relation 
 */
function $FactionRelation(targetFaction, relation) {
  /**
   * @description 目标派系
   * @private
   * @type {string}
   */
  this.targetFaction = $Utils.toRegistryName(targetFaction);
  /**
   * @description 关系值
   * @private
   * @type {number}
   */
  this.relation = $Utils.math.clamp(relation, $FactionRelation.ENEMY_MAX, $FactionRelation.ALLY_MAX);;
}

/**
 * @description 获取目标派系注册名
 * @returns {string}
 */
$FactionRelation.prototype.getTargetFaction = function () {
  return this.targetFaction;
}

/**
 * @description 获取关系值
 * @returns {number}
 */
$FactionRelation.prototype.getRelation = function () {
  return this.relation;
}

/**
 * @description 是否为敌人
 * @returns {boolean}
 */
$FactionRelation.prototype.isEnemy = function () {
  return this.getRelation() <= $FactionRelation.ENEMY_MIN;
}

/**
 * @description 是否为盟友
 * @returns {boolean}
 */
$FactionRelation.prototype.isAlly = function () {
  return this.getRelation() >= $FactionRelation.ALLY_MIN;
}

/**
 * @description 调整关系
 * @param {number} amount
 * @returns {$FactionRelation}
 */
$FactionRelation.prototype.adjustRelation = function (amount) {
  this.relation += $Utils.math.clamp(amount, $FactionRelation.ENEMY_MAX, $FactionRelation.ALLY_MAX);
  return this;
}

/**
 * @description 敌人最大值
 * @static
 */
$FactionRelation.ENEMY_MAX = -1000;
/**
 * @description 敌人临界值
 * @static
 */
$FactionRelation.ENEMY_MIN = -10;
/**
 * @description 天然关系
 * @static
 */
$FactionRelation.NATURAL = 0;
/**
 * @description 盟友最大值
 * @static
 */
$FactionRelation.ALLY_MAX = 1000;
/**
 * @description 盟友最小值
 * @static
 */
$FactionRelation.ALLY_MIN = 10;