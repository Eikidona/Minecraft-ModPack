// priority: 999999
const $Utils = {
    math: {
        /**
         * @description 将值钳制到一个区间内
         * @param {number} value 
         * @param {number} min 
         * @param {number} max 
         */
        clamp: function (value, min, max) {
            return Math.max(min, Math.min(max, value));
        }
    },
    weightTable: {
        /**
         * @description 新建权重表
         * @param {{element:T, weight:number}[]} weightEntries
         * @returns {$WeightTable<T>} 
         */
        create: function (weightEntries) {
            return new $WeightTable(weightEntries.map(entry =>new $WeightEntry(entry.element, entry.weight)))
        }
    },
    /**
     * @description 转换为ResourceLocation格式字符串
     * @param {ResourceLocation_} name 
     */
    toRegistryName: function (name) {
        return typeof name == "string" ? String(new ResourceLocation(name)) : String(name);
    }
}