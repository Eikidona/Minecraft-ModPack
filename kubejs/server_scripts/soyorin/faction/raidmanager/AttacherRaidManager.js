/**
 * Save
 */
LevelEvents.loaded(event => {

    let raidManager = new $RaidManager(event.level);
    /**@type {Internal.CompoundTag} */
    let data = event.level.getPersistentData();
    data.merge(raidManager.serializeNBT());
})

LevelEvents.unloaded(event => {
    /**@type {Internal.CompoundTag} */
    let data = event.level.getPersistentData();
    data.merge($RaidManagerHelper.getRaidManager(event.level).serializeNBT());
})
