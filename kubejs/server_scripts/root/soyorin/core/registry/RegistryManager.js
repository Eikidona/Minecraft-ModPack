// priority: 2000

/**
 * @class
 * @classdesc 注册表管理器
 */
function $RegistryManager() {
  // eventBus.addListener() 初始化完全没有必要再使用initEvent
  // $RegistryManager.postNewRegistryEvent(eventBus);
}

/**
 * prototype
 */

// /**
//  * 
//  * @param {$EventBus} eventBus 
//  */
// $RegistryManager.prototype.postEvent = function (eventBus) {
//   $RegistryManager.postNewRegistryEvent(eventBus);
// }

/**
 * Static
 */

/**
 * 根注册表
 * @type {$Registry<$DefaultRegistry<T>>} 
 */
$RegistryManager.ROOT_REGISTRY = new $Registry();
$RegistryManager.ROOT_REGISTRY_NAME = new ResourceLocation('modpack', 'root');

// /**
//  * 发布新建注册表事件
//  * @param {$EventBus} eventBus 
//  */
// $RegistryManager.postNewRegistryEvent = function (eventBus) {
//   let newRegistry = new $NewRegistryEvent();
//   eventBus.post(newRegistry);
//   $NewRegistryEvent.build();
//   // event.registryBuilders.forEach(builder => $RegistryBuilder.build(builder));
// }

// /**
//  * 登记注册表 
//  * @param {string} name
//  * @param {$Registry<T>} registry 
//  */
// $RegistryManager.registerRegistry = function (name, registry) {
//   this.ROOT_REGISTRY.register(name, registry);
// }

/**
 * 获取注册表对象
 * @param {string} name
 * @returns {$Optional<$Registry<T>>} 
 */
$RegistryManager.getRegistry = function (name) {
  return $RegistryManager.ROOT_REGISTRY.get(name);
}

/**
 * 获取注册表注册名
 * @param {$Registry<T>} registry
 * @returns {$Optional<string>}  
 */
$RegistryManager.getRegistryKey = function (registry) {
  return $RegistryManager.ROOT_REGISTRY.getKey(registry);
}

/**
 * 一键创建注册表
 * @param {string} name 
 * @param {string} defaultKey
 * @param {T} defaultValue
 * @returns {$Registry<T>} 
 */
$RegistryManager.createRegistry = function (name, defaultKey, defaultValue) {
  /**@type {$DefaultRegistry<T>} */
  let registry = new $DefaultRegistry(defaultKey, defaultValue);
  // let registryKey = $ResourceKey.createRegistryKey(new ResourceLocation(name));
  this.ROOT_REGISTRY.register(name, registry);
  return registry;
}

// // 添加注册表模块 它会负责在恰当时机将其实例化
// $Main.addModule($RegistryManager);
