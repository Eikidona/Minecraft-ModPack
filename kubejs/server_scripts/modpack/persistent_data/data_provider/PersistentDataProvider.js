/**
 * @class
 * @implements {$IPersistentDataProvider}
 */
function $PersistentDataProvider() {
  /**
   * @type {Internal.Map<ResourceLocation, $IPersistentData>}
   */
  this.datas = Utils.newMap();
}

/**
 * @type {$IPersistentDataProvider}
 */
$PersistentDataProvider.prototype = {
  /**
   * 
   * @param {ResourceLocation} name 
   * @returns {$IPersistentData?}
   */
  getData: function (name) {
    return this.datas.get(name);
  },
  /**
   * 
   * @param {ResourceLocation} name 
   * @param {$IPersistentData} data 
   */
  addData: function (name, data) {
    this.datas.put(name, data);
  },
  /**
   * @description 序列化
   * @returns {Internal.CompoundTag}
   */
  serializeNBT: function () {
    let nbt = new CompoundTag();
    for (const data of this.datas.entrySet()) {
      /**@type {Internal.CompoundTag} */
      let dataNBT = nbt.put(data.getKey().toString(), new CompoundTag());
      dataNBT.merge(data.getValue().serializeNBT());
    }
    return nbt;
  },
  /**
   * @description 反序列化
   * @param {Internal.CompoundTag} nbt 
   */
  deserializeNBT: function (nbt) {
    for (const stringDataId of nbt.getAllKeys()) {
      if ($Registries.PERSISTENT_DATA.hasKey(stringDataId)) {
        let locationDataId = new ResourceLocation(stringDataId);
        let data = $Registries.PERSISTENT_DATA.get(locationDataId)();
        data.deserializeNBT(nbt);
        this.datas.put(locationDataId, data);
      } else {
        console.error(`Data: ${stringDataId}不存在`);
      }
    }
  }
}