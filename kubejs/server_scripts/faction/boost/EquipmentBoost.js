/**
 * @class
 * @classdesc
 * @implements {$IBoost}
 * @param {{helmet: ?Special.Item, chestplate: ?Special.Item, leggings: ?Special.Item, boots: ?Special.Item, mainhand: ?Special.Item, offhand: ?Special.Item}} equipment 
 */
function $EquipmentBoost(equipment) {
  this.helmet = equipment?.helmet;
  this.chestplate = equipment?.chestplate;
  this.leggings = equipment?.leggings;
  this.boots = equipment?.boots;
  this.mainhand = equipment?.mainhand;
  this.offhand = equipment?.offhand;
}
/**
 * @description 将装备装备到实体
 * @param {Internal.Mob} mobEntity
 */
$EquipmentBoost.prototype.apply = function (mobEntity) {
  if (this.helmet) {
    mobEntity.setEquipment("head", Item.of(this.helmet));
  }
  if (this.chestplate) {
    mobEntity.setEquipment("chest", Item.of(this.chestplate));
  }
  if (this.leggings) {
    mobEntity.setEquipment("legs", Item.of(this.leggings));
  }
  if (this.boots) {
    mobEntity.setEquipment("feet", Item.of(this.boots));
  }
  if (this.mainhand) {
    mobEntity.setEquipment("mainhand", Item.of(this.mainhand));
  }
  if (this.offhand) {
    mobEntity.setEquipment("offhand", Item.of(this.offhand));
  }
}