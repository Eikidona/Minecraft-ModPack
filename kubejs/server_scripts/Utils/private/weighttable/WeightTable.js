/**
 * @class
 * @classdesc 权重表
 * @template T
 * @param {$WeightEntry<T>[]} weightEntries
 */
function $WeightTable(weightEntries) {
  /**@type {$WeightEntry<T>[]} */
  this.weightTable = [];
  weightEntries.forEach(entry => {
    this.weightTable.push(entry)
  })
}
/**
 * @returns {T}
 */
$WeightTable.prototype.roll = function () {
  let randomWeight = (Math.random() * this.weightTable.length).toFixed(0);

  let cumulativeWeight = 0;
  let results;
  for (const entry of this.weightTable) {
    cumulativeWeight += entry.getWeight();
    if (cumulativeWeight >= randomWeight) {
      results = entry.getElement();
      break;
    }
  }
  return results;
}