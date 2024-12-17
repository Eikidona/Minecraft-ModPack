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