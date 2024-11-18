// priority: 10000

/**
 * @class
 * @classdesc 某种意义上的主类 其实也不是
 */
function Modpack() {

}

Modpack.static = {
  ID: 'modpack',
  /**
   * 尝试以ID为namespace构造资源位置 无比重要 海量引用 删必崩
   * @param {string} path 
   */
  createLocation: function (path) {
    /**@type {ResourceLocation} */
    let resourceLocation;
    console.log(`调试输出 ${String(path)}`)
    if (path.indexOf(':') != -1) {
      resourceLocation = new ResourceLocation(path);
    } else {
      resourceLocation = new ResourceLocation(Modpack.static.ID, path);
    }
    return resourceLocation;
  }
}