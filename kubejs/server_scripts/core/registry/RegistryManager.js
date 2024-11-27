// priority: 10001

/**
 * @class
 * @classdesc 注册表管理器
 */
function $RegistryManager() {
}
/**
 * @description 注册表
 * @type {Map<string, $Registry<T>>} 
 */
$RegistryManager.REGISTRIES = new Map();

/**
 * @description 创建注册表
 * @param {ResourceLocation} name 
 * @returns {$Registry<T>}
 */
$RegistryManager.createRegistry = function (name) {
    let registry = new $Registry();
    registry.name = name;
    this.REGISTRIES.set(String(name), registry);
    return registry;
}
/**
 * @description 获取注册表
 * @param {ResourceLocation} name 
 * @returns {$Registry<T> | undefined}
 */
$RegistryManager.getRegistry = function (name) {
    return this.REGISTRIES.get(String(name))
}
/**
 * @description 获取注册的对象
 * @param {ResourceLocation} registryName 
 * @param {ResourceLocation} name
 * @returns {T | undefined}
 */
$RegistryManager.getObject = function (registryName, name) {
    let object;
    let registry = this.getRegistry(registryName);
    if (registry) {
        object = registry.get(name);
    }
    return object;
}

