/**
 * @class
 */
function $FactionEntityTypes() {
    
}

/**
 * @description
 * @type {Map<string, $FactionEntityType>}
 */
$FactionEntityTypes.FACTION_ENTITY_TYPE_DATA = new Map();

$FactionEntityTypes.NONE = $FactionEntityTypes.register(new $FactionEntityType("none", 5));

/**
 * @description 获取FactionEntityType
 * @param {ResourceLocation} name
 * @returns {$FactionEntityType}
 */
$FactionEntityTypes.getFactionEntityType = function (name) {
    return this.FACTION_ENTITY_TYPE_DATA.get(String(name));
}
/**
 * @description 注册
 * @param {$FactionEntityType} factionEntityType 
 * @returns {$FactionEntityType}
 */
$FactionEntityTypes.register = function (factionEntityType) {
    this.FACTION_ENTITY_TYPE_DATA.set(String(factionEntityType.getName()), factionEntityType);
    return factionEntityType;
}
