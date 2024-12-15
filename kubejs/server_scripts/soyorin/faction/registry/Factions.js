/**
 * @class
 */
function $Factions() { }

/**
 * @static
 * @type {$Registry<$IFaction>}
 */
$Factions.REGISTRY = $RegistryHelper.createRegistry("modpack:faction");

/**
 * @description 注册派系
 * @static
 * @param {ResourceLocation} name
 * @param {$IFaction} faction
 * @returns {$IFaction}
 */
$Factions.register = function (name, faction) {
  this.REGISTRY.register(name, faction);
  return faction;
}

/**
 * @description 获取派系
 * @static
 * @param {ResourceLocation} name 
 * @returns {$IFaction}
 */
$Factions.getFaction = function (name) {
  return this.REGISTRY.get(name) ?? this.NONE;
}

/**
 * @description 获取派系注册名
 * @static
 * @param {$IFaction} faction 
 * @returns {ResourceLocation}
 */
$Factions.getFactionName = function (name) {
  return this.REGISTRY.getKey(name) ?? this.NONE_NAME;
}

$Factions.NONE_NAME = new ResourceLocation("faction:none");
/**
 * @description 默认 无阵营
 * @static
 */
$Factions.NONE = $Factions.register($Factions.NONE_NAME, new $Faction([], [], []));