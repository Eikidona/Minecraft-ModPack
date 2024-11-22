/**
 * @class
 * @classdesc
 */
function $RaidManagerHelper () {

}

/**
 * 
 * @param {Internal.ServerLevel} level 
 */
$RaidManagerHelper.getRaidManager = function (level) {

    let raidManager = $RaidManager.VALUES.get(String(level.dimension));
    // console.log(`??符测定 ${raidManager ?? 233} validValue?  ${raidManager === null || raidManager === undefined}`);
    return raidManager ? raidManager : new $RaidManager(level);

    // /**
    //  * debug
    //  */
    // if (!Boolean($RaidManager.VALUES.get(String(level.dimension)))) {
    //   console.log(`空值测定 ${String(level.dimension)} ${$RaidManager.VALUES.get(String(level.dimension))}`);
    // }

    // return $RaidManager.VALUES.get(String(level.dimension)) ?? new $RaidManager(level);
}