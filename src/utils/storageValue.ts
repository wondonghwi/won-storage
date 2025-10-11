export const getStorageValue = <T>(
  storage: Storage,
  key: string,
  defaultValue: T,
  deserializer: (value: string) => T
): T => {
  try {
    const item = storage.getItem(key);
    if (item === null) return defaultValue;
    return deserializer(item);
  } catch (error) {
    console.warn(`[won-storage] Failed to parse storage value for key "${key}":`, error);
    return defaultValue;
  }
};

export const setStorageValue = <T>(
  storage: Storage,
  key: string,
  value: T,
  serializer: (value: T) => string
): void => {
  try {
    storage.setItem(key, serializer(value));
  } catch (error) {
    console.error(`[won-storage] Failed to set storage value for key "${key}":`, error);
  }
};

export const removeStorageValue = (storage: Storage, key: string): void => {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(`[won-storage] Failed to remove storage value for key "${key}":`, error);
  }
};
