# won-storage

> `useSyncExternalStore`로 구현한 React 스토리지 관리 훅 라이브러리

[![npm version](https://img.shields.io/npm/v/won-storage.svg)](https://www.npmjs.com/package/won-storage)
[![npm downloads](https://img.shields.io/npm/dm/won-storage.svg)](https://www.npmjs.com/package/won-storage)
[![license](https://img.shields.io/npm/l/won-storage.svg)](https://github.com/wondonghwi/won-storage/blob/main/LICENSE)

## 주요 특징
- 🚀 React 18+ 환경에서 안정적인 상태 동기화를 제공하는 `useSyncExternalStore` 기반 아키텍처
- 📦 ESM과 CommonJS 번들을 모두 제공해 어떤 빌드 도구에서도 손쉽게 사용 가능
- 🔒 TypeScript로 엄격하게 타입을 보장하여 런타임 오류를 사전에 예방
- 🪶 의존성 없는 경량 패키지라서 설치 속도가 빠르고 번들 크기가 작음
- ⚡ 스토리지 변경 사항을 빠르게 반영해 뛰어난 퍼포먼스를 제공

## 설치 방법
```bash
# npm
npm install won-storage

# pnpm
pnpm add won-storage

# yarn
yarn add won-storage
```

## 최소 요구 사항
- React >= 18.0.0
- Node.js >= 18.0.0

## 사용 예시
```typescript
import { testTempAdd, VERSION } from 'won-storage'

console.log(VERSION) // "0.1.0"
console.log(testTempAdd(10, 20)) // 30
```

## API 참고
### `VERSION`
현재 배포된 won-storage의 버전 정보입니다.

```typescript
const VERSION: string
```

### `testTempAdd(a, b)`
두 숫자를 더한 값을 반환하는 테스트용 함수입니다.

**매개변수**
- `a` (number): 첫 번째 숫자
- `b` (number): 두 번째 숫자

**반환값** `number` – `a`와 `b`의 합계

```typescript
function testTempAdd(a: number, b: number): number
```

## 곧 제공될 기능
- `useLocalStorage` – localStorage 전용 훅
- `useSessionStorage` – sessionStorage 전용 훅
- 기타 스토리지 유틸리티

## 라이선스
MIT © [wondonghwi](https://github.com/wondonghwi)

## 링크
- [GitHub 저장소](https://github.com/wondonghwi/won-storage)
- [npm 패키지](https://www.npmjs.com/package/won-storage)
- [이슈 트래커](https://github.com/wondonghwi/won-storage/issues)
