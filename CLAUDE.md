# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

`won-storage`는 React 18+의 `useSyncExternalStore` API를 활용한 스토리지 관리 훅 라이브러리입니다. TypeScript로 작성되었으며 ESM과 CommonJS 번들을 모두 제공하여 다양한 빌드 도구와 호환됩니다.

## 프로젝트 구조

```
won-storage/
├── src/                      # 라이브러리 소스 코드
│   ├── hooks/               # 훅 구현 (useLocalStorage, useSessionStorage 등)
│   ├── utils/               # 유틸리티 함수
│   ├── types/               # TypeScript 타입 정의
│   └── index.ts             # 라이브러리 엔트리 포인트
├── examples/                # 예제 앱 (npm 배포 제외)
│   ├── src/
│   │   ├── demos/          # 예제 컴포넌트
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
├── test/                    # 테스트 파일
├── dist/                    # 빌드 출력 (npm 배포됨)
├── package.json            # 라이브러리 메타데이터 (files: ["dist", "README.md"])
├── vite.config.ts          # 빌드 & 개발 서버 설정 (command에 따라 분기)
└── tsconfig.json           # TypeScript 설정
```

**중요**: `examples/` 폴더는 개발 중 예제를 테스트하기 위한 용도이며, `package.json`의 `files` 필드에 의해 npm 배포에서 자동으로 제외됩니다.

## 개발 명령어

### 패키지 매니저

이 프로젝트는 **pnpm**을 사용합니다. npm이나 yarn을 사용하지 마세요.

### 주요 명령어

```bash
# 의존성 설치
pnpm install --frozen-lockfile

# 개발 서버 실행 (examples/ 폴더의 예제 앱 실행)
pnpm dev

# 라이브러리 빌드 (dist/ 폴더에 ESM/CJS 번들 생성)
pnpm build

# 린트 실행
pnpm lint

# 코드 포맷팅
pnpm format

# 포맷팅 검사 (CI에서 사용)
pnpm format:check

# 테스트 실행
pnpm test

# 테스트 watch 모드
pnpm test:watch
```

## 빌드 아키텍처

### Vite 라이브러리 빌드

- **빌드 도구**: Rolldown Vite (`npm:rolldown-vite@7.1.14`)
- **설정 파일**: `vite.config.ts` (command에 따라 빌드/개발 서버 분기)
  - `vite` → 개발 서버 (examples 폴더를 root로 사용)
  - `vite build` → 라이브러리 빌드
- **엔트리 포인트**: `src/index.ts`
- **출력 파일**:
  - `dist/index.mjs` (ESM)
  - `dist/index.cjs` (CommonJS)
  - `dist/index.d.ts` (TypeScript 타입 정의)
- **External Dependencies**: `react`, `react-dom`은 번들에서 제외되고 peerDependencies로 처리됩니다
- **Type Generation**: `vite-plugin-dts`가 `src/hooks/`, `src/utils/`, `src/types/`, `src/index.ts`만 타입 정의 생성 (examples 폴더 제외)

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

현재는 테스트용 함수(`testTempAdd`)와 버전 상수(`VERSION`)만 export하고 있습니다. 실제 스토리지 훅(`useLocalStorage`, `useSessionStorage`)은 아직 구현되지 않았으며 `src/index.ts`에 TODO 주석으로 표시되어 있습니다.
