import { isNil } from 'lodash-es';

export interface StorageOptions {
  storage: Storage;
  prefix: string;

  /**
   * Expiration time in seconds
   * - 0|null 永久有效
   * - 大于0 从存储开始算起，在指定时间后过期
   */
  timeout?: number;
}

export interface StorageItem<T = unknown> {
  value: T;
  expire: number;
}

export class WebStorage {
  private storage: Storage;
  private prefix: string = '';
  private timeout: number;

  constructor(options: StorageOptions) {
    const { storage, prefix, timeout } = options;
    this.storage = storage;
    this.prefix = prefix;
    this.timeout = isNil(timeout) ? 0 : timeout;
  }

  private getFullKey(key: string) {
    return this.prefix !== '' ? `${this.prefix}-${key}` : key;
  }

  /**
   * Set cache
   * @param {string} key
   * @param {*} value
   * @param {*} expire 参见 {@link StorageOptions} 中 timeout 的定义
   * @memberof Cache
   */
  setItem<T>(key: string, value: T, expire: number = this.timeout) {
    const date = new Date();
    const stringData = JSON.stringify({
      value,
      expire: expire > 0 ? date.getTime() + expire * 1000 : expire,
    } as StorageItem<T>);
    this.storage.setItem(this.getFullKey(key), stringData);
  }

  getItem<T = unknown>(key: string) {
    const val = this.storage.getItem(this.getFullKey(key));
    if (!val) return null;

    try {
      const data = JSON.parse(val) as StorageItem<T>;
      const { value, expire } = data;
      if (expire === 0 || expire >= new Date().getTime()) {
        return value;
      }
      this.removeItem(key);
      return null;
    } catch {
      return null;
    }
  }

  /**
   *
   * @param {string} key
   */
  removeItem(key: string) {
    this.storage.removeItem(this.getFullKey(key));
  }

  clear() {
    this.storage.clear();
  }
}

export function createStorage({
  prefix = '',
  storage = window.sessionStorage,
  timeout = 0,
}: Partial<StorageOptions>) {
  return new WebStorage({
    prefix: prefix,
    storage: storage,
    timeout: timeout,
  });
}
