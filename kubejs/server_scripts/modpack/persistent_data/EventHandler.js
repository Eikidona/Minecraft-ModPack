/**
 * 抛出注册事件
 * 收集注册数据
 */
ServerEvents.lowPriorityData(event => {
  let datas = $EventFactory.gatherRegisterData();
  for (const data of datas.entrySet()) {
    $Registries.PERSISTENT_DATA.register(data.getKey(), data.getValue());
  }
});
/**
 * 服务器加载/卸载
 * 收集附加数据
 */
ServerEvents.loaded(event => {
  let { server } = event;
  let datas = $EventFactory.gatherAttachData(server);
  let dataProvider = $PersistentDataManager.INSTANCE.getDataProvider(server);
  datas.forEach((name, data) => dataProvider.addData(name, data));
  // $PersistentDataManager.INSTANCE.load(server);
  $PersistentDataManager.INSTANCE.save(server);
})
ServerEvents.unloaded(event => {
  let { server } = event;
  $PersistentDataManager.INSTANCE.save(server);
})
/**
 * 维度加载/卸载
 * 收集附加数据
 */
LevelEvents.loaded(event => {
  let { level } = event;
  let datas = $EventFactory.gatherAttachData(level);
  let dataProvider = $PersistentDataManager.INSTANCE.getDataProvider(level);
  datas.forEach((name, data) => dataProvider.addData(name, data));
  // $PersistentDataManager.INSTANCE.load(level);
  $PersistentDataManager.INSTANCE.save(level);
})
LevelEvents.unloaded(event => {
  let { level } = event;
  $PersistentDataManager.INSTANCE.save(level);
})
/**
 * 实体生成/死亡
 * 收集附加数据
 */
EntityEvents.spawned(event => {
  let { entity } = event;
  let datas = $EventFactory.gatherAttachData(entity);
  let dataProvider = $PersistentDataManager.INSTANCE.getDataProvider(entity);
  datas.forEach((name, data) => dataProvider.addData(name, data));
  // $PersistentDataManager.INSTANCE.load(entity);
  $PersistentDataManager.INSTANCE.save(entity);
})
EntityEvents.death(event => {
  let { entity } = event;
  $PersistentDataManager.INSTANCE.removeDataProvider(entity);
})