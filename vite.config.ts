import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  const env = loadEnv(mode, process.cwd(), '');

  return {
    envPrefix: 'VITE_',
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: env.VITE_BASE_PATH,
    server: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
      open: false,
    },
    build: {
      target: 'es2018',
      cssTarget: 'chrome83',
      assetsInlineLimit: 10240,
      cssCodeSplit: true,
      sourcemap: false,
      outDir: env.VITE_OUTDIR,
    },
  };
});
