// priority: 1000
/**
 * @class
 */
function $Factions() {

}

/**@type {Map<string, $Faction>} */
$Factions.FACTION_DATA = new Map();

$Factions.GAIA = $Factions.register(new $Faction(new ResourceLocation("faction:gaia"), $FactionRelations.DEFAULT));

/**
 * @description 注册
 * @param {$Faction} faction 
 * @returns {$Faction}
 */
$Factions.register = function (faction) {
    this.FACTION_DATA.set(String(faction.getName()), faction);
    return faction;
}

/**
 * @description 根据name获取Faction实例
 * @param {ResourceLocation} name 
 */
$Factions.getFaction = function (name) {
    return this.FACTION_DATA.get(String(name)) ?? this.GAIA;
}

/**
 * @description 序列化
 * @returns {Internal.CompoundTag} compoundTag 
 */
$Factions.serializeNBT = function () {
    let compoundTag = new CompoundTag();
    let factionsListTag = new ListTag();
    this.FACTION_DATA.forEach(faction => {
        factionsListTag.add(faction.serializeNBT())
    })
    compoundTag.put("Factions", factionsListTag);

    // /**
    //  * debug
    //  */
    // console.log(`Factions serializeNBT: ${compoundTag.toString()}`);

    return compoundTag;
}

/**
 * @description 反序列化
 * @param {Internal.CompoundTag} compoundTag 
 */
$Factions.deserializeNBT = function (compoundTag) {
    if (compoundTag.contains("Factions")) {
        compoundTag.getList("Factions", 10).forEach(factionNBT => {
            let faction = new $Faction();
            faction.deserializeNBT(factionNBT);
            this.FACTION_DATA.set(String(faction.getName()), faction);
        })
    }
}

/**
 * @description 保存至Server Persistent Data
 * @param {Internal.MinecraftServer} server 
 */
$Factions.save = function (server) {
    let data = server.getPersistentData();
    let nbt = this.serializeNBT();

    // /**
    //  * debug
    //  */
    // console.log(`save: ${nbt.toString()}`);

    data.merge(nbt);

    // /**
    //  * debug
    //  */
    // console.log(`save merge: ${data.toString()}`);
}
/**
 * @description 从Server Persistent Data加载数据
 * @param {Internal.MinecraftServer} server  
 */
$Factions.load = function (server) {
    let data = server.getPersistentData();
    this.deserializeNBT(data);
}