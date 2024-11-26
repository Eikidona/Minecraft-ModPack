/**
 * @class
 */
function $FactionEntityHelper() {
    
}

/**
 * 
 * @param {Internal.LivingEntity} livingEntity 
 */
$FactionEntityHelper.getFactionEntity = function (livingEntity) {
    let factionEntity = $FactionEntity.getFactionEntity(livingEntity);
    return factionEntity ? factionEntity : new $FactionEntity(livingEntity);
}