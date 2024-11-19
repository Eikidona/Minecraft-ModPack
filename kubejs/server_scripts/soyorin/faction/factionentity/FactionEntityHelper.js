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
$FactionEntityHelper.getFactionEntity = function(entity){
  return new $FactionEntity(entity);
}