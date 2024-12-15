/**
 * @class 
 */
function $EventFactory() { }

/**
 * @description 收集注册的数据
 * @returns {Internal.Map<ResourceLocation, () => $IPersistentData>}
 */
$EventFactory.gatherRegisterDatas = function () {
  let event = new $RegisterPersistentDataEvent();
  $Modpack.EVENT_BUS.post(event);
  return event.getDatas();
}