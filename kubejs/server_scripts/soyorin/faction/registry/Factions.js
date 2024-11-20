/**
 * @class
 */
function $Factions() {

}

const UNDEAD = new $Faction(new ResourceLocation("faction", "undead"), $FactionType.MONSTER, new CompoundTag(), $FactionRaidConfig.DEFAULT, $FactionBoostConfig.DEFAULT, $FactionRelations.DEFAULT, [], new ResourceLocation("faction", "default"), [new ResourceLocation("minecraft", "overworld")], new Set(["minecraft:zombie", "minecraft:husk", "minecraft:skeleton"]))

// register factions...
$Factions.register = function () {
  // console.log("注册中...")
  $FactionRegistry.register(UNDEAD)
}
$Factions.register();
// ServerEvents.lowPriorityData(event => {
  
// })
