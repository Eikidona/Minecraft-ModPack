// priority: 2000

/**
 * @class
 * @classdesc 
 * @param {Special.EntityType[]} entities 
 * @param {$FactionRelation} factionRelation 
 */
function $Faction(entities, factionRelation) {
  this.entities = new Set(entities);
  this.factionRelation = factionRelation;
}
$Faction.prototype.getEntities = function () {
  return this.entities;
}
$Faction.prototype.getFactionRelation = function () {
  return this.factionRelation;
}
