import { useStorage, useRemoveStorage } from 'won-storage'

export default function SessionNoteExample() {
  const [note, setNote] = useStorage('demo-session-note', '', { storageType: 'session' })
  const clearNote = useRemoveStorage('demo-session-note', 'session')

  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>sessionStorage 예제</h2>
      <p>브라우저 탭을 닫으면 함께 사라지는 임시 메모를 sessionStorage에 저장합니다.</p>
      <textarea
        value={note}
        onChange={event => setNote(event.target.value)}
        placeholder="세션 동안만 유지할 메모를 남겨보세요."
        rows={4}
        style={{ width: '100%', padding: '0.5rem', resize: 'vertical' }}
      />
      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setNote('')}>초기화</button>
        <button onClick={clearNote}>sessionStorage 삭제</button>
      </div>
      <small style={{ display: 'block', marginTop: '0.5rem', color: '#666' }}>
        메모는 현재 탭이 닫힐 때까지만 유지됩니다.
      </small>
    </section>
  )
}
