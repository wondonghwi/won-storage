import type { UseStorageOptions } from '../types';
import { useStorage } from './useStorage';

/**
 * useStorageValue
 *
 * 스토리지 값만 읽기 전용으로 사용하는 훅입니다.
 * 스토리지 값이 변경되면 자동으로 리렌더링됩니다 (구독함).
 *
 * @param key - 스토리지 키
 * @param defaultValue - 기본값
 * @param options - 옵션
 *
 */
export function useStorageValue<T>(
  key: string,
  defaultValue: T,
  options?: UseStorageOptions<T>
): T {
  const [value] = useStorage(key, defaultValue, options);
  return value;
}
