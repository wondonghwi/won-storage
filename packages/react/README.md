# @won-storage/react

Storage management library with framework-agnostic core and React bindings.

[![npm version](https://img.shields.io/npm/v/%40won-storage%2Freact.svg)](https://www.npmjs.com/package/@won-storage/react)
[![npm version](https://img.shields.io/npm/v/%40won-storage%2Fcore.svg)](https://www.npmjs.com/package/@won-storage/core)

## 주요 특징

- 🎯 **프레임워크 독립적**: Core 패키지는 React 없이도 사용 가능
- ⚛️ **React 18/19 지원**: `useSyncExternalStore`를 사용하여 동시 렌더링(Concurrent Rendering)과 SSR을 지원
- 🔄 **자동 동기화**: localStorage/sessionStorage 값이 변경되면 자동으로 리렌더링
- 🪟 **크로스탭 동기화**: 다른 탭/윈도우의 변경사항을 자동으로 반영
- 🎯 **선택적 구독**: 값만 읽기, setter만 사용, remove만 사용 등 필요에 따라 선택
- 🔒 **TypeScript 완벽 지원**: 엄격한 타입 안전성으로 런타임 에러 방지
- 📦 **ESM/CJS 지원**: 모든 빌드 도구와 호환

## 패키지

이 프로젝트는 monorepo로 구성되어 있으며, 두 가지 패키지를 제공합니다:

- **`@won-storage/react`**: React hooks를 위한 패키지
- **`@won-storage/core`**: 프레임워크 독립적인 core 로직

## 설치

### React 사용자

```bash
# npm
npm install @won-storage/react

# pnpm
pnpm add @won-storage/react

# yarn
yarn add @won-storage/react
```

### Vanilla JS / 다른 프레임워크

```bash
# npm
npm install @won-storage/core

# pnpm
pnpm add @won-storage/core

# yarn
yarn add @won-storage/core
```

## 최소 요구 사항

- **React >= 18.0.0**
- **Node.js >= 20.19.0**

## 빠른 시작

### React: 가장 단순한 카운터

```tsx
import { useStorage } from '@won-storage/react';

export function Counter() {
  const [count, setCount] = useStorage('count', 0);

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(prev => prev + 1)}>+1</button>
      <button onClick={() => setCount(0)}>reset</button>
    </div>
  );
}
```

### Vanilla JS: Core 패키지 사용

```typescript
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

// 현재 값 가져오기
const rawValue = getSnapshot(storage, key);
const count = rawValue ? defaultDeserializer(rawValue) : 0;

// 값 변경 구독
const unsubscribe = subscribe(storage, key, () => {
  const newRawValue = getSnapshot(storage, key);
  const newCount = newRawValue ? defaultDeserializer(newRawValue) : 0;
  console.log('Count changed:', newCount);
});

// 값 설정
setStorageItem(storage, key, defaultSerializer(42));

// 구독 해제
unsubscribe();
```

### sessionStorage 사용

```tsx
const [token, setToken] = useStorage('token', null, {
  storageType: 'session',
});
```

### 값만 읽기 / setter만 사용 / 값 삭제

```tsx
import { useStorageValue, useSetStorage, useRemoveStorage } from '@won-storage/react';

const theme = useStorageValue('theme', ''); // 변경 시 자동 리렌더링
const setTheme = useSetStorage('theme', 'light'); // 구독 없이 setter만
const clearTheme = useRemoveStorage('theme'); // 값 제거
```

## API

### `useStorage<T>(key, defaultValue, options?)`

localStorage/sessionStorage를 useState처럼 사용하는 메인 훅입니다.
값을 삭제하려면 `useRemoveStorage`를 사용하세요. `setValue(null)`처럼 `null`이나 `undefined`를 넘기면 해당 값이 그대로 저장됩니다.

**Parameters:**

- `key` (string): 스토리지 키
- `defaultValue` (T): 기본값 (스토리지에 값이 없을 때 사용)
- `options` (object, optional):
  - `storageType` ('local' | 'session'): 스토리지 타입 (기본값: 'local')
  - `serializer` (function): 커스텀 직렬화 함수 (기본값: JSON.stringify)
  - `deserializer` (function): 커스텀 역직렬화 함수 (기본값: JSON.parse)

**Returns:** `[T, (value: T | ((prev: T) => T)) => void]`

**Example:**

```tsx
const [user, setUser] = useStorage('user', { name: 'Alice', age: 25 });

// 직접 값 설정
setUser({ name: 'Bob', age: 30 });

// 함수형 업데이트
setUser(prev => ({ ...prev, age: prev.age + 1 }));
```

---

### `useStorageValue<T>(key, defaultValue, options?)`

값만 읽기 전용으로 사용하는 훅입니다. 스토리지 값이 변경되면 자동으로 리렌더링됩니다.  
`defaultValue`를 필수로 받는 이유는 React가 초기 렌더에서 사용할 안전한 기본값을 보장하고, TypeScript가 반환 타입을 `T`로 확정해 추가적인 null/undefined 처리를 강제하지 않도록 하기 위함입니다.

**Returns:** `T`

**Example:**

```tsx
const theme = useStorageValue('theme', 'light');
```

---

### `useSetStorage<T>(key, defaultValue, options?)`

setter 함수만 반환하는 훅입니다. 값을 구독하지 않으므로 리렌더링이 발생하지 않습니다.
값 제거는 `useRemoveStorage`로 처리하세요.

**Returns:** `(value: T | ((prev: T) => T)) => void`

**Example:**

```tsx
const setConfig = useSetStorage('config', { mode: 'auto' });
setConfig({ mode: 'manual' });
```

---

### `useRemoveStorage(key, storageType?)`

스토리지에서 값을 삭제하는 함수만 반환하는 훅입니다.

**Returns:** `() => void`

**Example:**

```tsx
const removeCache = useRemoveStorage('cache-data');
removeCache(); // 스토리지에서 삭제
```

## React 18/19 동시 렌더링 지원

`@won-storage/react`는 React 18/19의 `useSyncExternalStore`를 사용하여 다음을 보장합니다:

1. **Tearing 방지**: 동시 렌더링 중에도 모든 컴포넌트가 일관된 값을 보도록 보장
2. **SSR 안전**: `getServerSnapshot`을 통해 hydration mismatch 방지
3. **자동 배칭**: React 18의 자동 배칭과 호환

### 선택적 구독으로 불필요한 리렌더링 방지

```tsx
// ❌ 나쁜 예: 값을 읽지 않는데 useStorage 사용
function BadExample() {
  const [theme, setTheme] = useStorage('theme', 'light');
  // theme 값을 사용하지 않지만, 변경 시 리렌더링 발생
  return <button onClick={() => setTheme('dark')}>다크 모드</button>;
}

// ✅ 좋은 예: useSetStorage 사용
function GoodExample() {
  const setTheme = useSetStorage('theme', 'light');
  // theme 변경 시 리렌더링 안 됨!
  return <button onClick={() => setTheme('dark')}>다크 모드</button>;
}
```

## 라이선스

MIT © [wondonghwi](https://github.com/wondonghwi)
