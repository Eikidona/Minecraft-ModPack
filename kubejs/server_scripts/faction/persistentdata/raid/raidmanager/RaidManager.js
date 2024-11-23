/**
 * @class
 * @classdesc
 * @param {Internal.ServerLevel} serverlevel 
 */
function $RaidManager(serverlevel) {
    this.level = serverlevel;
    /**
     * @description id: $Raid
     * @type {Map<number, $Raid>}
     */
    this.raids = new Map();


}
/**
 * @description 获取Level
 * @returns {Internal.ServerLevel}
 */
$RaidManager.prototype.getLevel = function () {
    return this.level;
}
/**
 * @description 从id获取Raid
 * @param {number} id
 * @returns {$Raid | undefined}
 */
$RaidManager.prototype.getRaid = function (id) {
    return this.raids.get(id);
}

$RaidManager.prototype.deserializeNBT = function () {
    
}

$RaidManager.prototype.serializeNBT = function () {
    
}

$RaidManager.prototype.load = function () {
    
}

$RaidManager.prototype.save = function () {
    
}


/**
 * @description 维度String Id: $RaidManager
 * @type {Map<string, $RaidManager>}
 */
$RaidManager.VALUES = new Map();

/**
 * @description 向内置Map添加RaidManager实例
 * @param {$RaidManager} raidManager 
 */
$RaidManager.addRaidManager = function (raidManager) {
    this.VALUES.set(String(raidManager.getLevel().getDimension()), raidManager);
}

/**
 * @description 获取Level的RaidManager实例
 * @param {Internal.ServerLevel} serverLevel 
 * @returns {$RaidManager | undefined}
 */
$RaidManager.getRaidManager = function (serverLevel) {
    return this.VALUES.get(String(serverLevel.getDimension()));
}

/**
 * @description 删除Level的RaidManager实例
 * @param {Internal.ServerLevel} serverLevel 
 * @returns {boolean}
 */
$RaidManager.removeRaidManager = function (serverLevel) {
    return this.VALUES.delete(String(serverLevel.getDimension()));
}