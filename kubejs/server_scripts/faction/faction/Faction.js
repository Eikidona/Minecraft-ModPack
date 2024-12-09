// priority: 2000
/**
 * @class
 * @param {string} name 
 * @param {$FactionRelations} relations 
 * @param {$RaidConfig} raidConfig 
 * @param {$WeightTable<$FactionEntityType>} factionEntityTypeWeightTable 
 */
function $Faction(name, relations, raidConfig, factionEntityTypeWeightTable) {
    /**@type {ResourceLocation} */
    this.name = name;
    /**@type {$FactionRelations} */
    this.relations = relations;
    /**
     * @description 袭击配置
     * @type {$RaidConfig}
     */
    this.raidConfig = raidConfig;
    /**
     * @description 权重表
     */
    this.factionEntityTypeWeightTable = factionEntityTypeWeightTable;
}

/**
 * @description 获取派系id
 * @returns {ResourceLocation}
 */
$Faction.prototype.getName = function () {
    return this.name;
}

/**
 * @description 获取派系实体权重表
 */
$Faction.prototype.getFactionEntityTypeWeightTable = function () {
    return this.factionEntityTypeWeightTable;
}

/**
 * @description 该派系是否为同盟派系
 * @param {$Faction} faction 
 * @returns {boolean}
 */
$Faction.prototype.isAllyOf = function (faction) {
    return this.relations.isAllyOf(faction);
}

/**
 * @description 该派系是否为敌对派系
 * @param {$Faction} faction 
 * @returns {boolean}
 */
$Faction.prototype.isEnemyOf = function (faction) {
    return this.relations.isEnemyOf(faction);
}
/**
 * @description 袭击显示组件
 * @returns {Internal.MutableComponent}
 */
$Faction.prototype.getRaidComponent = function () {
    return this.raidConfig.getRaidComponent();
}

/**
 * @description 胜利显示组件
 * @returns {Internal.MutableComponent}
 */
$Faction.prototype.getVictoryComponent = function () {
    return this.raidConfig.getVictoryComponent();
}

/**
 * @description 失败显示组件
 * @returns {Internal.MutableComponent}
 */
$Faction.prototype.getDefeatComponent = function () {
    return this.raidConfig.getDefeatComponent();
}

/**
 * @description 序列化
 * @returns {Internal.CompoundTag}
 */
$Faction.prototype.serializeNBT = function () {
    let compoundTag = new CompoundTag();
    let relationsListTag = this.relations.serializeNBT();
    compoundTag.putString("Name", String(this.getName()));
    compoundTag.merge(relationsListTag);

    // /**
    //  * debug
    //  */
    // console.log(`$Faction serializeNBT: ${compoundTag.toString()}`);

    return compoundTag;
}
/**
 * @description 反序列化
 * @param {Internal.CompoundTag} compoundTag 
 */
$Faction.prototype.deserializeNBT = function (compoundTag) {
    if (compoundTag.contains("Name")) {
        this.name = new ResourceLocation(compoundTag.getString("Name"));
    }
    if (compoundTag.contains("Relations")) {
        let relations = new $FactionRelations([], []);
        relations.deserializeNBT(compoundTag);
        this.relations = relations;
    }
}

/**
 * @static
 * @returns {$Faction}
 * @param {string} name
 * @param  {{allies:string[], enemies:string[]}} relations
 */
$Faction.create = function (name, relations, raidConfig, factionEntityTypeWeightTable) {
    
}