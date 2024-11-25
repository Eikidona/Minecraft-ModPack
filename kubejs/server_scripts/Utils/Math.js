// priority: 999999
const $Math = {
    /**
     * @description 将值钳制到一个区间内
     * @param {number} value 
     * @param {number} min 
     * @param {number} max 
     */
    clamp: function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
}