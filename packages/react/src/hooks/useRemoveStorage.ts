import { useCallback } from 'react';
import type { StorageType } from '@won-storage/core';
import { removeStorageItem, getStorage } from '@won-storage/core';

/**
 * useRemoveStorage
 *
 * 스토리지에서 값을 삭제하는 함수만 반환하는 훅입니다.
 *
 * @param key - 스토리지 키
 * @param storageType - 스토리지 타입 (기본값: 'local')
 * @returns 스토리지에서 키를 삭제하는 함수
 *
 */
export const useRemoveStorage = (key: string, storageType: StorageType = 'local'): (() => void) => {
  const storage = getStorage(storageType);

  const remove = useCallback(() => {
    if (!storage) return;
    removeStorageItem(storage, key);
  }, [storage, key]);

  return remove;
};
