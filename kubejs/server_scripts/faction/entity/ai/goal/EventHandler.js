/**
 * @description 实体Goal
 */
EntityEvents.spawned(event => {
    /**@type {Internal.Mob} */
    let mobEntity = event.entity;
    if (!(mobEntity instanceof Mob)) return;
    mobEntity.goalSelector.addGoal(10, NearestAttackableEnemyGoal(mobEntity));
})