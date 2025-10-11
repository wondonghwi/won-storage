### React `useSyncExternalStore`를 활용한 실시간 리렌더링되는 스토리지 관리 훅 라이브러리

[![npm version](https://img.shields.io/npm/v/won-storage.svg)](https://www.npmjs.com/package/won-storage)

## 주요 특징

- ⚛️ **React 18/19 지원**: `useSyncExternalStore`를 사용하여 동시 렌더링(Concurrent Rendering)과 SSR을 지원
- 🔄 **자동 동기화**: localStorage/sessionStorage 값이 변경되면 자동으로 리렌더링
- 🪟 **크로스탭 동기화**: 다른 탭/윈도우의 변경사항을 자동으로 반영
- 🎯 **선택적 구독**: 값만 읽기, setter만 사용, remove만 사용 등 필요에 따라 선택
- 🔒 **TypeScript 완벽 지원**: 엄격한 타입 안전성으로 런타임 에러 방지
- 📦 **ESM/CJS 지원**: 모든 빌드 도구와 호환

## 설치

```bash
# npm
npm install won-storage

# pnpm
pnpm add won-storage

# yarn
yarn add won-storage
```

## 최소 요구 사항

- **React >= 18.0.0**
- **Node.js >= 20.19.0**

## 빠른 시작

### 가장 단순한 카운터

```tsx
import { useStorage } from 'won-storage';

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

### sessionStorage 사용

```tsx
const [token, setToken] = useStorage('token', null, {
  storageType: 'session',
});
```

### 값만 읽기 / setter만 사용 / 값 삭제

```tsx
import { useStorageValue, useSetStorage, useRemoveStorage } from 'won-storage';

const theme = useStorageValue('theme', ''); // 변경 시 자동 리렌더링
const setTheme = useSetStorage('theme', 'light'); // 구독 없이 setter만
const clearTheme = useRemoveStorage('theme'); // 값 제거
```

## API

### `useStorage<T>(key, defaultValue, options?)`

localStorage/sessionStorage를 useState처럼 사용하는 메인 훅입니다.

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

`won-storage`는 React 18/19의 `useSyncExternalStore`를 사용하여 다음을 보장합니다:

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
