/**
 * @class
 * @classdesc LivingEntity in raid
 * @param {Internal.Mob} livingEntity 
 */
function $Raider(livingEntity) {
    /**@type {Internal.Mob} 实体 */
    this.livingEntity = livingEntity;
     /**@type {$Raid} 袭击 */
    this.raid;
}

/**
 * @description 获取实体
 * @returns {Internal.Mob}
 */
$Raider.prototype.getEntity = function () {
    return this.livingEntity;
}

/**
 * @description 获取袭击
 * @returns {$Raid}
 */
$Raider.prototype.getRaid = function () {
    return this.raid;
}

/**
 * @description 设置Raid
 * @param {$Raid} raid 
 */
$Raider.prototype.setRaid = function (raid) {
    this.raid = raid;
}

/**
 * @description 序列化
 * @returns {Internal.CompoundTag}
 */
$Raider.prototype.serializeNBT = function () {
    let compoundTag = new CompoundTag();
    if (this.raid) {
        compoundTag.putInt("Raid", this.getRaid().getId());
    }
}

/**
 * @description 反序列化
 * @param {Internal.CompoundTag} compoundTag 
 */
$Raider.prototype.deserializeNBT = function (compoundTag) {
    if (compoundTag.contains("Raid")) {
        this.raid = $RaidManagerHelper.getRaidManager(this.getEntity().getLevel()).getRaid(compoundTag.getInt("Raid"));
    }
}




/**
 * @description String Uuid: RaiderInstance
 * @type {Map<string, $Raider>}
 */
$Raider.VALUES = new Map();

/**
 * @description 向内置Map添加Raider
 * @param {$Raider} raider 
 */
$Raider.addRaider = function (raider) {
    this.VALUES.set(String(raider.getEntity().getStringUuid()), raider);
}

/**
 * @description 尝试获取指定实体的Raider
 * @param {Internal.Mob} livingEntity 
 * @returns {$Raider | undefined}
 */
$Raider.getRaider = function (livingEntity) {
    return this.VALUES.get(String(livingEntity.getStringUuid()));
}

/**
 * @description 尝试删除指定实体的Raider
 * @param {Internal.Mob} livingEntity 
 * @returns {boolean}
 */
$Raider.getRaider = function (livingEntity) {
    return this.VALUES.delete(String(livingEntity.getStringUuid()));
}