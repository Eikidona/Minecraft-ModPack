// priority: 2000


/**
 * @class
 * @classdesc JS并不适用只是检查null的Optional 更多时候是检查undefined 因此有了它
 * @template T
 */
function $Optional(value) {
  /**@type {T} */
  this.value = value;
}

/**
 * 获取内部值
 * @returns {T}
 */
$Optional.prototype.get = function () {
  return this.value;
}
/**
 * 如果存在则执行
 * @param {(value: T) => void} consumer 
 */
$Optional.prototype.ifPresent = function (consumer) {
  if (Boolean(this.value)) {
    consumer(this.value);
  }
}
/**
 * 如果存在则执行 否则
 * @param {(value: T) => void} consumer 
 * @param {() => void} runable 
 */
$Optional.prototype.ifPresentOrElse = function (consumer, runable) {
  if (Boolean(this.value)) {
    consumer(this.value);
  } else {
    runable();
  }
}
/**
 * 值如果为undefined或null则为true
 * @returns {boolean}
 */
$Optional.prototype.isEmpty = function () {
  return Boolean(this.value);
}
/**
 * 值如果为undefined或null则为true
 * @returns {boolean}
 */
$Optional.prototype.isPresent = function () {
  return Boolean(this.value);
}

/**
 * 以非空值创建对象
 * @param {T} value 
 * @returns {$Optional<T>}
 */
$Optional.of = function (value) {
  if (!Boolean(value)) throw new Error('传递的value为空值');
  return new $Optional(value);
}
/**
 * 以可能为空的值创建对象
 * @param {T} value 
 * @returns {$Optional<T>}
 */
$Optional.ofNullable = function (value) {
  return new $Optional(value);
}
/**
 * 空的$Optional
 * @returns {$Optional<T>}
 */
$Optional.empty = function () {
  return new $Optional();
}