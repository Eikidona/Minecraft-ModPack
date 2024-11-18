// priority: 1000
/**
 * @class 
 * @classdesc 
 */
function $FactionManager() { };

/**
 * @type {$DefaultRegistry<$Faction> | $Registry<$Faction>} 
 */
$FactionManager.FACIONS = $RegistryManager.createRegistry('modpack:faction', 'modpack:empty', new $Faction([], new $FactionRelation([], [])));
/**
 * @type {Map<string, string>} 
 */
$FactionManager.ENTITY_MAP_FACIONS = new Map();

/**
 * 注册
 * @param {string} name 
 * @param {$Faction} faction 
 */
$FactionManager.register = function (name, faction) {
  this.FACIONS.register(name, faction);

  faction.getEntities().forEach(entityId => {
    if (this.ENTITY_MAP_FACIONS.has(entityId)) {
      // 实体已有阵营
      console.warn(`${entityId} 已有阵营 ${this.ENTITY_MAP_FACIONS.get(entityId)}`)
    } else {
      // 设置实体id与阵营id映射
      this.ENTITY_MAP_FACIONS.set(entityId, String(this.FACIONS.getKey(faction)));
    }
  })
}

/**
 * 获取实体所在派系id 或返回默认派系id
 * @param {Internal.Mob} entity 
 */
$FactionManager.getEntityFactionId = function (entity) {
  return this.ENTITY_MAP_FACIONS.get(String(entity.type)) ?? 'modpack:empty';
}

/**
 * 获取实体所在派系
 * @param {Internal.Mob} entity 
 */
$FactionManager.getEntityFaction = function (entity) {
  return this.FACIONS.get(this.getEntityFactionId(entity));
}
/**
 * 实体是否敌对 检查目标实体所在派系是否为源实体所在派系的敌对派系
 * @param {Internal.Mob} sourceEntity 
 * @param {Internal.Mob} targetEntity  
 * @returns {boolean} 
 */
$FactionManager.isHostile = function (sourceEntity, targetEntity) {
  // let canAttack = false;
  // console.log(`sourceEntity ${String(sourceEntity.type)}`);
  // console.log(`targetEntity ${String(targetEntity.type)}`);
  let sourceFaction = this.getEntityFaction(sourceEntity);
  // console.log(`sourceFaction ${sourceFaction}`);
  let targetFactionId = this.getEntityFactionId(targetEntity);
  // console.log(`targetFactionId ${targetFactionId}`);
  let canAttack = sourceFaction.getFactionRelation().isEnemy(targetFactionId);
  // if (faction.isPresent()) {
  //   canAttack = faction.get().getFactionRelation().isEnemy(this.ENTITY_MAP_FACIONS.get(String(targetEntity.type)));
  // }
  return canAttack;
}

global.$FactionManager = $FactionManager;