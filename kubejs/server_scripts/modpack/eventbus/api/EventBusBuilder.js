/**
 * @class
 * @implements {$IEventBusBuilder}
 */
function $EventBusBuilder() {
  
}

/**
 * @type {$IEventBusBuilder}
 */
$EventBusBuilder.prototype = {
  build: function () {
    return new $EventBus();
  }
}

/**
 * @description 获取EventBusBuilder
 * @returns {$IEventBusBuilder}
 */
$EventBusBuilder.builder = function () {
  return new $EventBusBuilder();
}