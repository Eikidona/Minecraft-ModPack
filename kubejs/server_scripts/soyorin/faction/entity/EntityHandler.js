/**
 * @class
 * @classdesc
 */
function $EntityHandler() {
  
}

EntityEvents.spawned(event => {
  /**
   * @type {Internal.Mob}
   */
  let mobEntity = event.entity;
  if (!mobEntity instanceof Mob) return;

  let factionEntity = $FactionEntityHelper.getFactionEntity(mobEntity);

  let arrayFactions = Array.from($Factions.getFactionData());

  let filterFactions = arrayFactions.filter(faction => faction.getDefaultEntities().has(String(mobEntity.getType())));


  if (filterFactions.length > 1) {
    mobEntity.getPersistentData().putString("Faction", String(filterFactions.getName()));
  } else {
    mobEntity.getPersistentData().putString("Faction", String($Faction.GAIA.getName()));
  }

})

// NativeEvents.onEventTyped(
//   "normal",
//   true,
//   "net.minecraftforge.event.entity.living.LivingChangeTargetEvent",
//   /**@param {Internal.LivingChangeTargetEvent} event  */
//   event => {
//   event.getNewTarget()
// })