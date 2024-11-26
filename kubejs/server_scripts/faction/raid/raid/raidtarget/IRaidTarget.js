/**
 * @interface
 * @class
 * @classdesc 
 */
function $IRaidTarget() {
    
}
/**
 * @description 袭击目标位置
 * @returns {BlockPos}
 */
$IRaidTarget.prototype.getTargetPosition = function () {
    console.error("你必须实现IRaidTarget接口的函数getTargetPosition")
}