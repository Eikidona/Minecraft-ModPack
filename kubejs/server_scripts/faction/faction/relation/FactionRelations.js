// priority: 2000
/**
 * @class
 * @classdesc 派系总体关系
 * @param {ResourceLocation[]} allies 
 * @param {ResourceLocation[]} enemies 
 */
function $FactionRelations(allies, enemies) {
    /**
     * @type {Map<string, $FactionRelation>}
     */
    this.originalRelations = new Map();
    /**
     * @type {Map<string, $FactionRelation>}
     */
    this.actualRelations = new Map();

    /**
     * 实例化时 关系写入原始关系
     */
    allies.forEach(ally => this.originalRelations.set(String(ally), new $FactionRelation(ally, $FactionRelation.ALLY_MAX)));
    enemies.forEach(enemy => this.originalRelations.set(String(enemy), new $FactionRelation(enemy, $FactionRelation.ENEMY_MAX)));

    this.initiateActualRelations();

}
/**
 * @description 获取派系关系
 * @param {boolean} actual 是否为实际关系
 * @returns {$FactionRelation} 
 */
$FactionRelations.prototype.getRelations = function (actual) {
    return actual ? this.actualRelations : this.originalRelations;
}
/**
 * @description 获取盟友派系id数组
 * @returns {ResourceLocation[]} 盟友派系id数组
 */
$FactionRelations.prototype.getAllies = function () {
    return Array.from(this.originalRelations.values()).filter(relation => relation.isAlly()).map(ralation => ralation.getFactionName);
}
/**
 * @description 获取敌对派系id数组
 * @returns {ResourceLocation[]} 敌对派系id数组
 */
$FactionRelations.prototype.getEnemies = function () {
    return Array.from(this.originalRelations.values()).filter(relation => relation.isEnemy()).map(ralation => ralation.getFactionName);
}
/**
 * @description 获取指定派系的关系
 * @param {$Faction} faction 
 * @returns {$FactionRelation} 
 */
$FactionRelations.prototype.getFactionRelation = function (faction) {
    /**@type {$FactionRelation} */
    let relation;
    let stringFactionName = String(faction.getName());
    relation = this.actualRelations.get(stringFactionName);
    if (!relation) {
        relation = new $FactionRelation(faction.getName(), $FactionRelation.NEUTRAL);
        this.actualRelations.set(stringFactionName, relation);
    }
    return relation;
}
/**
 * @description 该派系是否为敌对派系
 * @param {$Faction} faction 
 * @returns {boolean}
 */
$FactionRelations.prototype.isEnemyOf = function (faction) {
    return this.getFactionRelation(faction).isEnemy();
}
/**
 * @description 该派系是否为同盟派系
 * @param {$Faction} faction 
 * @returns {boolean}
 */
$FactionRelations.prototype.isAllyOf = function (faction) {
    return this.getFactionRelation(faction).isAlly();
}
/**
 * @description 调整关系值
 * @param {$Faction} faction 
 * @param {number} amount 
 */
$FactionRelations.prototype.adjustRelation = function (faction, amount) {
    this.getFactionRelation(faction).adjustRelation(amount);
}
/**
 * @description 设置初始关系值
 * @param {$Faction} faction 
 * @param {number} amount 
 */
$FactionRelations.prototype.setInitialRelation = function (faction, amount) {
    if (this.originalRelations.has(String(faction.getName()))) return;
    this.originalRelations.set(String(faction.getName()), new $FactionRelation(faction.getName(), amount));
}
// /**
//  * @description 初始化实际关系
//  * @param {Map<ResourceLocation, $FactionRelation>} targetRelations
//  */
// $FactionRelations.prototype.initiateActualRelations = function (targetRelations) {
//     targetRelations.forEach((relation, factionName) => this.actualRelations.set(String(factionName), relation));

//     this.originalRelations.forEach((relation, factionName) => this.actualRelations.set(String(factionName), relation));
// }

/**
 * @description 初始化实际关系
 */
$FactionRelations.prototype.initiateActualRelations = function () {
    this.originalRelations.forEach((relation, factionName) => this.actualRelations.set(String(factionName), relation));
}

/**
 * @description 序列化
 * @returns {Internal.CompoundTag}
 */
$FactionRelations.prototype.serializeNBT = function () {
    let compoundTag = new CompoundTag();
    let relationsListTag = new ListTag();
    this.actualRelations.forEach((relation) => {
        relationsListTag.add(relation.serializeNBT())
    });
    compoundTag.put("Relations", relationsListTag);

    /**
     * debug
     */
    console.log(`FactionRelations serializeNBT: ${compoundTag.toString()}`);

    return compoundTag;
}

/**
 * @description 反序列化 只与实际关系有关
 * @param {Internal.CompoundTag} compoundTag 
 */
$FactionRelations.prototype.deserializeNBT = function (compoundTag) {
    if (compoundTag.contains("Relations")) {
        compoundTag.getList("Relations", 10).forEach(relationNBT => {
            let relation = new $FactionRelation();
            relation.deserializeNBT(relationNBT);
            this.actualRelations.set(String(relation.getFactionName()), relation);
        })
    }
}

/**
 * 默认关系对象
 */
$FactionRelations.DEFAULT = new $FactionRelations([], []);