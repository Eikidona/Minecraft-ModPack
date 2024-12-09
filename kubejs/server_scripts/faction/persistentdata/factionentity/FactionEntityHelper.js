/**
 * @class
 */
function $FactionEntityHelper() {
    
}

/**
 * 
 * @param {Internal.Mob} modEntity 
 */
$FactionEntityHelper.getFactionEntity = function (modEntity) {
    let factionEntity = $FactionEntity.getFactionEntity(modEntity);
    return factionEntity ? factionEntity : new $FactionEntity(modEntity);
}