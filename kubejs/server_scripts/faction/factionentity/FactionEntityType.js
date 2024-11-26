/**
 * @typedef {"none"} $FactionEntityTypeRank
 */

/**
 * @class
 * @param {ResourceLocation} name 
 * @param {$FactionEntityTypeRank} rank 
 * @param {number} strength 
 */
function $FactionEntityType(name, rank, strength) {
    /**
     * @description 名字
     * @type {ResourceLocation}
     */
    this.name = name;
    /**
     * @description 头衔
     * @type {$FactionEntityTypeRank}
     */
    this.rank = rank;
    /**
     * @description 强度
     * @type {number}
     */
    this.strength = strength;
    /**
     * @description 增强
     * @type {$IBoots}
     */
    this.boots = [];

}
/**
 * @description 获取名字
 * @returns {ResourceLocation}
 */
$FactionEntityType.prototype.getName = function () {
    return this.name;
}
/**
 * @description 获取这个FactionEntityType的强度
 * @returns {number}
 */
$FactionEntityType.prototype.getStrength = function () {
    return this.strength;
}