// priority: 1000
/**
 * @class
 * @classdesc 处理非玩家实体的
 * @param {Internal.Mob} modEntity 
 */
function $FactionEntity(modEntity) {
    /**
     * @description 实体
     * @type {Internal.Mob}
     */
    this.mobEntity = modEntity;
    /**
     * @description 阵营
     * @type {$Faction}
     */
    this.faction = $Factions.GAIA;
    /**
     * @description 类型
     * @type {$FactionEntityType}
     */
    this.factionEntityType = $FactionEntityTypes.NONE;

    this.load();
    $FactionEntity.addFactionEntity(this);
}

/**
 * @description 获取实体
 * @returns {Internal.Mob}
 */
$FactionEntity.prototype.getEntity = function () {
    return this.mobEntity;
}
/**
 * @description 获取派系
 * @returns {$Faction}
 */
$FactionEntity.prototype.getFaction = function () {
    return this.faction;
}

/**
 * @description 设置派系
 * @param {$Faction} faction 
 */
$FactionEntity.prototype.setFaction = function (faction) {
    this.faction = faction;
}

/**
 * @description 反序列化
 * @param {Internal.CompoundTag} compoundTag 
 */
$FactionEntity.prototype.deserializeNBT = function (compoundTag) {
    /**@type {Internal.CompoundTag} */
    let factionEntityNBT;
    if (compoundTag.contains("FactionEntity")) {
        factionEntityNBT = compoundTag.getCompound("FactionEntity");
    }

    if (factionEntityNBT) {
        if (factionEntityNBT.contains("Faction")) {
            this.faction = $Factions.getFaction(new ResourceLocation(factionEntityNBT.getString("Faction")));
        }
        if (factionEntityNBT.contains("FactionEntityType")) {
            this.faction = $FactionEntityTypes.getFactionEntityType(new ResourceLocation(factionEntityNBT.getString(FactionEntityType)));
        }
    }
}

/**
 * @description 序列化
 * @returns {Internal.CompoundTag} 
 */
$FactionEntity.prototype.serializeNBT = function () {
    let compoundTag = new CompoundTag();
    let factionEntityNBT = new CompoundTag();
    if (this.faction) {
        factionEntityNBT.putString("Faction", String(this.faction.getName()))
    }
    if (this.factionEntityType) {
        factionEntityNBT.putString("FactionEntityType", String(this.factionEntityType.getName()));
    }
    // if (this.targetPosition) {
    //     factionEntityNBT.putLong("TargetPosition", this.targetPosition.asLong());
    // }
    compoundTag.put("FactionEntity", factionEntityNBT);
    return compoundTag;
}

/**
 * @description 加载 将从实体NBT中尝试初始化
 */
$FactionEntity.prototype.load = function () {
    this.deserializeNBT(this.mobEntity.getPersistentData());
}

/**
 * @description 保存 将序列化后的nbt合并至实体nbt上
 */
$FactionEntity.prototype.save = function () {
    this.mobEntity.getPersistentData().merge(this.serializeNBT());
}


/**@type {Map<string, $FactionEntity>} String Uuid : FactionEntityInstance*/
$FactionEntity.VALUES = new Map();

/**
 * @description 将FactionEntity实例添加到Map
 * @param {$FactionEntity} factionEntity
 */
$FactionEntity.addFactionEntity = function (factionEntity) {
    this.VALUES.set(String(factionEntity.getEntity().getStringUuid()), factionEntity);
}

/**
 * @description 尝试从Map获取给定实体的FactionEntity实例
 * @param {Internal.LivingEntity} livingEntity 
 * @returns {$FactionEntity | undefined}
 */
$FactionEntity.getFactionEntity = function (livingEntity) {
    return this.VALUES.get(String(livingEntity.getStringUuid()));
}

/**
 * @description 删除给定实体的FactionEntity
 * @param {Internal.LivingEntity} livingEntity 
 * @returns {boolean} 
 */
$FactionEntity.removeFactionEntity = function (livingEntity) {
    return this.VALUES.delete(String(livingEntity.getStringUuid()))
}