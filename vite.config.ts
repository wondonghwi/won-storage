import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  // 개발 서버 실행 시 (테스트 모드 제외)
  if (command === 'serve' && mode !== 'test') {
    return {
      plugins: [react()],
      root: 'examples',
      server: {
        port: 5173,
      },
    };
  }

  // 라이브러리 빌드 및 테스트 시
  return {
    plugins: [
      react(),
      dts({
        include: ['src/hooks/**/*', 'src/utils/**/*', 'src/types/**/*', 'src/index.ts'],
        outDir: 'dist',
        rollupTypes: true,
        tsconfigPath: './tsconfig.json',
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        formats: ['es', 'cjs'],
        fileName: format => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
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
