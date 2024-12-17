/**
 * @class 
 */
function $EventFactory() { }

/**
 * @description 收集注册的数据
 * @returns {Internal.Map<ResourceLocation, Internal.Supplier_<$IPersistentData>>}
 */
$EventFactory.gatherRegisterData = function () {
  let event = new $RegisterPersistentDataEvent();
  $Modpack.EVENT_BUS.post(event);
  return event.getDatas();
}

/**
 * @description 收集附加的数据
 * @param {Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer} object
 * @returns {Internal.Map<ResourceLocation, $IPersistentData>}
 */
$EventFactory.gatherAttachData = function (object) {
  let event = new $AttachPersistentDataEvent(object);
  $Modpack.EVENT_BUS.post(event);
  return event.getDatas();
}