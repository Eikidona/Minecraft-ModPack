/**
 * @class
 */
function $PersistentDataHelper() { }

/**
 * @description 注册一个Data
 * @param {ResourceLocation} name 
 * @param {() => $IPersistentData} data 
 */
$PersistentDataHelper.register = function (name, data) {
  ServerEvents.lowPriorityData(event => { $Registries.PERSISTENT_DATA.register(name, data) })
}

/**
 * @description 获取数据: 实体 | 维度 | 服务器
 * @param {(Internal.Entity | Internal.ServerLevel | Internal.MinecraftServer)} object 
 * @param {ResourceLocation} name 
 * @returns {$IPersistentData?}
 */
$PersistentDataHelper.get = function (object, name) {
  return $PersistentDataManager.INSTANCE.getDataProvider(object).getData(name)
}