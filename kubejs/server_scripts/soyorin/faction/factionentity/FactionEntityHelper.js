// priority: 1000
/**
 * @class
 * @classdesc
 */
function $FactionEntityHelper() {
  
}

/**
 * 
 * @param {Internal.Mob} entity 
 */
$FactionEntityHelper.getFactionEntity = function (entity) {
  // let factionEntity = new $FactionEntity(entity);
  // let persistentData = entity.getPersistentData();
  // factionEntity.deserializeNBT(persistentData);
  return new $FactionEntity(entity);
}