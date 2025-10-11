/**
 * 스토리지 타입
 * - 'local': localStorage 사용 (기본값)
 * - 'session': sessionStorage 사용
 */
export type StorageType = 'local' | 'session';

/**
 * useStorage 훅 옵션
 */
export interface UseStorageOptions<T> {
  /**
   * 사용할 스토리지 타입
   * @default 'local'
   */
  storageType?: StorageType;

  /**
   * 커스텀 직렬화 함수 (값 -> 문자열)
   * @default JSON.stringify
   */
  serializer?: (value: T) => string;

  /**
   * 커스텀 역직렬화 함수 (문자열 -> 값)
   * @default JSON.parse
   */
  deserializer?: (value: string) => T;
}

/**
 * 스토리지 변경 리스너 함수
 */
export type StorageListener = () => void;

/**
 * 구독 해제 함수
 */
export type Unsubscribe = () => void;
