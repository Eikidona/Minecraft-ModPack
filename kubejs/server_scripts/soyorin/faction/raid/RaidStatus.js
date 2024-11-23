/**
 * @class
 * @classdesc Raid Status 枚举类
 * @enum
 * @param {string} name 
 */
function $RaidStatus(name) {
  this.name = name;
}

/**
 * 
 * @param {string} name 
 */
$RaidStatus.byName = function (name) {
  let raidStatus;
  for (const element of $RaidStatus.VALUES) {
    if (element.name == name) {
      raidStatus = element;
      break;
    }
  }
  return raidStatus ?? $RaidStatus.ONGOING;
}

$RaidStatus.prototype.getName = function () {
  return this.name;
}

/**
 * @type {$RaidStatus[]}
 */
$RaidStatus.VALUES = [];

$RaidStatus.ONGOING = new $RaidStatus("ongoing");
$RaidStatus.VICTORY = new $RaidStatus("victory");
$RaidStatus.LOSS = new $RaidStatus("loss");
$RaidStatus.STOPPED = new $RaidStatus("stopped");

$RaidStatus.VALUES.push($RaidStatus.ONGOING, $RaidStatus.VICTORY, $RaidStatus.LOSS, $RaidStatus.STOPPED);