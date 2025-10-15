# won-storage

Monorepo for the won-storage ecosystem. The repository hosts both the framework-agnostic core and the React bindings.

## Packages

- [`@won-storage/react`](packages/react/README.md) — React hooks built on top of the core
- [`@won-storage/core`](packages/core/README.md) — storage management utilities for any framework

각 패키지의 자세한 사용법과 예제는 링크된 README에서 확인할 수 있습니다.

## Development

```bash
pnpm install
pnpm test
pnpm build
```

실행 중인 예제 앱은 `pnpm dev`로 구동할 수 있으며, React 패키지가 `examples/` 폴더를 사용하는 구조입니다.

## License

MIT © [wondonghwi](https://github.com/wondonghwi)
