// priority: 10000
const TagKeyUtil = {
  /**
   * 创建实体类型TagKey
   * @param {string} name
   */
  createEntityType: function (name) {
    return TagKey.create(Registries.ENTITY_TYPE, new ResourceLocation(name));
  }
}

const TagUtil = {
  tagKey: {
    entityType: {
      /**
       * 创建TagKey<EntityType<?>>
       * @param {string} name 
       * @returns {Internal.TagKey<Internal.EntityType<?>>} 
       */
      create: function (name) {
        return TagKey.create(Registries.ENTITY_TYPE, new ResourceLocation(name));
      }
    }
  },
  tags: {
    entityType: {
      /**
       * 获取指定标签下的实体id
       * @param {string} name 
       * @returns {Special.EntityType[]}
       */
      getEntities: function (name) {
        let entities = [];
        /**
         * @type {Internal.ForgeRegistryTagManager}
         */
        let tagManager = ForgeRegistries.ENTITY_TYPES.tags();
        /**
         * @type {Internal.ForgeRegistryTag<Internal.EntityType<>>}
         */
        let registryTag = tagManager.getTag(TagKeyUtil.createEntityType(name));
        registryTag.forEach(entityType => entities.push(String(EntityType.getKey(entityType))));
        return entities;
      }
    }
  }

}