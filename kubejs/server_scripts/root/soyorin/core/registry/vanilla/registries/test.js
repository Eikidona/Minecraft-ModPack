// /**
//  * 假设这是向TEST注册表注册的TEST对象
//  */

// /**
//  * @class
//  * @classdesc 
//  */
// function $Test() {
  
// }

// /**
//  * Static
//  */

// /**
//  * 
//  * @param {string} name 
//  */
// $Test.createKey = function (name) {
//   return new $ResourceKey($Registryies.TEST, new ResourceLocation(name));
// }

// $Test.TEST = $Test.createKey('test_resource_key');
  
// /**
//  * 注册表引导
//  * @param {$Registry<$Test>} registry 
//  */
// $Test.bootstrap = function (registry) {
//   $Registry.register(registry, $Test.TEST, 'testRegistryObject');
// }