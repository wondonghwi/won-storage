import { useSyncExternalStore, useCallback } from 'react';
import type { UseStorageOptions, SetStateAction } from '../types';
import { defaultSerializer, defaultDeserializer } from '../utils/serializer';
import {
  subscribe,
  getSnapshot,
  setStorageItem,
  removeStorageItem,
} from '../utils/storageSubscriber';

/**
 * useStorage
 *
 * localStorage/sessionStorage를 useState처럼 사용하는 훅입니다.
 *
 * 핵심 기능:
 * - 스토리지 값이 변경되면 자동 리렌더링
 * - 다른 탭/윈도우 변경사항 자동 동기화
 * - SSR 안전 (hydration mismatch 방지)
 *
 * @param key - 스토리지 키
 * @param defaultValue - 기본값 (스토리지에 값이 없을 때 사용)
 * @param options - 옵션 (storageType, serializer 등)
 *
 */
export function useStorage<T>(
  key: string,
  defaultValue: T,
  options: UseStorageOptions<T> = {}
): [T, (value: SetStateAction<T>) => void] {
  const {
    storageType = 'local',
    serializer = defaultSerializer,
    deserializer = defaultDeserializer,
  } = options;

  // 브라우저 환경에서만 storage 사용
  const storage =
    typeof window !== 'undefined'
      ? storageType === 'session'
        ? window.sessionStorage
        : window.localStorage
      : null;

  /**
   * useSyncExternalStore 사용
   *
   * 외부 스토어(여기서는 Web Storage)를 구독합니다.
   *
   */
  const rawValue = useSyncExternalStore(
    // === 1. subscribe 함수 ===
    useCallback(
      onStoreChange => {
        if (!storage) return () => {};
        return subscribe(storage, key, onStoreChange);
      },
      [storage, key]
    ),

    // === 2. getSnapshot 함수 ===
    () => {
      if (!storage) return null;
      return getSnapshot(storage, key);
    },

    // === 3. getServerSnapshot 함수 (SSR) ===
    () => null
  );

  const parseValue = (raw: string | null): T => {
    if (raw === null) return defaultValue;
    try {
      return deserializer(raw);
    } catch {
      return defaultValue;
    }
  };

  const value: T = parseValue(rawValue);

  const setValue = useCallback(
    (valueOrUpdater: SetStateAction<T>) => {
      if (!storage) return;

      try {
        // 함수형 업데이트 지원
        const newValue =
          typeof valueOrUpdater === 'function'
            ? (valueOrUpdater as (prev: T) => T)(value)
            : valueOrUpdater;

        // null이나 undefined면 스토리지에서 삭제
        if (newValue === null || newValue === undefined) {
          removeStorageItem(storage, key);
        } else {
          const serialized = serializer(newValue);
          setStorageItem(storage, key, serialized);
        }
      } catch (error) {
        console.error(`[won-storage] Failed to set value for key "${key}":`, error);
      }
    },
    [storage, key, value, serializer]
  );

  return [value, setValue];
}
