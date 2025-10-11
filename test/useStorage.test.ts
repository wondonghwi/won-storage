import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStorage } from '../src/hooks/useStorage';
import { useStorageValue } from '../src/hooks/useStorageValue';

describe('useStorage', () => {
  const key = 'won-storage:test';
  const defaultValue = { name: 'Guest' };

  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('스토리지에 값이 없으면 기본값을 반환한다', () => {
    const { result } = renderHook(() => useStorage(key, defaultValue));
    expect(result.current[0]).toEqual(defaultValue);
  });

  it('새 값을 저장하면 스토리지와 상태가 함께 갱신된다', () => {
    const { result } = renderHook(() => useStorage(key, defaultValue));

    act(() => {
      result.current[1]({ name: 'Alice' });
    });

    expect(result.current[0]).toEqual({ name: 'Alice' });
    expect(window.localStorage.getItem(key)).toBe(JSON.stringify({ name: 'Alice' }));
  });

  it('다른 탭에서 발생한 storage 이벤트에도 반응한다', () => {
    const { result } = renderHook(() => useStorage(key, defaultValue));

    act(() => {
      window.localStorage.setItem(key, JSON.stringify({ name: 'Bob' }));
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: JSON.stringify({ name: 'Bob' }),
          storageArea: window.localStorage,
        })
      );
    });

    expect(result.current[0]).toEqual({ name: 'Bob' });
  });

  it('같은 키에 새 값을 저장하면 기존 값을 덮어쓴다', () => {
    window.localStorage.setItem(key, JSON.stringify({ name: 'First' }));
    const { result } = renderHook(() => useStorage(key, defaultValue));

    act(() => {
      result.current[1]({ name: 'Temp' });
    });

    expect(result.current[0]).toEqual({ name: 'Temp' });
    expect(window.localStorage.getItem(key)).toBe(JSON.stringify({ name: 'Temp' }));
  });
});

describe('useStorageValue', () => {
  const key = 'won-storage:value';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('기본값을 제공하면 해당 값을 초깃값으로 사용한다', () => {
    const { result } = renderHook(() => useStorageValue(key, 'light'));
    expect(result.current).toBe('light');
  });

  it('스토리지 업데이트를 반영한다', () => {
    const { result } = renderHook(() => useStorageValue(key, 'light'));

    act(() => {
      window.localStorage.setItem(key, JSON.stringify('dark'));
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: JSON.stringify('dark'),
          storageArea: window.localStorage,
        })
      );
    });

    expect(result.current).toBe('dark');
  });
});
