// /**
//  * @class
//  * @classdesc 注册表们
//  */
// function $BuiltlnRegistries() { };

// /**
//  * Static
//  */
// /**
//  * 可能是等待执行注册表引导的加载队列
//  * @type {Map<ResourceLocation, Internal.Supplier_<?>} 
//  */
// $BuiltlnRegistries.LOADERS = new Map();
// /**
//  * 根注册表 存放注册表
//  * @type {$Registry<$Registry<T>>} 
//  */
// $BuiltlnRegistries.REGISTRY = new $Registry();
// /**
//  * 简单的创建注册表
//  * @param {$ResourceKey<$Registry<T>>} registryKey 
//  * @param {(registry: $Registry<T>) => Object} bootstrap 注册表引导
//  * @returns {$Registry<T>} 
//  */
// $BuiltlnRegistries.registerSimple = function (registryKey, bootstrap) {
//   let registryName = registryKey.getLocation();
//   let registry = new $Registry();

//   // $Registry.registerRegistry(registryName, registry);
//   $BuiltlnRegistries.LOADERS.set(registryName, () => bootstrap(registry)); // 加入待执行注册表引导队列
//   $BuiltlnRegistries.REGISTRY.register(registryName, registry); // 登记注册表
//   return registry;
// }
// /**
//  * 创建内容 该函数将对LOADERS内的Supplier<bootstrap()>依次执行
//  */
// $BuiltlnRegistries.createContents = function () {
//   try {
//     $BuiltlnRegistries.LOADERS.forEach((supplier, name, map) => {
//       let value = supplier(); // 这个理应返回默认注册项
//       if (!Boolean(value)) throw new Error(`注册表${String(name)}初始化失败 其bootstrap()未返回默认注册项`);
//     })
//   } catch (error) {
//     console.error(error);
//   }

// }
// /**
//  * 引导初始化 这里会被Bootstrap类的Bootstrap方法调用 最终被Main类Bootstrap方法调用
//  */
// $BuiltlnRegistries.bootstrap = function () {
//   $BuiltlnRegistries.createContents();
  
// }
// /**
//  * @type {$Registry<T>} TEST 注册表
//  */
// $BuiltlnRegistries.TEST = $BuiltlnRegistries.registerSimple($Registryies.TEST,)