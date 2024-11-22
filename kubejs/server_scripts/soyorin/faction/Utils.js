/**
 * @class
 * @classdesc
 */
function $FactionUtils() {
  
}

/**
 * 
 * @param {Internal.Mob} mob 
 */
$FactionUtils.hasBrain = function (mob) {
  /**@type {Internal.BrainAccessor} */
  let brainAccessor = mob.getBrain();
  return brainAccessor.getAvailableBehaviorsByPriority().size() > 0;
}