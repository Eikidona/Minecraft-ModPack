PlayerEvents.chat(event => {
    /**@type {Internal.ServerPlayer} */
    let player = event.player;
    /**@type {Internal.ServerLevel} */
    let level = event.level;

    if (event.message == "f") {
        player.tell(`已输出调试数据 ${player instanceof Mob}`);
        // console.log(`${serverLevel.getPersistentData().toString()}`)
        console.log(`Typeof ${$Factions.GAIA instanceof $Faction}`);
        
    }
})
/**@type {$Faction} */
let sourcefaction;
/**@type {$Faction} */
let targetfaction;
ItemEvents.entityInteracted(event => {
    /**
     * @type {Internal.Mob}
     */
    let mobEntity = event.target;
    if (!mobEntity instanceof Mob || event.hand != "main_hand") return;
    if (!sourcefaction) {
        event.player.tell("源派系已保存")
        sourcefaction = $FactionEntityHelper.getFactionEntity(mobEntity).getFaction();
    } else if (!targetfaction) {
        event.player.tell("目标派系已保存")
        targetfaction = $FactionEntityHelper.getFactionEntity(mobEntity).getFaction();
    } else {
        event.player.tell("输出结果")
        event.player.tell(sourcefaction.isEnemyOf(targetfaction));
        sourcefaction = undefined;
        targetfaction = undefined;
    }
    
})