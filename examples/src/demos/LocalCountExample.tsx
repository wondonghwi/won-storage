import { useStorage } from 'won-storage'

export default function LocalCountExample() {
  const [count, setCount] = useStorage('demo-count', 0)

  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>useStorage (localStorage)</h2>
      <p>동일한 키를 사용하는 모든 컴포넌트가 자동으로 동기화됩니다.</p>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span>카운트: {count}</span>
        <button onClick={() => setCount(prev => prev + 1)}>+1</button>
        <button onClick={() => setCount(prev => prev - 1)}>-1</button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>
    </section>
  )
}
