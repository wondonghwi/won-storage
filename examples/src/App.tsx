import LocalCountExample from './demos/LocalCountExample';
import ThemeExample from './demos/ThemeExample';
import SessionNoteExample from './demos/SessionNoteExample';

export default function App() {
  return (
    <main style={{ padding: '2rem', maxWidth: 640, margin: '0 auto', lineHeight: 1.5 }}>
      <h1>won-storage 예제 모음</h1>
      <p style={{ marginTop: '1rem' }}>
        각 섹션은 라이브러리의 훅을 실제 사용 환경처럼 보여주도록 분리했습니다. 프로젝트에선
        won-storage 패키지를 그대로 import하면 됩니다.
      </p>

      <LocalCountExample />
      <ThemeExample />
      <SessionNoteExample />
    </main>
  );
}
