PlayerEvents.chat(event => {
    let raidManager = $RaidManagerHelper.getRaidManager(event.level);

    raidManager.createRaid([UNDEAD], new $PlayerRaidTarget(event.player, event.level));
    event.player.tell("尝试创建袭击...");

    // /**@type {Internal.ServerLevel} */
    // let serverLevel = event.level;

    // console.log(`${serverLevel.getPersistentData().toString()}`)
})