/**
 * @class
 * @classdesc
 * @param {ResourceLocation[]} allies 
 */
function $FactionRelations(allies, enemies) {
  /**
   * @type {Map<string, $FactionRelation>}
   */
  this.originalRelations = new Map();
  /**
   * @type {Map<string, $FactionRelation>}
   */
  this.actualRelations = new Map();

  allies.forEach(ally => this.originalRelations.set(String(ally), new $FactionRelation(ally, $FactionRelation.ALLY_MAX)));
  enemies.forEach(enemy => this.originalRelations.set(String(enemy), new $FactionRelation(enemy, $FactionRelation.ENEMY_MAX)));

}
/**
 * 
 * @param {boolean} actual 
 */
$FactionRelations.prototype.getRelations = function (actual) {
  return actual ? this.actualRelations : this.originalRelations;
}

$FactionRelations.prototype.getAllies = function () {
  return Array.from(this.originalRelations.values()).filter(relation => relation.isAlly()).map(ralation => ralation.getFaction);
}

$FactionRelations.prototype.getEnemies = function () {
  return Array.from(this.originalRelations.values()).filter(relation => relation.isEnemy()).map(ralation => ralation.getFaction);
}
/**
 * 
 * @param {$Faction} faction 
 */
$FactionRelations.prototype.getFactionRelation = function (faction) {
  /**@type {$FactionRelation} */
  let relation;
  let factionName = String(faction.getName());
  relation = this.actualRelations.get(factionName);
  if (!relation) {
    relation = new $FactionRelation(faction.getName(), $FactionRelation.NEUTRAL);
    this.actualRelations.set(factionName, relation);
  }
  return relation;
}
/**
 * 
 * @param {$Faction} faction 
 */
$FactionRelations.prototype.isEnemyOf = function (faction) {
  return this.getFactionRelation(faction).isEnemy();
}
/**
 * 
 * @param {$Faction} faction 
 */
$FactionRelations.prototype.isAllyOf = function (faction) {
  return this.getFactionRelation(faction).isAlly();
}
/**
 * 
 * @param {$Faction} faction 
 * @param {number} amount 
 */
$FactionRelations.prototype.adjustRelation = function (faction, amount) {
  this.getFactionRelation(faction).adjustRelation(amount);
}
/**
 * 
 * @param {$Faction} faction 
 * @param {number} amount 
 */
$FactionRelations.prototype.setInitialRelation = function (faction, amount) {
  if (this.originalRelations.has(String(faction.getName()))) return;
  this.originalRelations.set(String(faction.getName()), new $FactionRelation(faction.getName(), amount));
}
/**
 * 
 * @param {Map<ResourceLocation, $FactionRelation>} targetRelations 
 */
$FactionRelations.prototype.initiateActualRelations = function (targetRelations) {
  targetRelations.forEach((relation, factionName) => this.actualRelations.set(String(factionName), relation));
  this.originalRelations.forEach((relation, factionName) => this.actualRelations.set(String(factionName), relation));
}