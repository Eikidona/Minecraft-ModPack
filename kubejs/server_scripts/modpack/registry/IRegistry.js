/**
 * @typedef $IRegistry
 * @property {(name: string) => T | undefined} get
 * @property {(entry: T) => string | undefined} getKey
 * @property {(name: string, entry: T) => T} register
 * @property {(value: T) => boolean} hasValue
 * @property {(key: ResourceLocation) => boolean} hasKey
 */