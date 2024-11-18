// priority: 1000

/**
 * @class
 * @classdesc 主
 */
function $Main() {
  $Main.load();
}
/**
 * prototype
 */

// /**
//  * 初始化 准备修改这个流程
//  */
// $Main.init = function () {
//   ServerEvents.lowPriorityData(event => {
//     /**
//      * 此举意在解决优先级带来的问题
//      */
//     $EventBus.EVENT_BUS.post('init', new $InitEvent());

//   })
// }

/**
 * Static
 */
/**@type {Map<Object, Object} */
$Main.MODULES = new Map();

/**
 * 模拟@Mod 注解 代理依赖此系统的模块初始化 并使依赖此系统的模块可拆卸
 */

/**
 * 接受构造函数本身
 * @param {function($EventBus, $ModuleContainer): void} module 
 */
$Main.addModule = function (module) {
  this.MODULES.set(module.prototype, () => new module($EventBus.EVENT_BUS, new $ModuleContainer));
}

$Main.load = function () {
  ServerEvents.lowPriorityData(event => {
    // 加载 并调用对应函数
    this.MODULES.forEach((value, key, map) => {
      let instance = value()
      map.set(key, instance);
      if (Boolean(instance.postEvent)) {
        instance.postEvent($EventBus.EVENT_BUS);
      }
    })

  })
}

// 实例化
// $Main.INSTANCE = new $Main();

// $Main.static = {
//   INSTANCE: new $Main(),
//   init: function () {
//     ServerEvents.lowPriorityData(event => {
//       // 初始化事件 发布事件都应在此事件中
//       $EventBus.EVENT_BUS.post('init', new $InitEvent());

//     })
//   }
// }
// // 初始化
// $Main.static.init();