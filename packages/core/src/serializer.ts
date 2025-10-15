/**
 * 기본 직렬화 함수: 값을 JSON 문자열로 변환
 *
 * 에러 처리:
 * - 순환 참조: Error 발생
 * - BigInt: Error 발생
 * - undefined, Symbol, Function: JSON.stringify가 자동으로 제외 (JSON 스펙)
 */
export const defaultSerializer = <T>(value: T): string => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    if (error instanceof Error) {
      // 순환 참조 에러
      if (error.message.includes('circular')) {
        throw new Error(
          `[won-storage] Cannot serialize value with circular reference. Use a custom serializer to handle circular structures.`
        );
      }
      // BigInt 에러
      if (error.message.includes('BigInt')) {
        throw new Error(
          `[won-storage] Cannot serialize BigInt. Use a custom serializer (e.g., (value) => value.toString()).`
        );
      }
    }
    throw error;
  }
};

/**
 * 기본 역직렬화 함수: JSON 문자열을 값으로 변환
 *
 * 에러 처리:
 * - 잘못된 JSON: Error 발생
 * - 빈 문자열, undefined, NaN 등: Error 발생
 */
export const defaultDeserializer = <T>(value: string): T => {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(
      `[won-storage] Failed to parse stored value. The value might be corrupted. Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
