/**
 * @class
 */
function $FactionEntity() { }

$FactionEntity.NAME = new ResourceLocation("faction:faction_entity");

ModpackEvents.registerPersistentData(event => {
  event.register($FactionEntity.NAME, () => new $FactionEntityHandler());
})