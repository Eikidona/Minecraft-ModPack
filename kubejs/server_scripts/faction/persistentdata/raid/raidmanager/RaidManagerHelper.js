/**
 * @class
 * @classdesc
 */
function $RaidManagerHelper() {
    
}
/**
 * @description 获取Level的RaidManager
 * @param {Internal.ServerLevel} serverLevel 
 * @returns {$RaidManager}
 */
$RaidManagerHelper.getRaidManager = function (serverLevel) {
    let raidManager = $RaidManager.getRaidManager(serverLevel);
    return raidManager ? raidManager : new $RaidManager(serverLevel);
}