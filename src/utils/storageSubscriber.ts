import type { StorageListener, Unsubscribe } from '../types';

const listenersMap = new Map<Storage, Map<string, Set<StorageListener>>>();

const storageEventListenerRegistered = new Map<Storage, boolean>();

// 등록된 리스너들에게 key 변경 사실을 전달
const notifyListeners = (storage: Storage, key: string) => {
  const storageListeners = listenersMap.get(storage);
  if (!storageListeners) return;

  const keyListeners = storageListeners.get(key);
  if (!keyListeners) return;

  keyListeners.forEach(listener => listener());
};

// 다른 탭에서 storage가 바뀌었을 때 notifyListeners 실행
const setupStorageEventListener = (storage: Storage) => {
  if (typeof window === 'undefined') return;
  if (storageEventListenerRegistered.get(storage)) return;

  const listener = (event: StorageEvent) => {
    if (event.storageArea === storage && event.key) {
      notifyListeners(storage, event.key);
    }
  };

  window.addEventListener('storage', listener);
  storageEventListenerRegistered.set(storage, true);
};

/**
 * 특정 키의 변경을 구독합니다
 *
 * useSyncExternalStore의 subscribe 함수로 사용됩니다.
 */
export const subscribe = (
  storage: Storage,
  key: string,
  listener: StorageListener
): Unsubscribe => {
  if (!listenersMap.has(storage)) {
    listenersMap.set(storage, new Map());
  }

  const storageListeners = listenersMap.get(storage)!;

  if (!storageListeners.has(key)) {
    storageListeners.set(key, new Set());
  }

  const keyListeners = storageListeners.get(key)!;
  keyListeners.add(listener);

  setupStorageEventListener(storage);

  return () => {
    keyListeners.delete(listener);
    if (keyListeners.size === 0) {
      storageListeners.delete(key);
    }
  };
};

/**
 * 현재 스냅샷 가져오기
 *
 * useSyncExternalStore의 getSnapshot 함수로 사용됩니다.
 *
 */
export const getSnapshot = (storage: Storage, key: string): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

/**
 * 스토리지에 값 설정
 */
export const setStorageItem = (storage: Storage, key: string, value: string) => {
  try {
    storage.setItem(key, value);
    notifyListeners(storage, key);
  } catch (error) {
    console.error(`[won-storage] Failed to set value for key "${key}":`, error);
    throw error;
  }
};

/**
 * 스토리지에서 값 삭제
 */
export const removeStorageItem = (storage: Storage, key: string) => {
  try {
    storage.removeItem(key);
    notifyListeners(storage, key);
  } catch (error) {
    console.error(`[won-storage] Failed to remove value for key "${key}":`, error);
  }
};
