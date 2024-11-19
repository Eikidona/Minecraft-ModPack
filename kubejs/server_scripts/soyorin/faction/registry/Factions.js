/**
 * @class
 * @classdesc
 */
function $Factions() {
  
}

/**
 * @type {Map<string, $Faction>}
 */
$Factions.FACTION_DATA = new Map();

/**
 * 
 * @param {$Faction} faction 
 */
$Factions.register = function (faction) {
  this.FACTION_DATA.set(String(faction.getName()), faction);
}

/**
 * 
 * @param {ResourceLocation} factionName 
 * @returns {$Faction} 
 */
$Factions.getFaction = function (factionName) {
  return this.FACTION_DATA.get(String(factionName)) ?? $Faction.GAIA;
}

$Factions.factionExists = function (factionName) {
  return this.FACTION_DATA.has(String(factionName));
}

$Factions.getFactionKeys = function () {
  return this.FACTION_DATA.keys();
}

$Factions.getFactionData = function () {
  return this.FACTION_DATA.values();
}

