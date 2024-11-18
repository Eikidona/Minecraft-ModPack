// priority: 3000

/**
 * @class
 * @classdesc 具有默认值的注册表
 * @template T
 * @extends {$Registry<T>} 
 * @param {string} defaultKey 
 * @param {T} defaultKey 
 */
function $DefaultRegistry(defaultKey, defaultValue) {
  /**@type {Map<string, T>} */
  this.byKey;
  /**@type {Map<T, string>} */
  this.byValue;
  $Registry.call(this);
  /**@type {string} */
  this.defaultKey = String(new ResourceLocation(String(defaultKey)));
  /**@type {T} */
  this.defaultValue = defaultValue;

  this.byKey.set(this.defaultKey, this.defaultValue);
  this.byValue.set(this.defaultValue, this.defaultKey);
}
$DefaultRegistry.prototype = Object.create($Registry.prototype);
$DefaultRegistry.prototype.constructor = $DefaultRegistry;

$DefaultRegistry.prototype.getDefaultKey = function () {
  return this.defaultKey;
}

$DefaultRegistry.prototype.getDefaultValue = function () {
  return this.defaultValue;
}
/**
 * 获取注册项 返回对应注册项或默认注册项
 * @param {string} name 
 * @returns {T} 
 */
$DefaultRegistry.prototype.get = function (name) {
  /**@type {$Optional<T>} */
  let optional = $Registry.prototype.get.call(this, name);
  return optional.isPresent() ? optional.get() : this.defaultValue;
}
/**
 * 获取注册项 返回对应注册名或默认注册名
 * @param {T} value 
 * @returns {string} 
 */
$DefaultRegistry.prototype.getKey = function (value) {
  /**@type {$Optional<string>} */
  let optional = $Registry.prototype.getKey.call(this, value);
  return optional.isPresent() ? optional.get() : this.defaultKey;
}