EntityEvents.spawned(event => {
  /**@type {Internal.Mob} */
  let mobEntity = event.getEntity();
  if (!mobEntity instanceof Mob) return;

  mobEntity.
})