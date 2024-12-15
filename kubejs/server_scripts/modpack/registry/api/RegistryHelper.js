// priority: 10000

/**
 * @class
 * @classdesc 注册表助手
 */
function $RegistryHelper() {

}

/**
 * @description 创建一般注册表
 * @param {ResourceLocation} name 
 * @returns {$Registry<T>}
 */
$RegistryHelper.createRegistry = function (name) {
  let registry = new $Registry();
  $RegistryManager.registerRegistry(registry, new ResourceLocation(name));
  return registry;
}
/**
 * @description
 * @param {ResourceLocation} defaultKey
 * @param {T} defaultValue
 * @returns {$DefaultRegistry<T>}
 */
$RegistryHelper.createDefaultRegistry = function (name, defaultKey, defaultValue) {
  let registry = new $DefaultRegistry(defaultKey, defaultValue);
  $RegistryManager.registerRegistry(registry, new ResourceLocation(name));
  return registry;
}