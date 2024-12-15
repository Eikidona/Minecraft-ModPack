/**
 * @class 主类
 */
function $Modpack() { }

/**
 * @description 事件总线
 * @static
 * @type {$IEventBus}
 */
$Modpack.EVENT_BUS = $EventBusBuilder.builder().build();
/**
 * @param {$IModule} module
 */
$Modpack.addModule = function (module) {
  
}