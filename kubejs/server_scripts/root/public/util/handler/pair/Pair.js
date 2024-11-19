// priority: 2000

/**
 * @class
 * @template F
 * @template S
 */
function $Pair(first, second) {
  /**
   * @type {F}
   */
  this.first = first;
  /**
   * @type {S}
   */
  this.second = second
}

$Pair.prototype.getFirst = function () {
  return this.first;
}

$Pair.prototype.getSecond = function () {
  return this.second;
}