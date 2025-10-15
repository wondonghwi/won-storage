# @won-storage/core

프레임워크에 구애받지 않는 스토리지 상태 관리 코어입니다. `localStorage`와 `sessionStorage`를 대상으로 안전한 직렬화/역직렬화, 구독 기반 동기화, 커스텀 직렬화기를 제공합니다.

[![npm version](https://img.shields.io/npm/v/%40won-storage%2Fcore.svg)](https://www.npmjs.com/package/@won-storage/core)

## 설치

```bash
# npm
npm install @won-storage/core

# pnpm
pnpm add @won-storage/core

# yarn
yarn add @won-storage/core
```

## 사용 예시

```ts
import {
  getStorage,
  subscribe,
  getSnapshot,
  setStorageItem,
  defaultSerializer,
  defaultDeserializer,
} from '@won-storage/core';

const storage = getStorage('local');
const key = 'count';

// 현재 값 읽기
const rawValue = getSnapshot(storage, key);
const count = rawValue ? defaultDeserializer(rawValue) : 0;

// 값 변경 구독
const unsubscribe = subscribe(storage, key, () => {
  const newRawValue = getSnapshot(storage, key);
  const newCount = newRawValue ? defaultDeserializer(newRawValue) : 0;
  console.log('Count changed:', newCount);
});

// 값 업데이트
setStorageItem(storage, key, defaultSerializer(count + 1));

// 구독 해제
unsubscribe();
```

## 함께 보기

- [`@won-storage/react`](https://www.npmjs.com/package/@won-storage/react) – React용 훅 컬렉션
- [GitHub 저장소](https://github.com/wondonghwi/won-storage)

