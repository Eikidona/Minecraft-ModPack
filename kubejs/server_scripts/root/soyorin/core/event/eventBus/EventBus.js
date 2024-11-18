// priority: 1000

/**
 * @typedef {Object} $EventSubscriber 事件订阅者 
 * @property {function(): void} init 
 */

/**
 * @typedef {(event: $Event) => void} $EventHandler 事件回调
 */

/**
 * @typedef {number} $Priority - 优先级 默认为0
 */

/**
 * @class
 * @classdesc 拟事件总线 事件系统是一种不同模块间的通信手段...
 */
function $EventBus() {
  /**
   * 侦听器列表 存储了原型与侦听器 其中原型可以用于判断类型
   * @type {Map<Object, $EventListener[]>} 
  */
  this.listeners = new Map();
}
/**
 * 原型
 */

/**
 * 发布事件
 * @param {$Event} event 
 */
$EventBus.prototype.post = function (event) {
  // 即时侦听器列表存在侦听器
  if (this.listeners.has(Object.getPrototypeOf(event))) {
    this.listeners.get(Object.getPrototypeOf(event)).forEach(listener => {
      // 调用
      listener.onEvent(event);
    });
  }
}
/**
 * 添加具有默认优先级的事件侦听器
 * @overload
 * @param {Function} event 事件类
 * @param {($Event) => void} eventCallback 事件回调
 * @returns {void}
 */
/**
 * 添加指定优先级的事件侦听器
 * @overload
 * @param {Function} event 事件类
 * @param {($Event) => void} eventCallback 事件回调
 * @param {$Priority} priority 侦听器优先级
 * @returns {void}
 */
$EventBus.prototype.addListener = function (event, callback, priority) {
  if (this.listeners.has(event.prototype)) {
    this.listeners.get(event.prototype).push(new $EventListener(callback, priority));
  } else {
    this.listeners.set(event.prototype, []);
    this.listeners.get(event.prototype).push(new $EventListener(callback, priority));
  }
  // 优先级排序 同优先级则不变 触发时的顺序会体现添加顺序
  this.listeners.get(event.prototype).sort((a, b) => b.priority - a.priority);
}
/**
 * 注册一个对象或一个类 根据<>自动注册事件侦听器
 * @param {function | Object} object 
 */
$EventBus.prototype.register = function (object) {

}

// $EventBus.prototype = {
//   /**
//    * 发布事件
//    * @param {string} eventName
//    * @param {$Event} event
//    */
//   post: function (eventName, event) {
//     if (!(this.listeners.has(eventName))) return;
//     this.listeners.get(eventName).forEach(listener => {
//       // 调用
//       listener.onEvent(event)
//     });

//   },
//   /**
//    * 添加事件侦听器
//    * @overload
//    * @param {string} eventName - 事件id
//    * @param {(event: $Event) => void} eventCallback - 事件回调
//    * @returns {void}
//    */
//   /**
//    * 添加事件侦听器
//    * @overload
//    * @param {string} eventName - 事件id
//    * @param {(event: $Event) => void} eventCallback - 事件回调
//    * @param {$Priority} priority - 优先级 可选的
//    * @returns {void}
//    */
//   addListener: function (eventName, eventCallback, priority) {
//     if (this.listeners.has(eventName)) {
//       this.listeners.get(eventName).push(new $EventListener(eventCallback, priority));
//     } else {
//       this.listeners.set(eventName, []);
//       this.listeners.get(eventName).push(new $EventListener(eventCallback, priority));
//     }
//     // 优先级排序 同优先级则不变 触发时的顺序会体现添加顺序
//     this.listeners.get(eventName).sort((a, b) => b.priority - a.priority);
//   }
// }

/**
 * 静态
 */

/**
 * 全局访问入口点
 */
$EventBus.EVENT_BUS = new $EventBus();

// $EventBus.static = {
//   EVENT_BUS: new $EventBus(),
//   /**
//    * 添加订阅者 尽可能早的将订阅添加到事件总线 以防止事件发布时还未订阅的情况发生 还在设想实验中
//    * @param {$EventSubscriber} subscriber
//    */
//   addSubscriber: function (subscriber) {
//     // if (!Boolean(subscriber)) { // 添加的对象如果没有subscriber属性则退出并抛出错误
//     //   console.error('无效的订阅!添加的Subscriber对象没有subscriber属性');
//     // } else {
//     //   for (const key in subscriber.subscriber) {
//     //     if (Object.prototype.hasOwnProperty(key)) {
//     //       let element = object[key];
//     //       element

//     //     }
//     //   }
//     // }
//   },
//   /**
//    * 添加事件发布者 代替手动发布事件 将发布事件延后到init及其以后 防止过早的发布错过订阅 还在设想实验中
//    * @param {$EventPublisher} publisher
//    */
//   addEventPublisher: function (publisher) {

//   }
// }