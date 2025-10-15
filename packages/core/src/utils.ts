import type { StorageType } from './types';

/**
 * 빈 함수 (no operation)
 * - 구독 해제 함수가 필요 없을 때 반환
 */
export const noop = () => {};

/**
 * 스토리지 객체 가져오기
 * - 서버 환경이거나 스토리지를 사용할 수 없으면 null 반환
 *
 * @param type - 스토리지 타입 ('local' | 'session')
 * @returns Storage 객체 또는 null
 */
export const getStorage = (type: StorageType): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage;
    // 스토리지 접근 가능한지 테스트
    const testKey = '__won_storage_test__';
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return storage;
  } catch {
    return null;
  }
};
