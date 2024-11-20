/**
 * 
 * @param {Internal.Mob} sourceEntity 
 */
const NearestFactionEnemyTargetGoal = (sourceEntity) => {
  new NearestAttackableTargetGoal(sourceEntity,
    Mob,
    true,
    /**
     * 
     * @param {Internal.Mob} targetEntity 
     */
    (targetEntity) => {
      let canAttack = false;
      if (targetEntity instanceof Mob) {
        $FactionEntityHelper.getFactionEntity(sourceEntity).getFaction().isEnemyOf($FactionEntityHelper.getFactionEntity(targetEntity).getFaction())
      }
      return canAttack;
  })
}