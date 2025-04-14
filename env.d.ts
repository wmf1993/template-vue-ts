/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HOST: string;

  readonly VITE_PORT: string;

  /** 基础公共路径 */
  readonly VITE_BASE_PATH: string;

  /** 打包目录 */
  readonly VITE_OUTDIR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
