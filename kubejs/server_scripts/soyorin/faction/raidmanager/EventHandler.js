LevelEvents.tick(event => {
    let raidManager = $RaidManagerHelper.getRaidManager(event.level);
    raidManager.tick();
})