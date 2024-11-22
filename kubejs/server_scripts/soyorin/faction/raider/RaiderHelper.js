/**
 * @class
 * @classdesc
 */
function $RaiderHelper(){

}

/**
 * 
 * @param {Internal.Mob} mobEntity 
 */
$RaiderHelper.getRaider = function(mobEntity){
    let raider = $Raider.VALUES.get(String(mobEntity.getStringUuid()));
    return raider ? raider : new $Raider(mobEntity);
}