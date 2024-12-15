/**
 * @class
 */
function $PersistentDataManager() {
  /**
   * @type {Internal.Map<(Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer), $IPersistentDataProvider>}
   */
  this.dataProviders = Utils.newMap()
}
/**
 * @description 获取对象的DataProvider
 * @param {(Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer)} object 
 */
$PersistentDataManager.prototype.getDataProvider = function (object) {
  return this.dataProviders.computeIfAbsent(object, () => {
    let dataProvider = new $PersistentDataProvider();
    dataProvider.deserializeNBT(object.getPersistentData());
    return dataProvider;
  });
}
/**
 * @description 删除对象的DataProvider
 * @param {(Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer)} object 
 */
$PersistentDataManager.prototype.removeDataProvider = function (object) {
  this.dataProviders.remove(object);
}
/**
 * @description 加载
 * @param {(Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer)} object 
 */
$PersistentDataManager.prototype.load = function (object) {
  this.getDataProvider(object).deserializeNBT(object.getPersistentData());
  // if (object.getPersistentData().contains("Datas", Tag.TAG_LIST)) {
  //   let dataList = object.getPersistentData().getList("Datas", Tag.TAG_STRING);
  //   dataList.forEach(
  //     /**@param {Internal.StringTag} */
  //     stringDataId => {
  //     let locationDataId = new ResourceLocation(stringDataId);

  //     if ($Registries.PERSISTENT_DATA.hasKey(locationDataId)) {
  //       let supplierData = $Registries.PERSISTENT_DATA.get(locationDataId);
  //       let data = supplierData();
  //       data.deserializeNBT(object.getPersistentData());
  //       this.getDataProvider(object).addData(name, data);

  //       /**@type {Internal.CompoundTag} */
  //       let dataNBT = new CompoundTag().put(stringDataId, new CompoundTag());
  //       dataNBT.merge(data.serializeNBT());
  //       object.getPersistentData().merge(dataNBT);
  //     }
  //     else {
  //       console.error(`Data: ${stringDataId}不存在`);
  //       dataList.remove(stringDataId);
  //     }
  //   })
  // }
  // else {
  //   object.getPersistentData().put("Datas", new ListTag());
  // }
}

/**
 * @description 保存
 * @param {(Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer)} object 
 */
$PersistentDataManager.prototype.save = function (object) {
  // let dataList = object.getPersistentData().getList("Datas", Tag.TAG_STRING);
  // dataList.clear();
  let dataProviderNBT = this.getDataProvider(object).serializeNBT();
  object.getPersistentData().merge(dataProviderNBT);

  // for (const stringDataId of dataProviderNBT.getAllKeys()) {
  //   dataList.add(StringTag.valueOf(stringDataId));
  // }
}



$PersistentDataManager.INSTANCE = new $PersistentDataManager();