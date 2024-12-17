/**
 * @interface 
 * 
 * @typedef $IEventBusBuilder
 * @property {() => $IEventBus} build
 */

/**
 * @interface
 */
function $IEventBusBuilder() { };

/**
 * @description 获取Builder
 * @static
 * @returns {$EventBusBuilder}
 */
$IEventBusBuilder.builder = function () {
  return new $EventBusBuilder();
}