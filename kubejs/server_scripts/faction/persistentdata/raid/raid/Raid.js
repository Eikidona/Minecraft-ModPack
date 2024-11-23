/**
 * @class
 * @classdesc
 * @param {number} id 
 */
function $Raid(id) {
    /**
     * @description 在RaidManager的唯一id
     * @type {number}
     */
    this.id = id;
}

/**
 * @description 获取id
 * @returns {number} 
 */
$Raid.prototype.getId = function () {
    return this.id;
}