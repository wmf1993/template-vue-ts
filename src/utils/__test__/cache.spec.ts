import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createLocalStorage } from '../cache';

vi.useFakeTimers();

describe('LocalStorage Cache with Expiry', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should set and get value', () => {
    const storage = createLocalStorage({
      prefix: 'TEST_',
      timeout: 0,
    });

    const key = 'testKey';
    const value = 'test value';

    storage.setItem(key, value);
    vi.advanceTimersByTime(1000 * 60 * 60 * 24);
    expect(storage.getItem(key)).toBe(value);
  });

  it('should return value if the cache item is not expired', () => {
    const storage = createLocalStorage({
      prefix: 'TEST_',
      timeout: 60 * 60 * 24,
    });

    const key = 'testKey';
    const value = 'test value';

    storage.setItem(key, value);
    vi.advanceTimersByTime(1000 * 60 * 60 * 24);
    expect(storage.getItem(key)).toBe(value);
  });

  it('should return null if the cache item is expired', () => {
    const storage = createLocalStorage({
      prefix: 'TEST_',
      timeout: 60 * 60 * 24,
    });

    const key = 'testKey';
    const value = 'test value';
    storage.setItem(key, value);

    vi.advanceTimersByTime(1000 * 60 * 60 * 24 + 1);
    expect(storage.getItem(key)).toBe(null);
  });

  it('should return null for a non-existent cache key', () => {
    const storage = createLocalStorage({
      prefix: 'TEST_',
      timeout: 60 * 60 * 24,
    });

    const key = 'testKey';
    expect(storage.getItem(key)).toBe(null);
  });
});
