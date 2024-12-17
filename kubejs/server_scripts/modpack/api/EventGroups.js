const ModpackEvents = {
  /**
   * @description 注册数据
   * @param {Internal.Consumer_<$RegisterPersistentDataEvent>} callback 
   */
  registerPersistentData: function (callback) {
    $Modpack.EVENT_BUS.addListener($RegisterPersistentDataEvent, callback);
  },
  /**
   * @description 附加数据
   * @param {Internal.Consumer_<$AttachPersistentDataEvent>} callback 
   */
  attachPersistentData: function (callback) {
    $Modpack.EVENT_BUS.addListener($AttachPersistentDataEvent, callback);
  }
}