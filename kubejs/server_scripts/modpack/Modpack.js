/**
 * @class 主类
 */
function $Modpack() { }

/**
 * @description 事件总线
 * @static
 * @type {$IEventBus}
 */
$Modpack.EVENT_BUS = $IEventBusBuilder.builder().build();