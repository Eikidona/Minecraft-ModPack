/**
 * @class
 * @classdesc
 * @param {Internal.MutableComponent} victoryComponent
 * @param {Internal.MutableComponent} defeatComponent 
 * @param {Internal.MutableComponent} raidComponent
 */
function $RaidConfig(victoryComponent, defeatComponent, raidComponent) {
    this.raidComponent = raidComponent;
    this.victoryComponent = victoryComponent;
    this.defeatComponent = defeatComponent;
}
/**
 * @description 获取Raid显示组件
 * @returns {Internal.MutableComponent}
 */
$RaidConfig.prototype.getRaidComponent = function () {
    return this.raidComponent;
}
/**
 * @description 获取胜利显示组件
 * @returns {Internal.MutableComponent}
 */
$RaidConfig.prototype.getVictoryComponent = function () {
    return this.victoryComponent;
}
/**
 * @description 获取失败显示组件
 * @returns {Internal.MutableComponent}
 */
$RaidConfig.prototype.getDefeatComponent = function () {
    return this.defeatComponent;
}