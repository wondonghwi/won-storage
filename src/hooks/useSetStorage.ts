import type { UseStorageOptions, SetStateAction } from '../types';
import { useStorage } from './useStorage';

/**
 * useSetStorage
 *
 * setter 함수만 반환하는 훅입니다.
 *
 * @param key - 스토리지 키
 * @param defaultValue - 기본값 (함수형 업데이트 시 사용)
 * @param options - 옵션
 *
 */
export function useSetStorage<T>(
  key: string,
  defaultValue: T,
  options: UseStorageOptions<T> = {}
): (value: SetStateAction<T>) => void {
  const [, setValue] = useStorage(key, defaultValue, options);
  return setValue;
}
