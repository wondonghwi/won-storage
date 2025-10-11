import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// 🧪 testTempAdd 테스트
import { testTempAdd, VERSION } from './index';

console.log('=== won-storage 로컬 테스트 ===');
console.log('VERSION:', VERSION);
const result = testTempAdd(10, 20);
console.log('testTempAdd(10, 20) 결과:', result);
console.log('================================');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
