import { isNil } from 'lodash-es';

import { DEFAULT_CACHE_TIME } from '@/constants/cache';

import type { CreateStorageParams } from './storageCache';
import { createStorage as create } from './storageCache';

export const createSessionStorage = (
  options: Pick<CreateStorageParams, 'prefixKey' | 'timeout'>,
) => {
  return create({
    ...options,
    storage: window.sessionStorage,
    timeout: isNil(options.timeout) ? DEFAULT_CACHE_TIME : options.timeout,
  });
};

export const createLocalStorage = (options: Pick<CreateStorageParams, 'prefixKey' | 'timeout'>) => {
  return create({
    ...options,
    storage: window.localStorage,
    timeout: isNil(options.timeout) ? DEFAULT_CACHE_TIME : options.timeout,
  });
};
