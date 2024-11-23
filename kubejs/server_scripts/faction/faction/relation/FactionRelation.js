/**
 * @class
 * @classdesc 派系关系
 * @param {ResourceLocation} factionName 
 * @param {number} relation 
 */
function $FactionRelation(factionName, relation) {
    this.factionName = factionName;
    this.relation = relation;
}
/**
 * @description 获取派系id
 * @returns {ResourceLocation}
 */
$FactionRelation.prototype.getFactionName = function () {
    return this.factionName;
}
/**
 * @description 获取关系值
 * @returns {number}
 */
$FactionRelation.prototype.getRelation = function () {
    return this.relation;
}
/**
 * @description 设置派系id
 * @param {ResourceLocation} factionName 
 */
$FactionRelation.prototype.setFactionName = function (factionName) {
    this.factionName = factionName;
}
/**
 * @description 设置关系值
 * @param {number} amount 
 */
$FactionRelation.prototype.setRelation = function (amount) {
    this.relation = amount;
    if (this.relation > $FactionRelation.ALLY_MAX) {
        this.relation = $FactionRelation.ALLY_MAX
    } else if (this.relation < $FactionRelation.ENEMY_MAX) {
        this.relation = $FactionRelation.ENEMY_MAX
    }
}
/**
 * @description 关系是否为同盟级
 * @returns {boolean}
 */
$FactionRelation.prototype.isAlly = function () {
    return this.relation >= $FactionRelation.ALLY_THRESHOLD;
}
/**
 * @description 关系是否为敌对级
 * @returns {boolean}
 */
$FactionRelation.prototype.isEnemy = function () {
    return this.relation <= $FactionRelation.ENEMY_THRESHOLD;
}
/**
 * @description 关系是否为自然
 * @returns {boolean}
 */
$FactionRelation.prototype.isNeutral = function () {
    return !this.isAlly() && !this.isEnemy();
}
/**
 * @description 调整关系值
 * @param {number} amount 
 */
$FactionRelation.prototype.adjustRelation = function (amount) {
    this.relation += amount;
    if (this.relation > $FactionRelation.ALLY_MAX) {
        this.relation = $FactionRelation.ALLY_MAX
    } else if (this.relation < $FactionRelation.ENEMY_MAX) {
        this.relation = $FactionRelation.ENEMY_MAX
    }
}

/**
 * @description 序列化
 * @returns {Internal.CompoundTag}
 */
$FactionRelation.prototype.serializeNBT = function () {
    let compoundTag = new CompoundTag();
    compoundTag.putString("FactionName", String(this.getFactionName()));
    compoundTag.putInt("Relation", this.getRelation());

    /**
     * debug
     */
    console.log(`FactionRelation serializeNBT: ${compoundTag.toString()}`);

    return compoundTag;
}

/**
 * @description 反序列化
 * @param {Internal.CompoundTag} compoundTag 
 */
$FactionRelation.prototype.deserializeNBT = function (compoundTag) {
    if (compoundTag.contains("FactionName")) {
        this.setFactionName(new ResourceLocation(compoundTag.getString("FactionName")));
    }
    if (compoundTag.contains("Relation")) {
        this.setRelation(compoundTag.getInt("Relation"));
    }
}

/**
 * @description 最低同盟关系值
 */
$FactionRelation.ALLY_THRESHOLD = 40; 
/**
 * @description 最低敌对关系值
 */
$FactionRelation.ENEMY_THRESHOLD = -40;
/**
 * @description 自然关系默认值
 */
$FactionRelation.NEUTRAL = 0;
/**
 * @description 最高同盟关系值
 */
$FactionRelation.ALLY_MAX = 100;
/**
 * @description 最低敌对关系值
 */
$FactionRelation.ENEMY_MAX = -100;