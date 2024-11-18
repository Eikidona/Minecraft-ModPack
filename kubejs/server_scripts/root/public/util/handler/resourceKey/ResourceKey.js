// priority: 1000

/**
 * @class
 * @classdesc 需要以一种方式记录注册项 但使用已提供的ResourceKey可能会对游戏本身造成干涉 毕竟不是向minecraft注册事物
 * @template T
 * @param {ResourceLocation} registry 
 * @param {ResourceLocation} location 
 */
function $ResourceKey(registry, location) {
  /**@type {ResourceLocation} */
  this.registry = registry;
  /**@type {ResourceLocation} */
  this.location = location;
}
/**
* 获取该注册项的注册表的资源位置
* @returns {ResourceLocation}
*/
$ResourceKey.prototype.getRegistry = function () {
  return this.registry;
}
/**
 * 获取该注册项的资源位置
 * @returns {ResourceLocation}
 */
$ResourceKey.prototype.getLocation = function () {
  return this.location;
}
/**
 * 转换为字符串
 * @returns {string} 
 */
$ResourceKey.prototype.toString = function () {
  return `${this.getRegistry().toString() + '/' + this.location.toString()}`;
}
/**
 * Static
 */

/**
 * 创建注册表项
 * @param {ResourceLocation} name 注册表名
 * @returns {$ResourceKey<$Registry<T>>} 
 */
$ResourceKey.createRegistryKey = function (name) {
  return new $ResourceKey($RegistryManager.ROOT_REGISTRY_NAME, name);
}