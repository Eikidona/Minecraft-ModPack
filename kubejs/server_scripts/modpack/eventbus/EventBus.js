/**
 * @template {T extends Function}
 * @class
 * 
 */
function $EventBus() {
  /**
   * @description
   * @private
   * @type {Map<T, Array<(event: InstanceType<T>) => void>>}
   */
  this.listeners = new Map();
}

/**
 * @type {$IEventBus}
 */
$EventBus.prototype = {
  /**
   * @description 添加事件监听
   */
  addListener: function (eventType, callback) {
    let prototype = eventType.prototype;
    if (this.listeners.has(prototype)) {
      this.listeners.get(prototype).push(callback);
    } else {
      this.listeners.set(prototype, []);
      this.listeners.get(prototype).push(callback);
    }
  },
  /**
   * @description 发布事件
   */
  post: function (event) {
    let prototype = Object.getPrototypeOf(event);
    if (!this.listeners.has(prototype)) return;
    this.listeners.get(prototype).forEach(callback => callback(event));
  }
}

