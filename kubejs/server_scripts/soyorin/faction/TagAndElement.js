/**
 * @class
 * @classdesc 容器
 */
function $TagAndElement() {
  /**
   * @type {Set<Internal.TagKey<T>>} 
   */
  this.tags = new Set();
  /**
   * @type {Set<T>} 
   */
  this.elements = new Set();
}
/**
 * ITag 持有TagKey
 */
PlayerEvents.chat(event => {
  let entityTypeArr = [];
  /**@type {Internal.ForgeRegistryTagManager} */
  let tagManager = ForgeRegistries.ENTITY_TYPES.tags();
  /**
   * @type {Internal.ForgeRegistryTag<Internal.EntityType<>>}
   */
  let registryTag = tagManager.getTag(TagUtil.tagKey.entityType.create('skeleton'));

  registryTag.forEach(entityType => entityTypeArr.push(String(EntityType.getKey(entityType))))
  // tagManager.stream().forEach(entityType => entityTypes.push(String(EntityType.getKey(entityType))));



  console.log(`${entityTypeArr}`);

  // ForgeRegistries.ENTITY_TYPES.tags().forEach(s => {
  //   /**
  //    * @type {Internal.ForgeRegistryTag<Internal.EntityType<T>>}
  //    */
  //   let tag = s;
  //   let tagLocation = tag.getKey().location();
  //   console.log(`标签 ${tagLocation}`);
  //   tag.stream().toList().forEach(entityType => {
  //     console.log(EntityType.getKey(entityType))
  //   })

  //   // console.log( `Registry ${s.getKey().registry()}, Location ${s.getKey().location()}, Key ${s.getKey()}, ITag ${s}`)
  // })
})


