/**
 * @class
 * @extends {$Event}
 * 
 * @param {Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer} object 
 */
function $AttachPersistentDataEvent(object) {
  /**
   * @private
   */
  this.object = object;
  /**
   * @private
   * @type {Internal.Map<ResourceLocation, $IPersistentData>}
   */
  this.datas = Utils.newMap();
  $Event.call(this);
}

/**
 * @type {$Event}
 */
$AttachPersistentDataEvent.prototype = Object.create($Event.prototype);
/**
 * @private
 */
$AttachPersistentDataEvent.prototype.constructor = $AttachPersistentDataEvent;

/**
 * @description 获取将要附加数据的对象
 * @returns {Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer}
 */
$AttachPersistentDataEvent.prototype.getObject = function () {
  return this.object;
}
/**
 * @description 获取附加的数据
 * @returns {Internal.Map<ResourceLocation, $IPersistentData>}
 */
$AttachPersistentDataEvent.prototype.getDatas = function () {
  return this.datas;
}
/**
 * @description 附加数据
 * @param {ResourceLocation} name
 * @param {$IPersistentData} data 
 */
$AttachPersistentDataEvent.prototype.attachData = function (name, data) {
  this.datas.put(name, data);
}
