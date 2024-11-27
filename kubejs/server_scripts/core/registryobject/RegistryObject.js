// priority: 10001
/**
 * @class
 * @param {ResourceLocation} name 
 * @param {ResourceLocation} registryName 
 * @template T
 */
function $RegistryObject(name, registryName) {
    this.name = name;
    this.registryName = registryName;
}
/**
 * @description 获取注册项
 * @returns {T}
 */
$RegistryObject.prototype.get = function () {
    return $RegistryManager.getObject(this.registryName, this.name);
}