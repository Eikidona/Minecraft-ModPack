/**
 * @class
 * @classdesc 
 */
function $RaiderHelper() {
    
}
/**
 * @description 获取实体的Raider
 * @param {Internal.LivingEntity} livingEntity 
 */
$RaiderHelper.getRaider = function (livingEntity) {
    let raider = $Raider.getRaider(raider);
    return raider ? raider : new $Raider(livingEntity);
}