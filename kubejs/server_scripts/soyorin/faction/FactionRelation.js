// priority: 2000

/**
 * @class
 * @classdesc 派系关系
 * @param {string[]} enemies 
 * @param {string[]} allies 
 */
function $FactionRelation(enemies, allies) {
  /**
   * 敌对派系
   * @type {Set<string>} 
   */
  this.enemies = new Set(enemies.map(name => String(new ResourceLocation(String(name)))));
  /**
   * 同盟派系
  * @type {Set<string>} 
  */
  this.allies = new Set(allies.map(name => String(new ResourceLocation(String(name)))));
}
/**
 * 派系是敌对的
 * @param {string} name
 * @returns {boolean} 
 */
$FactionRelation.prototype.isEnemy = function (name) {
  return this.enemies.has(String(new ResourceLocation(String(name))));
}
/**
 * 派系是同盟的
 * @param {string} name
 * @returns {boolean} 
 */
$FactionRelation.prototype.isAlliance = function (name) {
  return this.allies.has(String(new ResourceLocation(String(name))));
}
