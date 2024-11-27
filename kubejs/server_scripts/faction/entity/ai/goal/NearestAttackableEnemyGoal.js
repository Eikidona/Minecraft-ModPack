const NearestAttackableEnemyGoal = /**@param {Internal.Mob} sourceMobEntity */ (sourceMobEntity) => new NearestAttackableTargetGoal(sourceMobEntity,
    Mob,
    true,
    /**@param {Internal.Mob} targetMobEntity */
    (targetMobEntity) => {
        let sourcefactionEntity = $FactionEntityHelper.getFactionEntity(sourceMobEntity);
        let targetfactionEntity = $FactionEntityHelper.getFactionEntity(targetMobEntity);
        // /**
        //  * debug
        //  */
        // console.log(`Source Faction Entity: ${sourcefactionEntity.getFaction() instanceof $Faction} Target Faction Entity: ${targetfactionEntity.getFaction() instanceof $Faction}`);
        // if (sourcefactionEntity.getFaction() == undefined || targetfactionEntity.getFaction() == undefined) {
        //     console.log(`Source Entity Id: ${sourcefactionEntity.getEntity().getEncodeId()}`);
        //     console.log(`Target Entity Id: ${targetfactionEntity.getEntity().getEncodeId()}`);
        //     return false;
        // }
        return sourcefactionEntity.getFaction().isEnemyOf(targetfactionEntity.getFaction());
    }
);
