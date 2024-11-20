
EntityEvents.spawned(event => {
  /**
   * @type {Internal.Mob}
   */
  let mobEntity = event.entity;
  if (!mobEntity instanceof Mob) return;

  let factionEntity = new $FactionEntity(mobEntity);
  let factions = Array.from($FactionRegistry.getFactionData());
  let filterFactions = factions.filter(faction => faction.getDefaultEntities().has(String(mobEntity.getType())));



  /**
   * 设置Faction
   */
  if (factionEntity.getFaction() == $Faction.GAIA && filterFactions.length > 0) {
    let index = mobEntity.getRandom().nextInt(filterFactions.length);
    factionEntity.setFaction(filterFactions[index]);
  } else {
    factionEntity.setFaction($Faction.GAIA);
  }
  


  // 合并NBT
  mobEntity.getPersistentData().merge(factionEntity.serializeNBT());


})

// PlayerEvents.chat(event => {
//   /**
//    * @type {Internal.ServerPlayer}
//    */
//   let player = event.entity;

//   let tag1 = new CompoundTag();
//   let tag2 = new CompoundTag();
//   tag1.putString("Test", "test_test");
//   tag2.putInt("Level", 0);
//   tag1.merge(tag2);

//   console.log(tag1.toString())

// })