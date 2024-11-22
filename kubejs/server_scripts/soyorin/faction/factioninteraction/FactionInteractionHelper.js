/**
 * @class
 * @classdesc
 */
function $FactionInteractionHelper() {
  
}

/**
 * 
 * @param {Internal.ServerPlayer} player 
 */
$FactionInteractionHelper.getFactionInteraction = function (player) {
  let factionInteraction = $FactionInteraction.VALUES.get(player);
  return factionInteraction ?? new $FactionInteraction(player);
}