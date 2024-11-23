EntityEvents.spawned(event => {
    /**@type {Internal.LivingEntity} */
    let livingEntity = event.entity;
    if (!livingEntity instanceof LivingEntity) return;

    let factionEntity = new $FactionEntity(livingEntity);
    factionEntity.save();
})

EntityEvents.death(event => {
    /**@type {Internal.LivingEntity} */
    let livingEntity = event.entity;
    if (!(livingEntity instanceof LivingEntity) || livingEntity instanceof ServerPlayer) return;

    $FactionEntity.removeFactionEntity(livingEntity);
})

NativeEvents.onEventTyped("normal", false, LivingChangeTargetEvent, /**@param {Internal.LivingChangeTargetEvent} event */event => {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.getEntity();
    /**@type {Internal.LivingEntity} */
    let targetEntity = event.getNewTarget();
    if (targetEntity instanceof ServerPlayer || !(sourceEntity instanceof LivingEntity) || !(targetEntity instanceof LivingEntity)) return;
    let sourceFactionEntity = $FactionEntityHelper.getFactionEntity(sourceEntity);
    let targetFactionEntity = $FactionEntityHelper.getFactionEntity(targetEntity);

    if (sourceFactionEntity.getFaction().isAllyOf(targetFactionEntity.getFaction())) {
        event.setCanceled(true);
    }
})

NativeEvents.onEventTyped("normal", true, LivingAttackEvent, /**@param {Internal.LivingAttackEvent} event */ event => {
    /**@type {Internal.LivingEntity} */
    let sourceEntity = event.getEntity();
    /**@type {Internal.LivingEntity} */
    let targetEntity = event.getSource().getActual();
    if (sourceEntity instanceof ServerPlayer || !(sourceEntity instanceof LivingEntity) || !(targetEntity instanceof LivingEntity)) return;
    let sourceFactionEntity = $FactionEntityHelper.getFactionEntity(sourceEntity);
    let targetFactionEntity = $FactionEntityHelper.getFactionEntity(targetEntity);

    if (sourceFactionEntity.getFaction().isAllyOf(targetFactionEntity.getFaction())) {
        event.setCanceled(true);
    }
})