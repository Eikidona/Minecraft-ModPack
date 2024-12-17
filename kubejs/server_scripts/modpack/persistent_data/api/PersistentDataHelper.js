/**
 * @class
 */
function $PersistentDataHelper() { }

/**
 * @description 获取数据: 实体 | 维度 | 服务器 的IPersistentData
 * @param {(Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer)} object 
 * @param {ResourceLocation} name 
 * @returns {$IPersistentData?}
 */
$PersistentDataHelper.getData = function (object, name) {
  return $PersistentDataManager.INSTANCE.getDataProvider(object).getData(name);
}

/**
 * @description 获取数据: 实体 | 维度 | 服务器 的IPersistentDataProvider
 * @param {(Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer)} object 
 * @returns {$IPersistentDataProvider}
 */
$PersistentDataHelper.getDataProvider = function (object) {
  return $PersistentDataManager.INSTANCE.getDataProvider(object);
}