
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

/**
 * Save
 */
LevelEvents.unloaded(event=>{
  $FactionEntity.VALUES.forEach((factionEntity, stringUuid) => {
    factionEntity.getEntity().getPersistentData().merge(factionEntity.serializeNBT());
  })
})