import './App.css';
import { useStorage, useStorageValue, useSetStorage, useRemoveStorage } from './index';

export default function App() {
  const [count, setCount] = useStorage('demo-count', 0);
  const theme = useStorageValue('demo-theme', '');
  const setTheme = useSetStorage('demo-theme', 'light');
  const clearCount = useRemoveStorage('demo-count');

  return (
    <main style={{ padding: '2rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.5 }}>
      <h1>won-storage 데모</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>useStorage</h2>
        <p>동일한 키를 사용하는 모든 컴포넌트가 자동으로 동기화됩니다.</p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span>카운트: {count}</span>
          <button onClick={() => setCount(prev => prev + 1)}>+1</button>
          <button onClick={() => setCount(prev => prev - 1)}>-1</button>
          <button onClick={() => setCount(0)}>reset</button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useStorageValue / useSetStorage</h2>
        <p>값을 읽거나, 구독 없이 setter만 사용할 수도 있습니다.</p>
        <p>
          현재 테마: <strong>{theme}</strong>
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setTheme('light')}>Light</button>
          <button onClick={() => setTheme('dark')}>Dark</button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>useRemoveStorage</h2>
        <p>스토리지 값을 손쉽게 제거하세요.</p>
        <button onClick={clearCount}>카운트 삭제</button>
      </section>
    </main>
  );
}
