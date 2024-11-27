// priority: 10000

/**
 * @class
 * @classdesc
 * @template T
 */
function $Registry() {
    /**
     * @description 已初始化？
     * @type {boolean}
     */
    this.initialized = false;
    /**
     * @description 注册表名称
     * @type {ResourceLocation}
     */
    this.name;
    /**
     * @description 存放未初始化的注册项
     * @type {Map<string, () => T>}
     */
    this.supplierObject = new Map();
    /**
     * @description 通过Key获取Value
     * @type {Map<string, T>}
     */
    this.byKey = new Map();
    /**
     * @description 通过Value获取Key
     * @type {Map<T, string>}
     */
    this.byValue = new Map();
}

/**
 * @description 注册
 * @param {ResourceLocation} name 
 * @param {() => T} supplierValue 
 * @returns {$RegistryObject<T>}
 */
$Registry.prototype.registry = function (name, supplierValue) {
    this.supplierObject.set(String(name), supplierValue);
    return new $RegistryObject(name, this.name);
}

/**
 * @description 获取注册项
 * @param {ResourceLocation} name
 * @returns {T | undefined}
 */
$Registry.prototype.get = function (name) {
    let value;
    if (this.initialized) {
        value = this.byKey.get(String(name));
    } else {
        console.error(`注册表${this.name}尚未初始化`);
    }
    return value;
}

/**
 * @description 获取注册名
 * @param {T} value 
 * @returns {ResourceLocation | undefined}
 */
$Registry.prototype.getKey = function (value) {
    let key;
    if (this.initialized) {
        key = this.byValue.get(value);
        if (key) {
            key = new ResourceLocation(key);
        }
    } else {
        console.error(`注册表${this.name}尚未初始化`);
    }
    return key;
}