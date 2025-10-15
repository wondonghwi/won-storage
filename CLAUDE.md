# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

`won-storage`는 프레임워크 독립적인 스토리지 관리 라이브러리입니다. Monorepo 구조로 Core 패키지는 vanilla JavaScript로 동작하며, React 패키지(`@won-storage/react`)는 React 18+의 `useSyncExternalStore` API를 활용합니다. TypeScript로 작성되었으며 ESM과 CommonJS 번들을 모두 제공하여 다양한 빌드 도구와 호환됩니다.

## 프로젝트 구조 (Monorepo)

```
won-storage/
├── packages/
│   ├── core/                    # @won-storage/core (프레임워크 독립적)
│   │   ├── src/
│   │   │   ├── store.ts        # 스토리지 구독 시스템
│   │   │   ├── serializer.ts   # 직렬화/역직렬화
│   │   │   ├── utils.ts        # 유틸리티 함수
│   │   │   ├── types.ts        # 타입 정의
│   │   │   └── index.ts        # Core 엔트리 포인트
│   │   ├── dist/               # 빌드 출력
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── react/                   # @won-storage/react (React 바인딩)
│       ├── src/
│       │   ├── hooks/
│       │   │   ├── useStorage.ts
│       │   │   ├── useStorageValue.ts
│       │   │   ├── useSetStorage.ts
│       │   │   └── useRemoveStorage.ts
│       │   └── index.ts        # React 엔트리 포인트
│       ├── dist/               # 빌드 출력
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── examples/                    # 예제 앱 (npm 배포 제외)
│   ├── src/
│   │   ├── demos/              # 예제 컴포넌트
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
├── test/                        # 테스트 파일
├── pnpm-workspace.yaml          # pnpm 워크스페이스 설정
├── package.json                 # Root package.json (monorepo 관리)
├── tsconfig.json                # Root TypeScript 설정
└── tsconfig.base.json           # 공유 TypeScript 설정
```

**중요**:
- `packages/core`는 React 의존성 없이 독립적으로 동작합니다
- `packages/react`는 `@won-storage/core`를 의존성으로 사용하며, 배포 시 패키지 이름은 `@won-storage/react`입니다 (workspace:*)
- `examples/` 폴더는 개발 중 예제를 테스트하기 위한 용도이며, npm 배포에서 제외됩니다

## 개발 명령어

### 패키지 매니저

이 프로젝트는 **pnpm**을 사용합니다. npm이나 yarn을 사용하지 마세요.

### 주요 명령어

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (examples/ 폴더의 예제 앱 실행)
pnpm dev

# 모든 패키지 빌드 (core → react 순서로 빌드)
pnpm build

# Core 패키지만 빌드
pnpm build:core

# React 패키지만 빌드
pnpm build:react

# 모든 패키지 린트 실행
pnpm lint

# 코드 포맷팅
pnpm format

# 포맷팅 검사 (CI에서 사용)
pnpm format:check

# 모든 패키지 테스트 실행
pnpm test

# 테스트 watch 모드
pnpm test:watch
```

## 빌드 아키텍처

### Vite 라이브러리 빌드

- **빌드 도구**: Rolldown Vite (`npm:rolldown-vite@7.1.14`)
- **Monorepo 구조**: pnpm workspace 사용
  - Core 패키지가 먼저 빌드되어야 React 패키지가 빌드 가능
  - React 패키지는 Core 패키지를 `workspace:*`로 참조

#### Core 패키지 (`@won-storage/core`)
- **설정 파일**: `packages/core/vite.config.ts`
- **엔트리 포인트**: `packages/core/src/index.ts`
- **출력**:
  - `dist/index.mjs` (ESM)
  - `dist/index.cjs` (CommonJS)
  - `dist/index.d.ts` (TypeScript 타입 정의)
- **External Dependencies**: 없음 (완전히 독립적)
- **Type Generation**: `vite-plugin-dts`가 타입 정의 생성

#### React 패키지 (`@won-storage/react`)
- **설정 파일**: `packages/react/vite.config.ts` (command에 따라 빌드/개발 서버 분기)
  - `vite` → 개발 서버 (../../examples 폴더를 root로 사용)
  - `vite build` → 라이브러리 빌드
- **엔트리 포인트**: `packages/react/src/index.ts`
- **출력**:
  - `dist/index.mjs` (ESM)
  - `dist/index.cjs` (CommonJS)
  - `dist/index.d.ts` (TypeScript 타입 정의)
- **External Dependencies**: `react`, `react-dom`, `@won-storage/core`는 번들에서 제외
- **Type Generation**: `vite-plugin-dts`가 타입 정의 생성

### TypeScript 설정

- **Target**: ES2022
- **JSX**: react-jsx
- **Strict Mode**: 활성화됨
- 타입 정의는 `vite-plugin-dts`가 자동으로 생성하며 `rollupTypes: true` 옵션으로 단일 .d.ts 파일로 번들링됩니다

### 패키지 구조

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

## 배포 프로세스

### npm 배포

1. `package.json`의 `version` 필드를 수동으로 업데이트합니다
2. GitHub에서 "Publish to npm" 워크플로우를 수동으로 실행 (workflow_dispatch)
3. 워크플로우는 다음을 수행합니다:
   - 현재 버전이 npm에 이미 배포되었는지 확인
   - 버전이 하위 버전이면 실패
   - 빌드 실행
   - npm에 배포 (package.json의 `files: ["dist", "README.md"]`에 의해 dist와 README.md만 배포됨)
   - `v{version}` 형식으로 Git 태그 생성

**배포 제외 항목**: `package.json`의 `files` 필드가 화이트리스트 방식으로 작동하여 `examples/`, `test/`, 설정 파일 등은 자동으로 제외됩니다.

### CI

- **트리거**: Pull Request 생성/업데이트 시
- **실행 내용**: lint → build
- **Node 버전**: 22.12.0
- **pnpm 버전**: 10

## 코드 품질 도구

### Husky

pre-commit 훅이 설정되어 있습니다. 커밋 전에 자동으로 코드 품질 검사가 실행됩니다.

### Prettier

- 지원 파일: `.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.css`, `.md`
- 커밋 전에 자동으로 포맷팅이 적용될 수 있습니다

### ESLint

- TypeScript ESLint 사용
- React Hooks 규칙 포함
- React Refresh 플러그인 활성화

## 최소 요구 사항

- **Node.js**: >= 20.19.0
- **React**: >= 18.0.0 (peerDependency)

## 현재 구현 상태

모든 기본 기능이 구현되어 있습니다:

### Core 패키지 (`@won-storage/core`)
- ✅ `subscribe`: 스토리지 변경 구독
- ✅ `getSnapshot`: 현재 값 가져오기
- ✅ `setStorageItem`: 값 설정
- ✅ `removeStorageItem`: 값 제거
- ✅ `getStorage`: Storage 객체 가져오기
- ✅ `defaultSerializer/defaultDeserializer`: 직렬화/역직렬화

### React 패키지 (`@won-storage/react`)
- ✅ `useStorage`: 메인 훅 (값 읽기 + 쓰기)
- ✅ `useStorageValue`: 값만 읽기
- ✅ `useSetStorage`: Setter만 사용
- ✅ `useRemoveStorage`: 값 제거

## 향후 확장 가능성

Monorepo 구조 덕분에 다음과 같은 확장이 용이합니다:
- `@won-storage/vue`: Vue 3 Composition API 바인딩
- `@won-storage/svelte`: Svelte stores 바인딩
- `@won-storage/solid`: Solid.js signals 바인딩
