// priority: 1000
/**
 * @class
 * @classdesc
 */
function $FactionEntityHelper () {

}

/**
 * 
 * @param {Internal.Mob} entity 
 * @returns {$FactionEntity}
 */
$FactionEntityHelper.getFactionEntity = function (entity) {
    let factionEntity = $FactionEntity.VALUES.get(String(entity.getStringUuid()));

    // let factionEntity = new $FactionEntity(entity);
    // let persistentData = entity.getPersistentData();
    // factionEntity.deserializeNBT(persistentData);
    return factionEntity ? factionEntity : new $FactionEntity(entity);
}