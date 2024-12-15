/**
 * @class
 * @implements {$IPersistentData | $IFactionEntity}
 */
function $FactionEntityHandler() {
  this.faction;
}

/**
 * @type {$IPersistentData | $IFactionEntity}
 */
$FactionEntityHandler.prototype = {
  deserializeNBT: function (nbt) {

  },
  serializeNBT: function () {
    return new CompoundTag();
  },
  getFaction: function () {
    return $Factions.NONE;
  }
}