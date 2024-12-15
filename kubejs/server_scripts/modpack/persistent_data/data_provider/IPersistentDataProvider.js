/**
 * @typedef $IPersistentDataProvider
 * @property {(name: ResourceLocation) => $IPersistentData?} getData 获取数据 可能不存在
 * @property {(name: ResourceLocation, data: $PersistentData) => void} addData 添加数据
 * @property {() => Internal.CompoundTag} serializeNBT 
 * @property {(nbt: Internal.CompoundTag) => void} deserializeNBT
 */
