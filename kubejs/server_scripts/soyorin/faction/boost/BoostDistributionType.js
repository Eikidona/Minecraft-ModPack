// priority: 2000
/**
 * @class
 * @classdesc 提升分布类型
 * @param {string} name 
 */
function $BoostDistributionType(name) {
  this.name = name;
}

/**
 * @description 获取分布类型实例id
 * @returns {string}
 */
$BoostDistributionType.prototype.getName = function () {
  return this.name;
}

$BoostDistributionType.RANDOM = "random";
$BoostDistributionType.UNIFORM_ALL = "uniform_all";
$BoostDistributionType.UNIFORM_TYPE = "uniform_type";
$BoostDistributionType.LEADER = "leader";
$BoostDistributionType.STRONG_FAVOURED = "strong_favoured";
$BoostDistributionType.WEAK_FAVOURED = "weak_favoured";

/**
 * @description 据id获取分布类型枚举实例 如不存在返回回落值
 * @param {string} name 
 * @param {$BoostDistributionType} fallback 
 */
$BoostDistributionType.byName = function (name, fallback) {
  let values = {
    "random": $BoostDistributionType.RANDOM,
    "uniform_all": $BoostDistributionType.UNIFORM_ALL,
    "uniform_type": $BoostDistributionType.UNIFORM_TYPE,
    "leader": $BoostDistributionType.LEADER,
    "strong_favoured": $BoostDistributionType.STRONG_FAVOURED,
    "weak_favoured": $BoostDistributionType.WEAK_FAVOURED
  }
  return values[name] ?? fallback;
}