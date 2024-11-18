// /**
//  * @class
//  * @classdesc 新注册表事件 这个事件用于创建注册表
//  */
// function $NewRegistryEvent() {
//   // /**@type {$RegistryBuilder[]} 构造队列 外部不要使用它 */
//   // this.registryBuilders;
// }

// /**
//  * 创建注册表 
//  * @returns {$RegistryBuilder}
//  */
// $NewRegistryEvent.prototype.create = function () {
//   let builder = new $RegistryBuilder();
//   $NewRegistryEvent.REGISTRY_BUILDERS.push(builder);
//   return builder;
// }
// // /**
// //  * 获取注册表构建器
// //  * @returns {$RegistryBuilder}
// //  */
// // $NewRegistryEvent.prototype.getBuilder = function () {
// //   return new $RegistryBuilder();
// // }
// // /**
// //  * 创建注册表
// //  * @param {$RegistryBuilder} builder
// //  * @returns {$Registry<T>}
// //  */
// // $NewRegistryEvent.prototype.create = function (builder) {
// //   return $RegistryBuilder.build(builder); // 未完工
// // }
// // /**
// //  * 登记注册表到根注册表
// //  * @param {$Registry<T>} registry
// //  */
// // $NewRegistryEvent.prototype.register= function(registry){
// //   $Registry.registerRegistry()
// // }


// /**
//  * Static
//  */

// /**
//  * 构建器数组
//  * @type {$RegistryBuilder[]}
//  */
// $NewRegistryEvent.REGISTRY_BUILDERS = [];

// /**
//  * 构建注册表
//  */
// $NewRegistryEvent.build = function () {
//   if (this.REGISTRY_BUILDERS.length > 0) {
//     console.log(`长度 ${this.REGISTRY_BUILDERS.length}`)
//     this.REGISTRY_BUILDERS.forEach(builder => {

//       let registryKey = $ResourceKey.createRegistryKey(new ResourceLocation(builder.registryName));
//       let registry = $Registry.create(new $ResourceKey(registryKey.getRegistry(), new ResourceLocation(builder.defaultKey)), builder.defaultValue());
      
//       $RegistryManager.registerRegistry(registryKey, registry);
//     });
//   }
// }