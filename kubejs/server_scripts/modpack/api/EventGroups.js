const ModpackEvents = {
  /**
   * @description 注册数据
   * @param {(event: $RegisterPersistentDataEvent) => void} callback 
   */
  registerPersistentData: function (callback) {
    $Modpack.EVENT_BUS.addListener($RegisterPersistentDataEvent, callback);
  }
}