import type { StorageOptions } from '@won-storage/core';
import { useStorage } from './useStorage';

/**
 * useStorageValue
 *
 * 스토리지 값만 읽기 전용으로 사용하는 훅입니다.
 *
 * 스토리지 값이 변경되면 자동으로 리렌더링됩니다.
 */
export const useStorageValue = <T>(
  key: string,
  defaultValue: T,
  options?: StorageOptions<T>
): T => {
  const [value] = useStorage(key, defaultValue, options);
  return value;
};
