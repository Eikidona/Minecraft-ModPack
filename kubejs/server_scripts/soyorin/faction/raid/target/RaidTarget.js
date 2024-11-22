// priority: 1000
/**
 * @class
 * @classdesc RaidTarget Interface
 * @interface
 */
function $RaidTarget() {

}

/**
 * @returns {BlockPos}
 */
$RaidTarget.prototype.getTargetBlockPos = function () {

}

/**
 * 
 * @param {Internal.ServerLevel} level 
 */
$RaidTarget.prototype.updateTargetBlockPos = function (level) {

}

/**
 * @returns {number}
 */
$RaidTarget.prototype.getTargetStrength = function () {

}

/**
 * @description 增加目标强度
 * @param {number} amount 
 */
$RaidTarget.prototype.increaseTargetStrength = function (amount) {

}

/**
 * @returns {number}
 */
$RaidTarget.prototype.getAdditionalWaves = function () {

}

/**
 * 
 * @param {$Raid} raid 
 * @param {Internal.ServerLevel} level 
 */
$RaidTarget.prototype.isDefeat = function (raid, level) {

}

/**
 * 
 * @param {Internal.CompoundTag} nbt 
 */
$RaidTarget.prototype.save = function (nbt) {

}

/**
 * 
 * @param {number} outerAttempt 
 * @param {Internal.BlockPos$MutableBlockPos} blockpos$mutable 
 * @param {Internal.ServerLevel} level 
 */
$RaidTarget.prototype.isValidSpawnPos = function (outerAttempt, blockpos$mutable, level) {

}

/**
 * @returns {$RaidTargetType}
 */
$RaidTarget.prototype.getRaidType = function () {

}

$RaidTarget.prototype.getStartingWave = function () {

}
$RaidTarget.prototype.getSpawnDistance = function () {

}
