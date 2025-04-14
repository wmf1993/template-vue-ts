/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST: string;

  readonly VITE_PORT: string;

  /** 基础公共路径 */
  readonly VITE_BASE_PATH: string;

  /** 打包目录 */
  readonly VITE_OUTDIR: string;

  /** 应用命名空间，用于缓存等功能的前缀，确保隔离 */
  readonly VITE_APP_NAMESPACE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
