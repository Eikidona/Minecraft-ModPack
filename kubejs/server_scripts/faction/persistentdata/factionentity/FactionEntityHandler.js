/**
 * @description 实体生成时附加数据
 */
EntityEvents.spawned(event => {
    /**@type {Internal.Mob} */
    let mobEntity = event.entity;
    if (!(mobEntity instanceof Mob)) return;

    // let factionEntity = new $FactionEntity(livingEntity);
    let factionEntity = $FactionEntityHelper.getFactionEntity(mobEntity);
    factionEntity.save();
})
/**
 * @description 实体死亡时清除对应的映射
 */
EntityEvents.death(event => {
    /**@type {Internal.Mob} */
    let mobEntity = event.entity;
    if (!(mobEntity instanceof Mob)) return;

    $FactionEntity.removeFactionEntity(mobEntity);
})
/**
 * @description 实体选择的目标不能是同阵营以及同盟
 */
NativeEvents.onEventTyped("normal", false, LivingChangeTargetEvent, /**@param {Internal.LivingChangeTargetEvent} event */event => {
    /**@type {Internal.Mob} */
    let sourceEntity = event.getEntity();
    /**@type {Internal.Mob} */
    let targetEntity = event.getNewTarget();
    if (targetEntity instanceof ServerPlayer || !(sourceEntity instanceof Mob) || !(targetEntity instanceof Mob)) return;
    let sourceFactionEntity = $FactionEntityHelper.getFactionEntity(sourceEntity);
    let targetFactionEntity = $FactionEntityHelper.getFactionEntity(targetEntity);
    if (sourceFactionEntity.getFaction() == $Factions.NONE) return;

    if (sourceFactionEntity.getFaction().isAllyOf(targetFactionEntity.getFaction()) || sourceFactionEntity.getFaction() == targetFactionEntity.getFaction()) {
        event.setCanceled(true);
    }
})
/**
 * @description 实体不能伤害同阵营以及同盟实体 NONE除外
 */
NativeEvents.onEventTyped("normal", true, LivingAttackEvent, /**@param {Internal.LivingAttackEvent} event */ event => {
    /**@type {Internal.Mob} */
    let sourceEntity = event.getEntity();
    /**@type {Internal.Mob} */
    let targetEntity = event.getSource().getActual();
    if (sourceEntity instanceof ServerPlayer || !(sourceEntity instanceof Mob) || !(targetEntity instanceof Mob)) return;
    let sourceFactionEntity = $FactionEntityHelper.getFactionEntity(sourceEntity);
    let targetFactionEntity = $FactionEntityHelper.getFactionEntity(targetEntity);
    if (sourceFactionEntity.getFaction() == $Factions.NONE) return;
    
    if (sourceFactionEntity.getFaction().isAllyOf(targetFactionEntity.getFaction()) || sourceFactionEntity.getFaction() == targetFactionEntity.getFaction()) {
        event.setCanceled(true);
    }
})
/**
 * @description 实体生成时应用Boots
 */