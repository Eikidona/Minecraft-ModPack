// priority: 1000
/**
 * @class
 * @classdesc 处理非玩家实体的
 * @param {Internal.LivingEntity} livingEntity 
 */
function $FactionEntity(livingEntity) {
    this.livingEntity = livingEntity;
    /**@type {$Faction} */
    this.faction = $Factions.GAIA;
    /**@type {BlockPos} */
    this.targetPosition;

    this.load();
    $FactionEntity.addFactionEntity(this);
}

/**
 * @description 获取实体
 * @returns {Internal.LivingEntity}
 */
$FactionEntity.prototype.getEntity = function () {
    return this.livingEntity;
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
 * @param {Internal.CompoundTag} nbt 
 */
$FactionEntity.prototype.deserializeNBT = function (nbt) {
    /**@type {Internal.CompoundTag} */
    let factionEntity;
    if (nbt.contains("FactionEntity")) {
        factionEntity = nbt.getCompound("FactionEntity");
    }

    if (factionEntity) {
        if (factionEntity.contains("Faction")) {
            this.faction = $Factions.getFaction(new ResourceLocation(nbt.getString("Faction")));
        }
        if (factionEntity.contains("TargetPosition")) {
            this.targetPosition = BlockPos.of(nbt.getLong("TargetPosition"));
        }
    }
}

/**
 * @description 序列化
 * @returns {Internal.CompoundTag} 
 */
$FactionEntity.prototype.serializeNBT = function () {
    let compoundTag = new CompoundTag();
    let factionEntity = new CompoundTag();
    if (this.faction) {
        factionEntity.putString("Faction", String(this.faction.getName()))
    }
    if (this.targetPosition) {
        factionEntity.putLong("TargetPosition", this.targetPosition.asLong());
    }
    compoundTag.put("FactionEntity", factionEntity)
    return compoundTag;
}

/**
 * @description 加载 将从实体NBT中尝试初始化
 */
$FactionEntity.prototype.load = function () {
    this.deserializeNBT(this.livingEntity.getPersistentData());
}

/**
 * @description 保存 将序列化后的nbt合并至实体nbt上
 */
$FactionEntity.prototype.save = function () {
    this.livingEntity.getPersistentData().merge(this.serializeNBT());
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