/**
 * @interface
 */
function $IBoost() { }
/**
 * @description 应用到实体
 * @param {Internal.Mob} mobEntity
 */
$IBoost.prototype.apply = function (mobEntity) {
  throw new Error("必须实现apply函数");
}