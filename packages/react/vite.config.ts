import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  // 개발 서버 실행 시 (테스트 모드 제외)
  if (command === 'serve' && mode !== 'test') {
    return {
      plugins: [react()],
      root: '../../examples',
      server: {
        port: 5173,
      },
      resolve: {
        alias: [
          { find: '@won-storage/core', replacement: resolve(__dirname, '../core/src/index.ts') },
          { find: '@won-storage/react', replacement: resolve(__dirname, './src/index.ts') },
        ],
      },
    };
  }

  // 라이브러리 빌드 및 테스트 시
  return {
    plugins: [
      react(),
      dts({
        include: ['src/**/*'],
        outDir: 'dist',
        rollupTypes: true,
        tsconfigPath: './tsconfig.json',
      }),
    ],
    // Vitest에서 @won-storage/core, @won-storage/react를 로컬 소스에 매핑하여 dist 없이 테스트 가능하도록 처리
    ...(mode === 'test'
      ? {
          resolve: {
            alias: [
              {
                find: '@won-storage/core',
                replacement: resolve(__dirname, '../core/src/index.ts'),
              },
              {
                find: '@won-storage/react',
                replacement: resolve(__dirname, './src/index.ts'),
              },
            ],
          },
        }
      : {}),
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: format => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', '@won-storage/core'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            '@won-storage/core': 'WonStorageCore',
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      clearMocks: true,
    },
  };
});
