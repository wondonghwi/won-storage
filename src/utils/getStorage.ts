import type { StorageType } from '../types';

export const getStorage = (storageType: StorageType): Storage | null => {
  if (typeof window === 'undefined') return null;

  return storageType === 'session' ? window.sessionStorage : window.localStorage;
};
