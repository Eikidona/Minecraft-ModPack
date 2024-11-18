// priority: 2000

/**
 * @class
 * @classdesc 事件基类 
 */
function $Event() {
  /**
   * @type {boolean} 可取消的 
   */
  this.cancelable = false;
  /**
   * @type {boolean} 已取消
   */
  this.canceled = false;
}

/**
 * 尝试取消事件 如果事件是Cancelable的 就会取消成功
 * @returns {boolean} 已经取消?
 */
$Event.prototype.cancel = function () {
  if (this.cancelable) {
    this.canceled = true;
  }
}
/**
 * 事件是否已经取消 
 * @returns {boolean} 已经取消?
 */
$Event.prototype.isCanceled = function () {
  return this.canceled;
}