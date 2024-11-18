// priority: 1000

/**
 * @class
 * @classdesc 初始化事件 调用addListener等 可以考虑用于初始化一些Supplier<T>
 * @extends {$Event}
 * @description 它现在除了作为一个标志之外还没有实际意义 也许将来会添加功能
 */
function $InitEvent() {
  $Event.call(this);
}
// extends $Event
$InitEvent.prototype = Object.create($Event.prototype);
