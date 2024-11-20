// priority: 1000
/**
 * @class
 * @classdesc
 */
function $FactionRegistry() {
  
}

/**
 * @type {Map<string, $Faction>}
 */
$FactionRegistry.FACTION_DATA = new Map();

/**
 * 
 * @param {$Faction} faction 
 */
$FactionRegistry.register = function (faction) {
  // console.log(`Register！`)
  this.FACTION_DATA.set(String(faction.getName()), faction);
  // console.log(`Register！size ${this.FACTION_DATA.size}`)
}

/**
 * 
 * @param {ResourceLocation} factionName 
 * @returns {$Faction} 
 */
$FactionRegistry.getFaction = function (factionName) {
  return this.FACTION_DATA.get(String(factionName)) ?? $Faction.GAIA;
}

$FactionRegistry.factionExists = function (factionName) {
  return this.FACTION_DATA.has(String(factionName));
}

$FactionRegistry.getFactionKeys = function () {
  return this.FACTION_DATA.keys();
}

$FactionRegistry.getFactionData = function () {
  return this.FACTION_DATA.values();
}
