/**
 * @class
 * @classdesc
 */
function $EntityWeightMapProperties() {
  this.wave = 1;
  this.omen = 0;
  this.allowedRanks = [];
  this.blockPos;
  this.biome;
}

$EntityWeightMapProperties.prototype.getWave = function () {
  return this.wave;
}

$EntityWeightMapProperties.prototype.setWave = function (wave) {
  this.wave = wave;
  return this;
}

$EntityWeightMapProperties.prototype.getOmen = function () {
  return this.omen;
}

$EntityWeightMapProperties.prototype.getAllowedRanks = function () {
  return this.allowedRanks;
}

$EntityWeightMapProperties.prototype.setAllowedRanks = function (allowedRanks) {
  this.allowedRanks = Array.from(allowedRanks);
  return this;
}

$EntityWeightMapProperties.prototype.addAllowedRank = function (rank) {
  this.allowedRanks.push(rank);
  return this;
}

$EntityWeightMapProperties.prototype.removeAllowedRank = function (rank) {
  this.allowedRanks.splice(this.allowedRanks.indexOf(rank));
  return this;
}

$EntityWeightMapProperties.prototype.getBiome = function () {
  return this.biome;
}

$EntityWeightMapProperties.prototype.setBiome = function (biome) {
  this.biome = biome;
  return this;
}

$EntityWeightMapProperties.prototype.getBlockPos = function () {
  return this.blockPos;
}

$EntityWeightMapProperties.prototype.setBlockPos = function (blockPos) {
  this.blockPos = blockPos;
  return this;
}