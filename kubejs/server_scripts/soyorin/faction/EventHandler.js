// EntityEvents.spawned(event => {
//   /**@type {Internal.Mob} */
//   let mobEntity = event.entity;
//   if (!(mobEntity instanceof Mob)) return;
//   /**
//    * 向实体添加 Goal
//    * arg0 实体自身
//    * arg1 目标类型 Class
//    * arg2 是否要看到目标
//    * arg3 攻击条件
//    */
//   mobEntity.targetSelector.addGoal(
//     1000,
//     new NearestAttackableTargetGoal(
//       mobEntity,
//       Mob,
//       true,
//       /**
//        * 
//        * @param {Internal.Mob} target 
//        */
//       target => $FactionManager.isHostile(mobEntity, target)
//     ))
//   /**
//    * 向实体添加NBT
//    */
//   let data = mobEntity.getPersistentData();
//   data.put('faction', $FactionManager.getEntityFactionId(mobEntity));
// })
// /**
//  * 用于测试
//  */
// ItemEvents.entityInteracted(event => {
//   /**
//    * @type {Internal.Mob}
//    */
//   let mobEntity = event.target;
//   if (event.hand != 'main_hand' || !(mobEntity instanceof Mob)) return;
//   /**
//    * @type {Internal.ServerPlayer}
//    */
//   let serverPlayer = event.entity;
//   // console.log(`EventHandler serverPlayer ${String(serverPlayer.type)}`);
//   // console.log(`EventHandler mobEntity ${String(mobEntity.type)}`);
//   serverPlayer.tell($FactionManager.getEntityFactionId(mobEntity));
// })