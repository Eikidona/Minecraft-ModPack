// priority: 5000
/**
 * @class
 */
function $Registries() {

}

/**
 * @description PersistentData注册表
 * @static
 * @type {$Registry<() => $IPersistentData>}
 */
$Registries.PERSISTENT_DATA = $RegistryHelper.createRegistry("modpack:persistent_data");