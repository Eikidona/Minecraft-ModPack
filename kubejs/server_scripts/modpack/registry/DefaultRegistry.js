// priority: 30000

/**
 * @class
 * @classdesc 注册表
 * 
 * @template T
 * @implements {$IRegistry}
 * 
 * @param {ResourceLocation} defaultKey 
 * @param {T} defaultValue 
 */
function $DefaultRegistry(defaultKey, defaultValue) {
  /**
   * @description
   * @private
   * @type {ResourceLocation}
   */
  this.defaultKey = defaultKey;
  /**
   * @description
   * @private
   * @type {T}
   */
  this.defaultValue = defaultValue;
  /**
   * @description 值映射键
   * @private
   * @type {Internal.Map<T, ResourceLocation>}
   */
  this.byValue = Utils.newMap();
  /**
   * @description 键映射值
   * @private
   * @type {Internal.Map<ResourceLocation, T>}
   */
  this.byKey = Utils.newMap();
}

/**
* @type {$IRegistry}
*/
$DefaultRegistry.prototype = {
  /**
   * @description 获取注册项 可能为undefined
   * @param {ResourceLocation} name 
   * @returns {T | undefined} 
   */
  get: function (name) {
      return this.byKey.getOrDefault(name, this.defaultValue);
  },
  /**
   * @description 获取注册名 可能为undefined
   * @param {T} entry 
   * @returns {ResourceLocation | undefined} 
   */
  getKey: function (entry) {
      return this.byValue.getOrDefault(entry, this.defaultKey);
  },
  /**
   * @description 注册 返回注册项
   * @param {ResourceLocation} name 
   * @param {T} entry 
   * @returns {T} 
   */
  register: function (name, entry) {
      this.byKey.put(name, entry);
      this.byValue.put(entry, name);
      return entry;
  },
  /**
   * @description 是否存在指定键
   * @param {ResourceLocation} name 
   */
  hasKey: function (name) {
      return this.byKey.containsKey(name);
  },
  /**
   * @description 是否存在指定项
   * @param {T} entry 
   */
  hasValue: function (entry) {
      return this.byValue.containsKey(entry);
  }
}