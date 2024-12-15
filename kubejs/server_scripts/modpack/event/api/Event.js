/**
 * @class 事件基类
 */
function $Event() {
  /**
   * @description 是否已经取消
   * @private
   * @type {boolean}
   */
  this.isCanceled = false;
  /**
   * @description 事件结果
   * @private
   * @type {$EventResult}
   */
  this.result = $EventResult.DEFAULT;
}
/**
 * @description 是否可取消
 * @returns {boolean}
 */
$Event.prototype.isCancelable = function () {
  return false;
}

/**
 * @description 是否已经取消
 * @returns {boolean}
 */
$Event.prototype.isCanceled = function () {
  return this.isCanceled;
}

/**
 * @description 尝试取消事件
 */
$Event.prototype.cancel = function () {
  if (this.isCancelable()) this.isCanceled = true;
}

/**
 * @description 获取事件结果
 * @returns {$EventResult}
 */
$Event.prototype.getResult = function () {
  return this.result;
}
