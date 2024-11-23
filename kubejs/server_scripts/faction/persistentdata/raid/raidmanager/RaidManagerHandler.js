LevelEvents.loaded(event => {
    let raidManager = new $RaidManager(event.level);
    raidManager.load();
})

LevelEvents.unloaded(event => {
    let raidManager = $RaidManagerHelper.getRaidManager(event.level);
    raidManager.save();
})