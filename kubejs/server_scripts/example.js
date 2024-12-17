PlayerEvents.chat(event => {
  /**
   * @type {MapIterator<Internal.Entity>}
   */
  let entities = $PersistentDataManager.DATAS.keys();
  for (const entity of entities) {
    event.player.tell(entity.getEncodeId());
  }

})

/**
 * @type {Internal.Entity}
 */
let level;

ItemEvents.entityInteracted(event => {
  if (event.hand != "main_hand") return;

  // // 测试引用
  // if (!entity) {
  //   entity = event.getTarget();
  //   event.player.tell("实体已设置！");
  // } else {
  //   event.player.tell(`实体是否相同: ${entity === event.getTarget()}`);
  //   entity = event.getTarget();
  // }

  // // 测试Datas
  // let datas = $PersistentDataManager.getEntityDatas(event.getTarget());
  // if (datas.size() > 0) {
  //   for (const key of datas.keySet()) {
  //     event.player.tell(`该实体具有的Data: ${key}`);
  //   }
  // }
  // else {
  //   event.player.tell(`该实体不具备Data`);
  //   // $PersistentDataManager.ENTITY_DATAS.put(event.getTarget(), new Map())
  //   // let map = $PersistentDataManager.ENTITY_DATAS.get(event.getTarget());
  //   // map.set("test:test_data", new $FactionEntity());
  //   // event.player.tell(`该对象是否已经具备Data: ${$PersistentDataManager.ENTITY_DATAS.containsKey(event.getTarget())} Data Counts: ${$PersistentDataManager.ENTITY_DATAS.get(event.getTarget()).size}`);

  // }

  // // // 测试Map
  // let map = Utils.newMap()

  // let entity = event.getTarget();
  // map.put(entity, [])

  // event.player.tell(`是否存在: ${map.containsKey(entity)}`);


  // // 测试hashMap
  // let hashMap = Utils.newMap();

  // hashMap.put(new ResourceLocation("test"), "Hello");
  // event.player.tell(`${hashMap.get(new ResourceLocation("test"))}`);

  // 测试自定义Data
  /**@type {$IFactionEntity} */
  let data = $PersistentDataHelper.getData(event.getTarget(), $FactionEntity.NAME);

  event.player.tell(`${data instanceof $FactionEntityHandler} ${typeof data} ${Boolean(data)}`)
})
/**@type {Special.LootTable[]} */
let rls = ["minecraft:chests/village/village_armorer"];