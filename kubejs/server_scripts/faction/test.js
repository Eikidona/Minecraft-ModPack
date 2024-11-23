PlayerEvents.chat(event => {
    /**@type {Internal.ServerPlayer} */
    let serverPlayer = event.player;
    /**@type {Internal.ServerLevel} */
    let serverLevel = event.level;

    if (event.message == "f") {
        serverPlayer.tell("已输出调试数据");
        console.log(`${serverLevel.getPersistentData().toString()}`)
    }
})