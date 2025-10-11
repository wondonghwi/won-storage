import { useCallback } from 'react';
import type { StorageType } from '../types';
import { useStorage } from './useStorage';

/**
 * useRemoveStorage
 *
 * 스토리지에서 값을 삭제하는 함수만 반환하는 훅입니다.
 * setValue(null)을 호출하여 삭제를 수행합니다.
 *
 * @param key - 스토리지 키
 * @param storageType - 스토리지 타입 (기본값: 'local')
 *
 */
export function useRemoveStorage(key: string, storageType: StorageType = 'local'): () => void {
  const [, setValue] = useStorage<null>(key, null, { storageType });

  const remove = useCallback(() => {
    setValue(null);
  }, [setValue]);

  return remove;
}
