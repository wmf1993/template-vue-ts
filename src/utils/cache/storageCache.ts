import { isNil } from 'lodash-es';

export interface CreateStorageParams {
  storage: Storage;
  prefixKey: string;

  /**
   * Expiration time in seconds
   * - 0|null 永久有效
   * - 大于0 从存储开始算起，在指定时间后过期
   */
  timeout?: number;
}

export interface StorageItem<T = unknown> {
  value: T;
  time: number;
  expire: number;
}

export class WebStorage {
  private storage: Storage;
  private prefixKey: string = '';
  private timeout: number;

  constructor(options: CreateStorageParams) {
    const { storage, prefixKey, timeout } = options;
    this.storage = storage;
    this.prefixKey = prefixKey;
    this.timeout = isNil(timeout) ? 0 : timeout;
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  /**
   * Set cache
   * @param {string} key
   * @param {*} value
   * @param {*} expire 参见 {@link CreateStorageParams} 中 timeout 的定义
   * @memberof Cache
   */
  set<T>(key: string, value: T, expire: number = this.timeout) {
    const date = new Date();
    const stringData = JSON.stringify({
      value,
      time: date.getTime(),
      expire: expire > 0 ? date.getTime() + expire * 1000 : expire,
    } as StorageItem<T>);
    this.storage.setItem(this.getKey(key), stringData);
  }

  get<T = unknown>(key: string) {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return null;

    try {
      const data = JSON.parse(val) as StorageItem<T>;
      const { value, expire } = data;
      if (expire === 0 || expire >= new Date().getTime()) {
        return value;
      }
      this.remove(key);
      return null;
    } catch {
      return null;
    }
  }

  /**
   *
   * @param {string} key
   */
  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  clear() {
    this.storage.clear();
  }
}

export function createStorage({
  prefixKey = '',
  storage = window.sessionStorage,
  timeout = 0,
}: Partial<CreateStorageParams>) {
  return new WebStorage({
    prefixKey: prefixKey,
    storage: storage,
    timeout: timeout,
  });
}
