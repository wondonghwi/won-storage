import { useStorageValue, useSetStorage, useRemoveStorage } from 'won-storage';

export default function ThemeExample() {
  const theme = useStorageValue('demo-theme', '');
  const setTheme = useSetStorage('demo-theme', 'light');
  const removeTheme = useRemoveStorage('demo-theme');

  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>useStorageValue / useSetStorage</h2>
      <p>값을 읽거나, 구독 없이 setter만 사용할 수도 있습니다.</p>
      <p>
        현재 테마: <strong>{theme}</strong>
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setTheme('light')}>Light</button>
        <button onClick={() => setTheme('dark')}>Dark</button>
        <button onClick={removeTheme}>초기화</button>
      </div>
    </section>
  );
}
