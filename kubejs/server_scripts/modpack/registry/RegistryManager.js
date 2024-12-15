// priority: 20000

/**
 * @class
 * @classdesc 注册表管理器
 */
function $RegistryManager() {

}

/**
 * @description
 * @static
 * @type {$Registry<$Registry<T>>}
 */
$RegistryManager.ROOT_REGISTRY = new $Registry();

/**
 * @description 登记注册表
 * @static
 * @param {$IRegistry<T>}
 * @param {ResourceLocation} name
 */
$RegistryManager.registerRegistry = function (registry, name) {
  this.ROOT_REGISTRY.register(name, registry);
}

/**
 * @description 获取注册项
 * @param {ResourceLocation} registryName
 * @param {ResourceLocation} name
 * @returns {T | undefined}
 */
$RegistryManager.getRegisterEntry = function (registryName, name) {
  return this.ROOT_REGISTRY.get(registryName)?.get(name);
}