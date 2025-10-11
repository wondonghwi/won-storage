// won-storage 라이브러리 엔트리 파일
// 여기서 export한 것들이 사용자에게 노출됩니다

// 예시: 간단한 테스트용 export
export const VERSION = '0.1.0';

/**
 * 테스트용 함수: 두 숫자를 더합니다
 * @param a - 첫 번째 숫자
 * @param b - 두 번째 숫자
 * @returns 두 숫자의 합
 */
export function testTempAdd(a: number, b: number): number {
  console.log(`[won-storage] testTempAdd 호출됨: ${a} + ${b}`);
  return a + b;
}

// TODO: 실제 훅을 만들면 여기서 export
// export { useLocalStorage } from './hooks/useLocalStorage';
// export { useSessionStorage } from './hooks/useSessionStorage';
