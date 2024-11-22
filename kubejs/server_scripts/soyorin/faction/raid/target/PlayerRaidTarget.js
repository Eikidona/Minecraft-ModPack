/**
 * @class
 * @classdesc
 * @extends {$RaidTarget} 
 * @param {Internal.ServerPlayer} player 
 * @param {Internal.ServerLevel} level 
 */
function $PlayerRaidTarget(player, level) {
    this.raidType = $RaidTargetType.VILLAGE;
    this.player = player;
    /**
     * @type {number}
     */
    this.targetStrength = this.calculateTargetStrength(player, level);
}

/**@type {$RaidTarget} */
$PlayerRaidTarget.prototype = Object.create($RaidTarget.prototype);
$PlayerRaidTarget.prototype.constructor = $PlayerRaidTarget;

/**
 * @description 强度计算
 * @param {Internal.ServerPlayer} player 
 * @param {Internal.ServerLevel} level 
 */
$PlayerRaidTarget.prototype.calculateTargetStrength = function (player, level) {

}

/**
 * @override
 * @returns {BlockPos}
 */
$PlayerRaidTarget.prototype.getTargetBlockPos = function () {
    return this.player.blockPosition();
}

/**
 * @override
 * @param {Internal.ServerLevel} level 
 */
$PlayerRaidTarget.prototype.updateTargetBlockPos = function (level) {
    // noop
}

/**
 * @override
 * @returns {number}
 */
$PlayerRaidTarget.prototype.getTargetStrength = function () {
    return this.targetStrength;
}

/**
 * @override
 * @param {number} amount
 */
$PlayerRaidTarget.prototype.increaseTargetStrength = function (amount) {
    this.targetStrength += amount;
}

/**
 * @override
 * @returns {number}
 */
$PlayerRaidTarget.prototype.getAdditionalWaves = function () {
    return Math.floor(0.01 * this.targetStrength);
}

/**
 * @override
 * @param {$Raid} raid 
 * @param {Internal.ServerLevel} level 
 * @returns {boolean}
 */
$PlayerRaidTarget.prototype.isDefeat = function (raid, level) {
    return !this.player.isAlive();
}

/**
 * @override
 * @param {number} outerAttempt 
 * @param {Internal.BlockPos$MutableBlockPos} blockpos$mutable 
 * @param {Internal.ServerLevel} level 
 */
$PlayerRaidTarget.prototype.isValidSpawnPos = function (outerAttempt, blockpos$mutable, level) {
    return (blockpos$mutable.distSqr(this.player.blockPosition()) > 30 || outerAttempt >= 2) && level.hasChunksAt(blockpos$mutable.getX() - 10, blockpos$mutable.getY() - 10, blockpos$mutable.getZ() - 10, blockpos$mutable.getX() + 10, blockpos$mutable.getY() + 10, blockpos$mutable.getZ() + 10) && level.isPositionEntityTicking(blockpos$mutable) && (NaturalSpawner.isSpawnPositionOk(SpawnPlacements.Type.ON_GROUND, level, blockpos$mutable, EntityType.RAVAGER) || level.getBlockState(blockpos$mutable.below()).is(Blocks.SNOW) && level.getBlockState(blockpos$mutable).isAir())
}

/**
 * @override
 * @returns {$RaidTargetType}
 */
$PlayerRaidTarget.prototype.getRaidType = function (){
    return this.raidType;
}

/**
 * @override
 * @returns {number}
 */
$PlayerRaidTarget.prototype.getStartingWave = function (){
    return 0;
}

/**
 * @override
 * @returns {number}
 */
$PlayerRaidTarget.prototype.getSpawnDistance = function () {
    return 32.0;
}

/**
 * @override
 * @param {Internal.CompoundTag} nbt 
 * @returns {Internal.CompoundTag}
 */
$PlayerRaidTarget.prototype.save = function (nbt) {
    nbt.putString("Type", this.raidType.getName());
    nbt.putString("Player", this.player.getStringUuid());
    nbt.putInt("TargetStrength", this.targetStrength);
    return nbt;
}