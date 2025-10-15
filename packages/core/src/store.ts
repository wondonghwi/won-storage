import type { StorageListener, Unsubscribe } from './types';

/**
 * 각 Storage별로 key -> 리스너 집합 맵핑
 */
const listenersMap = new Map<Storage, Map<string, Set<StorageListener>>>();

/**
 * Storage 이벤트 리스너 등록 여부 추적
 */
const storageEventListenerRegistered = new Map<Storage, boolean>();

/**
 * 특정 storage와 key에 등록된 모든 리스너 호출
 */
const notifyListeners = (storage: Storage, key: string) => {
  const storageListeners = listenersMap.get(storage);
  if (!storageListeners) return;

  const keyListeners = storageListeners.get(key);
  if (!keyListeners) return;

  keyListeners.forEach(listener => listener());
};

/**
 * Storage 이벤트 리스너 설정 (다른 탭/윈도우 동기화)
 * - 한 번만 등록됨
 */
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
 * 스토리지 변경 구독
 *
 * @param storage - Storage 객체 (localStorage 또는 sessionStorage)
 * @param key - 스토리지 키
 * @param listener - 변경 시 호출될 콜백
 * @returns 구독 해제 함수
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
 * 현재 스토리지 값 가져오기 (스냅샷)
 *
 * @param storage - Storage 객체
 * @param key - 스토리지 키
 * @returns 저장된 값 (문자열) 또는 null
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
 * 스토리지 값 설정
 * - 설정 후 리스너들에게 변경 알림
 *
 * @param storage - Storage 객체
 * @param key - 스토리지 키
 * @param value - 저장할 값 (문자열)
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
 * 스토리지 값 제거
 * - 제거 후 리스너들에게 변경 알림
 *
 * @param storage - Storage 객체
 * @param key - 스토리지 키
 */
export const removeStorageItem = (storage: Storage, key: string) => {
  try {
    storage.removeItem(key);
    notifyListeners(storage, key);
  } catch (error) {
    console.error(`[won-storage] Failed to remove value for key "${key}":`, error);
  }
};
