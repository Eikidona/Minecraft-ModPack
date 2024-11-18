// // 新建了注册表
// $ModpackEvents.newRegistry(event => {
//   event.create().setRegistryName('modpack:test').setDefaultKey('modpack:default').setDefaultValue(() => '测试值');
// })

// PlayerEvents.chat(event => {
//   let registry = $RegistryManager.getRegistry(new ResourceLocation('modpack:test'));
//   registry.ifPresentOrElse(
//     r => {
//       event.player.tell(`注册表有效`);
//       event.player.tell(`类型判断 ${r instanceof $Registry} ${r.get(new ResourceLocation('modpack:default')).get()}`);
//     },
//     () => {
//       event.player.tell(`注册表无效`)
//     }
//   )
//   // let value = registry.get().get(new ResourceLocation('modpack:empty')).get();

// })

// function $Test(name) {
//   this.name = name;
// }
// function $SubTest(name) {
//   this.name = name;
// }
// $SubTest.prototype = Object.create($Test.prototype);

// /**@type {Map<function, Object>} */
// let map = new Map();
// // 模拟添加事件监听器 不使用字符串
// map.set($Test.prototype, (obj, player) => player.tell(`Name ${obj.name}`));
// PlayerEvents.chat(event => {
//   /**@type {Internal.ServerPlayer} */
//   let serverPlayer = event.player;
//   let test = new $Test('name');
//   // 模拟发布事件
//   // map.get(Object.getPrototypeOf(test))(test, serverPlayer)
//   map.get(Object.getPrototypeOf(test))(new $Test('name'), serverPlayer);
//   // serverPlayer.tell(`${Object.getPrototypeOf(test) == $Test.prototype}`)
//   // serverPlayer.tell(`类 ${typeof $Test} 实例 ${typeof new $Test('name')}`);
// });