/**
 * @class
 * @classdesc 权重项
 * @template T
 * @param {T} element 
 * @param {number} weight 
 */
function $WeightEntry(element, weight) {
  this.element = element;
  this.weight = (weight ?? 1).toFixed(0);
}

$WeightEntry.prototype.getWeight = function () {
  return this.weight;
}

$WeightEntry.prototype.getElement = function () {
  return this.element;
}
