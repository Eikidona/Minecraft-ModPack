// priority: 1000

/**
 * @class
 * 
 * @param {$FactionRelationsLiteral[]} [relations=[]]
 */
function $FactionRelations(relations) {
  /**
   * @description 关系
   * @type {Map<string, $FactionRelation>}
   */
  this.relations = new Map();

  this.defineRelations(relations ?? []);
}

/**
 * @description 定义关系
 * @private
 * @param {$FactionRelationsLiteral[]} relations
 */
$FactionRelations.prototype.defineRelations = function (relations) {
  relations.forEach(relation => {
    let relationInstance = new $FactionRelation(relation.faction, relation.relation)
    this.relations.set(relationInstance.getTargetFaction(), relationInstance);
  })
}

/**
 * @description
 * @param {$IFaction} faction
 * @returns {boolean}
 */
$FactionRelations.prototype.isEnemy = function (faction) {
  let result;
  let relation = this.relations.get(faction.getEncodeId());

  if (relation) {
    result = relation.isEnemy();
  } else {
    this.relations.set(faction.getEncodeId(), new $FactionRelation(faction.getEncodeId(), $FactionRelation.NATURAL));
    result = false;
  }

  return result;
}

/**
 * @description
 * @param {$IFaction} faction
 * @returns {boolean}
 */
$FactionRelations.prototype.isAlly = function (faction) {
  let result;
  let relation = this.relations.get(faction.getEncodeId());

  if (relation) {
    result = relation.isAlly();
  } else {
    this.relations.set(faction.getEncodeId(), new $FactionRelation(faction.getEncodeId(), $FactionRelation.NATURAL));
    result = false;
  }

  return result;
}
