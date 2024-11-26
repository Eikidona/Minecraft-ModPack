EntityEvents.spawned(event => {
    /**@type {Internal.LivingEntity} */
    let mobEntity = event.entity;
    if (!mobEntity instanceof Mob) return;

    // let factionEntity = new $FactionEntity(livingEntity);
    let factionEntity = $FactionEntityHelper.getFactionEntity(mobEntity);
    factionEntity.save();
})

EntityEvents.death(event => {
    /**@type {Internal.Mob} */
    let modEntity = event.entity;
    if (!modEntity instanceof Mob) return;

    $FactionEntity.removeFactionEntity(modEntity);
})

NativeEvents.onEventTyped("normal", false, LivingChangeTargetEvent, /**@param {Internal.LivingChangeTargetEvent} event */event => {
    /**@type {Internal.Mob} */
    let sourceEntity = event.getEntity();
    /**@type {Internal.Mob} */
    let targetEntity = event.getNewTarget();
    if (targetEntity instanceof ServerPlayer || !(sourceEntity instanceof Mob) || !(targetEntity instanceof Mob)) return;
    let sourceFactionEntity = $FactionEntityHelper.getFactionEntity(sourceEntity);
    let targetFactionEntity = $FactionEntityHelper.getFactionEntity(targetEntity);

    if (sourceFactionEntity.getFaction().isAllyOf(targetFactionEntity.getFaction())) {
        event.setCanceled(true);
    }
})

NativeEvents.onEventTyped("normal", true, LivingAttackEvent, /**@param {Internal.LivingAttackEvent} event */ event => {
    /**@type {Internal.Mob} */
    let sourceEntity = event.getEntity();
    /**@type {Internal.Mob} */
    let targetEntity = event.getSource().getActual();
    if (sourceEntity instanceof ServerPlayer || !(sourceEntity instanceof Mob) || !(targetEntity instanceof Mob)) return;
    let sourceFactionEntity = $FactionEntityHelper.getFactionEntity(sourceEntity);
    let targetFactionEntity = $FactionEntityHelper.getFactionEntity(targetEntity);

    if (sourceFactionEntity.getFaction().isAllyOf(targetFactionEntity.getFaction())) {
        event.setCanceled(true);
    }
})