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
 * @param {Internal.SoundEvent} waveSoundEvent 
 * @param {Internal.SoundEvent} victorySoundEvent 
 * @param {Internal.SoundEvent} defeatSoundEvent 
 */
function $RaidConfig(enabled, name, victoryAlt, defeatAlt, victoryComponent, defeatComponent, raidBarNameComponent, raidBarVictoryComponent, raidBarDefeatComponent, mobsFraction, waveSoundEvent, victorySoundEvent, defeatSoundEvent) {
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
	 * @type {Internal.Component}
	 */
	this.victoryComponent = victoryComponent;
	/**
	 * @type {Internal.Component}
	 */
	this.defeatComponent = defeatComponent;
	/**
	 * @type {Internal.Component}
	 */
	this.raidBarNameComponent = raidBarNameComponent;
	/**
	 * @type {Internal.Component}
	 */
	this.raidBarVictoryComponent = raidBarVictoryComponent;
	/**
	 * @type {Internal.Component}
	 */
	this.raidBarDefeatComponent = raidBarDefeatComponent;
	/**
	 * @type {number}
	 */
	this.mobsFraction = mobsFraction;
	/**
	 * @type {Internal.SoundEvent}
	 */
	this.waveSoundEvent = waveSoundEvent;
	/**
	 * @type {Internal.SoundEvent}
	 */
	this.victorySoundEvent = victorySoundEvent;
	/**
	 * @type {Internal.SoundEvent}
	 */
	this.defeatSoundEvent = defeatSoundEvent;
}

$RaidConfig.prototype.isEnabled = function () {
	return this.enabled;
}

$RaidConfig.prototype.getName = function () {
	return this.name;
}

$RaidConfig.prototype.getVictoryAlt = function () {
	return this.victoryAlt;
}

$RaidConfig.prototype.getDefeatAlt = function () {
	return this.defeatAlt;
}

$RaidConfig.prototype.getRaidBarNameComponent = function () {
	return this.raidBarNameComponent;
}

$RaidConfig.prototype.getRaidBarVictoryComponent = function () {
	return this.raidBarVictoryComponent;
}

$RaidConfig.prototype.getRaidBarDefeatComponent = function () {
	return this.raidBarDefeatComponent
}

$RaidConfig.prototype.getMobsFraction = function () {
	return this.mobsFraction;
}

$RaidConfig.prototype.getWaveSoundEvent = function () {
	return this.waveSoundEvent;
}

$RaidConfig.prototype.getVictorySoundEvent = function () {
	return this.victorySoundEvent;
}

$RaidConfig.prototype.getDefeatSoundEvent = function () {
	return this.defeatSoundEvent;
}