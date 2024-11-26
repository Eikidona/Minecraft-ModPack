const NearestAttackableEnemyGoal = /**@param {Internal.Mob} mobEntity */ (mobEntity) => new NearestAttackableTargetGoal(mobEntity,
    LivingEntity,
    true,
    /**@param {Internal.Mob} livingEntity */
    (livingEntity) => {
        let sourcefactionEntity = $FactionEntityHelper.getFactionEntity(mobEntity);
        let targetfactionEntity = $FactionEntityHelper.getFactionEntity(mobEntity);

        // /**
        //  * debug
        //  */
        // if (sourcefactionEntity.getFaction() == undefined) {
        //     console.error(`Entity: ${sourcefactionEntity.getEntity().getEncodeId()}`);
        //     return false;
        // }
        return sourcefactionEntity.getFaction().isEnemyOf(targetfactionEntity.getFaction());
    }
);
