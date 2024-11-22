/**
 * @class
 * @classdesc
 * @param {Internal.ServerPlayer} player 
 */
function $FactionInteraction(player) {
  /**
   * @type {Internal.ServerPlayer}
   */
  this.player = player;
  $FactionInteraction.VALUES.set(this.player, this);
}

/**
 * @returns {$Faction[]}
 */
$FactionInteraction.prototype.getBadOmenFactions = function(){

}

/**
 * @type {WeakMap<Internal.ServerPlayer, $FactionInteraction>}
 */
$FactionInteraction.VALUES = new WeakMap();