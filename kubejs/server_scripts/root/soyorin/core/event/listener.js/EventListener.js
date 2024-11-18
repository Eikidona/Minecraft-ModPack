// priority: 3000

/**
 * @class
 * @classdesc 事件监听器
 * @template {T}
 * @param {(event: $Event) => void} callback - 事件中执行的回调
 * @param {$Priority} priority 
 */
function $EventListener(callback, priority) {
  if (Boolean(priority)) {
    this.priority = priority;
  } else {
    this.priority = 0;
  }
  if (Boolean(callback)) {
    this.callback = callback;
  } else {
    this.callback = () => { console.warn('空事件监听器') };
  }

}
/**
 * 原型
 */

/**
 * 事件时执行 
 * @param {$Event} event 
 */
$EventListener.prototype.onEvent = function (event) {
  this.callback(event);
}

/**
 * 静态
 */

/**
 * 
 * @param {(event: $Event) => void} callback 
 * @returns {$EventListener}
 */
$EventListener.of = function (callback) {
  return new $EventListener(callback, 0);
}