/**
 * @class
 * @classdesc
 * @param {Internal.Mob} entity 
 */
function $Raider(entity) {
  /**
   * @type {$Raid}
   */
  this.raid;
  /**
   * @type {number}
   */
  this.wave;
  /**
   * @type {boolean}
   */
  this.canJoinRaid = true;
  /**
   * @type {number}
   */
  this.ticksOutsideRaid;
  /**
   * @type {boolean}
   */
  this.waveLeader = false;
  /**
   * @type {Internal.Mob}
   */
  this.entity = entity;
  /**
   * @type {Internal.Goal[]}
   */
  this.addedGoals = [];

  this.deserializeNBT(entity.getPersistentData());
  $Raider.VALUES.set(String(entity.getStringUuid()), this);
}

$Raider.prototype.getRaid = function () {
  return this.raid;
}

$Raider.prototype.setRaid = function (raid) {
  this.raid = raid;
  this.updateRaidAI();
}

$Raider.prototype.hasActiveRaid = function () {
  return Boolean(this.raid) && this.raid.isActive();
}

$Raider.prototype.getWave = function () {
  return this.wave;
}

$Raider.prototype.setWave = function (wave) {
  this.wave = wave;
}

$Raider.prototype.isCanJoinRaid = function () {
  return this.canJoinRaid;
}

$Raider.prototype.setCanJoinRaid = function (canJoinRaid) {
  this.canJoinRaid = canJoinRaid;
}

$Raider.prototype.getTicksOutsideRaid = function () {
  return this.ticksOutsideRaid;
}

$Raider.prototype.setTicksOutsideRaid = function (ticksOutsideRaid) {
  this.ticksOutsideRaid = ticksOutsideRaid;
}

/**
 * 
 * @param {number} wave 
 * @param {$Raid} raid 
 */
$Raider.prototype.addToRaid = function (wave, raid) {
  this.setRaid(raid);
  this.setWave(wave);
  this.setCanJoinRaid(true);
  this.setTicksOutsideRaid(0);
}

$Raider.prototype.isWaveLeader = function () {
  return this.waveLeader;
}

$Raider.prototype.serWaveLeader = function (waveLeader) {
  this.waveLeader = waveLeader;
}

$Raider.prototype.updateRaidAI = function () {
  if ($FactionUtils.hasBrain(mob)) {
    this.updataRaidBrain();
  } else {
    this.updataRaidGoals();
  }
}

$Raider.prototype.updataRaidBrain = function () {
  if (this.raid) {
    // this.entity.getBrain().setMemory("attack_target", "")
  } else {
    // this.entity.getBrain().eraseMemory(arg0)
  }
}

$Raider.prototype.updateRaidGoals = function () {
  // if (this.raid) {
  //   if()
  // }
}

/**
 * 
 * @param {number} priority 
 * @param {Internal.Goal} goal 
 */
$Raider.prototype.addGoal = function (priority, goal) {
  this.entity.goalSelector.addGoal(priority, goal);
  this.addedGoals.push(goal);
}

$Raider.prototype.serializeNBT = function () {
  let nbt = new CompoundTag();
  nbt.putInt("Wave", this.wave);
  nbt.putBoolean("CanJoinRaid", this.canJoinRaid);
  if (this.raid) {
    nbt.putInt("RaidId", this.raid.getId());
  }
  return nbt;
}

/**
 * 
 * @param {Internal.CompoundTag} nbt 
 */
$Raider.prototype.deserializeNBT = function (nbt) {
  this.wave = nbt.getInt("Wave");
  this.canJoinRaid = nbt.getBoolean("CanJoinRaid");
  if (nbt.contains("RaidId", 3)) {
    let raidManager = $RaidManagerHelper.getRaidManager(this.entity.level);
    this.setRaid(raidManager.getRaids().get(nbt.getInt("RaidId")));
  }

  if (this.raid) {
    this.raid.addWaveMob(this.wave, this.entity, false);
    if (this.waveLeader) {
      this.raid.setLeader(this.wave, this.entity);
    }
  }
}

/**
 * @type {Map<string, $Raider>} Entity String Uuid : $Raider's Instance
 */
$Raider.VALUES = new Map();