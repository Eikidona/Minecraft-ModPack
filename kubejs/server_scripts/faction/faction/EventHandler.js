/**
 * 将Factions数据保存在Server
 */
ServerEvents.loaded(event => {
    // console.log("调试消息: Server is loaded...")
    $Factions.load(event.getServer());
});

ServerEvents.unloaded(event => {
    // console.log("调试消息: Server is unloaded...")
    $Factions.save(event.getServer());
});

// LevelEvents.loaded("minecraft:overworld", event => {
//     console.log("调试消息: Level <minecraft:overworld> is loaded...")
// })

// LevelEvents.loaded("minecraft:overworld", event => {
//     console.log("调试消息: Level <minecraft:overworld> is loaded too...")
// })