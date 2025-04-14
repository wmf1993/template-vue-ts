/**
 * @description System default cache time, in seconds
 */
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * - namespace用于指定项目唯一标识
 * - 用于区分不同项目的偏好设置以及存储数据的key前缀以及其他一些需要隔离的数据
 */
export const NAMESPACE = `${import.meta.env.VITE_APP_NAMESPACE}_${import.meta.env.PROD ? 'prod' : 'dev'}`;
