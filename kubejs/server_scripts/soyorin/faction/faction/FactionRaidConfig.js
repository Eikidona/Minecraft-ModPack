// priority: 1000
/**
 * @class
 * @classdesc
 * @param {boolean} enabled 
 * @param {string} name 
 * @param {string} victoryAlt 
 * @param {string} defeatAlt 
 * @param {Internal.Component} victoryComponent 
 * @param {Internal.Component} defeatComponent 
 * @param {Internal.Component} raidBarNameComponent 
 * @param {Internal.Component} raidBarVictoryComponent 
 * @param {Internal.Component} raidBarDefeatComponent 
 * @param {number} mobsFraction 
 * @param {Internal.SoundEvent | undefined} waveSoundEvent 
 * @param {Internal.SoundEvent | undefined} victorySoundEvent 
 * @param {Internal.SoundEvent | undefined} defeatSoundEvent 
 */
function $FactionRaidConfig(enabled, name, victoryAlt, defeatAlt, mobsFraction, waveSoundEvent, victorySoundEvent, defeatSoundEvent) {
	/**
	 * @type {boolean}
	 */
	this.enabled = enabled;
	/**
	 * @type {string}
	 */
	this.name = name;
	/**
	 * @type {string}
	 */
	this.victoryAlt = victoryAlt;
	/**
	 * @type {string}
	 */
	this.defeatAlt = defeatAlt;
	/**
	 * @type {Internal.MutableComponent}
	 */
	this.victoryComponent = Component.translatable(victoryAlt);
	/**
	 * @type {Internal.MutableComponent}
	 */
	this.defeatComponent = Component.translatable(defeatAlt);
	/**
	 * @type {Internal.MutableComponent}
	 */
	this.raidBarNameComponent = Component.translatable(this.name);
	/**
	 * @type {Internal.MutableComponent}
	 */
	this.raidBarVictoryComponent = this.raidBarNameComponent.copy().append(" - ").append(this.victoryComponent);
	/**
	 * @type {Internal.MutableComponent}
	 */
	this.raidBarDefeatComponent = this.raidBarNameComponent.copy().append(" - ").append(this.defeatComponent);
	/**
	 * @type {number}
	 */
	this.mobsFraction = mobsFraction;
	/**
	 * @type {Internal.SoundEvent | undefined}
	 */
	this.waveSoundEvent = waveSoundEvent;
	/**
	 * @type {Internal.SoundEvent | undefined}
	 */
	this.victorySoundEvent = victorySoundEvent;
	/**
	 * @type {Internal.SoundEvent | undefined}
	 */
	this.defeatSoundEvent = defeatSoundEvent;
}

$FactionRaidConfig.prototype.isEnabled = function () {
	return this.enabled;
}

$FactionRaidConfig.prototype.getName = function () {
	return this.name;
}

$FactionRaidConfig.prototype.getVictoryAlt = function () {
	return this.victoryAlt;
}

$FactionRaidConfig.prototype.getDefeatAlt = function () {
	return this.defeatAlt;
}

$FactionRaidConfig.prototype.getRaidBarNameComponent = function () {
	return this.raidBarNameComponent;
}

$FactionRaidConfig.prototype.getRaidBarVictoryComponent = function () {
	return this.raidBarVictoryComponent;
}

$FactionRaidConfig.prototype.getRaidBarDefeatComponent = function () {
	return this.raidBarDefeatComponent
}

$FactionRaidConfig.prototype.getMobsFraction = function () {
	return this.mobsFraction;
}
/**
 * 
 * @returns {Internal.SoundEvent | undefined}
 */
$FactionRaidConfig.prototype.getWaveSoundEvent = function () {
	return this.waveSoundEvent;
}
/**
 * 
 * @returns {Internal.SoundEvent | undefined}
 */
$FactionRaidConfig.prototype.getVictorySoundEvent = function () {
	return this.victorySoundEvent;
}
/**
 * 
 * @returns {Internal.SoundEvent | undefined}
 */
$FactionRaidConfig.prototype.getDefeatSoundEvent = function () {
	return this.defeatSoundEvent;
}

$FactionRaidConfig.DEFAULT_MOBS_FRACTION = 0.7;

$FactionRaidConfig.DEFAULT = new $FactionRaidConfig(true, "event.minecraft.raid", "event.minecraft.raid.victory", "event.minecraft.raid.defeat", $FactionRaidConfig.DEFAULT_MOBS_FRACTION, undefined, undefined, undefined);