/**
 * @class
 * @classdesc
 * @param {ResourceLocation} faction 
 * @param {number} relation 
 */
function $FactionRelation(faction, relation) {
  this.faction = faction;
  this.relation = relation;
}

$FactionRelation.prototype.getFaction = function () {
  return this.faction;
}

$FactionRelation.prototype.getRelation = function () {
  return this.relation;
}
/**
 * 
 * @param {number} amount 
 */
$FactionRelation.prototype.setRelation = function (amount) {
  this.relation = amount;
  if (this.relation > $FactionRelation.ALLY_MAX) {
    this.relation = $FactionRelation.ALLY_MAX
  } else if (this.relation < $FactionRelation.ENEMY_MAX) {
    this.relation = $FactionRelation.ENEMY_MAX
  }
}

$FactionRelation.prototype.isAlly = function () {
  return this.relation >= $FactionRelation.ALLY_THRESHOLD;
}

$FactionRelation.prototype.isEnemy = function () {
  return this.relation <= $FactionRelation.ENEMY_THRESHOLD;
}

$FactionRelation.prototype.isNeutral = function () {
  return !this.isAlly() && !this.isEnemy();
}
/**
 * 
 * @param {number} amount 
 */
$FactionRelation.prototype.adjustRelation = function (amount) {
  this.relation += amount;
  if (this.relation > $FactionRelation.ALLY_MAX) {
    this.relation = $FactionRelation.ALLY_MAX
  } else if (this.relation < $FactionRelation.ENEMY_MAX) {
    this.relation = $FactionRelation.ENEMY_MAX
  }
}

$FactionRelation.ALLY_THRESHOLD = 40;
$FactionRelation.ENEMY_THRESHOLD = -40;
$FactionRelation.NEUTRAL = 0;
$FactionRelation.ALLY_MAX = 100;
$FactionRelation.ENEMY_MAX = -100;