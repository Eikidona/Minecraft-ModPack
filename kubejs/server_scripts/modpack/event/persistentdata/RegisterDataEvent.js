/**
 * @class
 * @extends {$Event}
 */
function $RegisterPersistentDataEvent() {
  /**
   * @description
   * @private
   * @type {Internal.Map<ResourceLocation, () => $IPersistentData>}
   */
  this.datas = Utils.newMap();
  $Event.call(this);
}

/**
 * @type {$Event}
 */
$RegisterPersistentDataEvent.prototype = Object.create($Event.prototype);
/**
 * @private
 * @type {$Event}
 */

$RegisterPersistentDataEvent.prototype.constructor = $RegisterPersistentDataEvent;

/**
 * @description 注册
 * @param {ResourceLocation} name
 * @param {() => $IPersistentData} dataSupplier
 */
$RegisterPersistentDataEvent.prototype.register = function (name, dataSupplier) {
  this.datas.put(name, dataSupplier);
}

/**
 * @description 获取数据
 * @private
 * @returns {Internal.Map<ResourceLocation, () => $IPersistentData>}
 */
$RegisterPersistentDataEvent.prototype.getDatas = function () {
  return this.datas;
}