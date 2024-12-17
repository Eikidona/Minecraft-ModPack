/**
 * @class
 */
function $FactionEntity() { }

$FactionEntity.NAME = new ResourceLocation("faction:faction_entity");

ModpackEvents.registerPersistentData(event => {
  event.register($FactionEntity.NAME, () => new $FactionEntityHandler());
})

ModpackEvents.attachPersistentData(event => {
  if (event.getObject() instanceof Mob) {
    event.attachData($FactionEntity.NAME, new $FactionEntityHandler());
  }
})