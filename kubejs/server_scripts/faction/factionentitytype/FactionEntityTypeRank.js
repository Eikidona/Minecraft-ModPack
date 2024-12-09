/**
 * @class
 * @classdesc
 * @enum
 * @param {string} name 
 */
function $FactionEntityTypeRank(name) {
  this.name = name;
}
/**
 * @static
 * @type {Set<$FactionEntityTypeRank>}
 */
$FactionEntityTypeRank.VALUES = new Set();
/**
 * 创建一个枚举
 * @param {string} name 
 * @returns {$FactionEntityTypeRank}
 */
$FactionEntityTypeRank.create = function (name) {
  let result;
  for (const rank of this.VALUES.values()) {
    if (rank.name == name) {
      result = rank
    }
  }
  if (!result) {
    result = new $FactionEntityTypeRank(name);
    this.VALUES.add(result);
  }
  return result;
}
/**
 * @static
 */
$FactionEntityTypeRank.NONE = $FactionEntityTypeRank.create("none");
