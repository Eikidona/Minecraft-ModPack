// // priority: 1000

// /**
//  * @class
//  * @classdesc 原来这个类是存了一堆ResourceKey的啊...
//  */
// function $Registryies() { };

// $Registryies.ROOT_REGISTRY_NAME = new ResourceLocation('modpack', 'root');
// /**
//  * 创建注册表ResourceKey
//  * @param {string} name 
//  * @returns {$ResourceKey<$Registry<T>>}
//  */
// $Registryies.createRegistryKey = function (name) {
//   return new $ResourceKey($Registryies.ROOT_REGISTRY_NAME, new ResourceLocation(name));
// }

// /**
//  * @type {$ResourceKey<$Registry<T>>} TEST 注册表ResourceKey
//  */
// $Registryies.TEST = $Registryies.createRegistryKey('test');