
/**
 * @class
 * @classdesc 
 */
function $Factions() { };

$Factions.UNDEAD = new $Faction(['minecraft:zombie', 'minecraft:skeleton'], new $FactionRelation(['modpack:village'], []));

$Factions.VILLAGE = new $Faction(['minecraft:iron_golem', 'minecraft:villager'], new $FactionRelation(['modpack:undead'], []));

$FactionManager.register('modpack:undead', $Factions.UNDEAD);
$FactionManager.register('modpack:village', $Factions.VILLAGE);