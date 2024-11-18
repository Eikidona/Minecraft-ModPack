/**
 * @description 提供外部使用的事件组 接受回调 注册addListener 外部并不知道事件id 因此需要它来代理
 */
const $ModpackEvents = {
  /**
   * 新建注册表事件
   * @param {(event: $NewRegistryEvent) => void} handler
   */
  newRegistry: function (handler) {
    $EventBus.EVENT_BUS.addListener($NewRegistryEvent, handler);
  }
}