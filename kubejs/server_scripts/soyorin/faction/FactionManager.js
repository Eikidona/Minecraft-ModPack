/**
 * @class
 * @classdesc
 */
function $FactionManager() {
  /**
   * @type {Map<string, $Faction>} 只是简单的Map映射 不搞复杂的东西了
   */
  this.factions = new Map();
}
/**
 * 注册
 * @param {string} name 
 * @param {$Faction} faction 
 */
$FactionManager.prototype.register = function (name, faction) {
  this.factions.set(name, faction);
}
/**
 * 获取
 * @param {string} name 
 * @returns {$Faction}
 */
$FactionManager.prototype.get = function (name) {
  return this.factions.get(name);
}