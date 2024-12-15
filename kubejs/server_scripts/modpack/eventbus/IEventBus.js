/**
 * @typedef $IEventBus
 * @property {<T extends Function>(eventType: T, callback: (event: InstanceType<T>) => void) => void} addListener
 * @property {<T extends $Event>(event: T) => void} post
 */