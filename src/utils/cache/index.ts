import { isNil } from 'lodash-es';

import { DEFAULT_CACHE_TIME, NAMESPACE } from '@/constants/cache';

import type { StorageOptions } from './storageCache';
import { createStorage as create } from './storageCache';

type CreateStorageOptions = Partial<Pick<StorageOptions, 'prefix' | 'timeout'>>;

export const createSessionStorage = (options: CreateStorageOptions) => {
  return create({
    ...options,
    storage: window.sessionStorage,
    prefix: isNil(options.prefix) ? NAMESPACE : options.prefix,
    timeout: isNil(options.timeout) ? DEFAULT_CACHE_TIME : options.timeout,
  });
};

export const createLocalStorage = (options: CreateStorageOptions) => {
  return create({
    ...options,
    storage: window.localStorage,
    prefix: isNil(options.prefix) ? NAMESPACE : options.prefix,
    timeout: isNil(options.timeout) ? DEFAULT_CACHE_TIME : options.timeout,
  });
};
