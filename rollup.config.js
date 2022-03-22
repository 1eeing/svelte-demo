// import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import svelte from 'rollup-plugin-svelte';

const isDev = process.env.DEV;

export default {
  input: './src/index.svelte',
  output: [
    {
      file: './lib/index.umd.js',
      name: 'svelteDemo',
      format: 'umd',
      exports: 'named',
      plugins: [!isDev && terser()],
    },
    {
      file: './lib/index.esm.js',
      format: 'esm',
      exports: 'named',
      plugins: [!isDev && terser()],
    },
    {
      file: './lib/index.cjs.js',
      format: 'cjs',
      exports: 'named',
      plugins: [!isDev && terser()],
    },
  ],
  plugins: [
    // typescript({
    //   tsconfig: './tsconfig.json',
    //   useTsconfigDeclarationDir: true,
    // }),

    svelte({
      emitCss: false,
      compilerOptions: {
        customElement: true,
      },
    }),

    nodeResolve({
      mainFields: ['jsnext', 'preferBuiltins', 'browser'],
    }),

    commonjs({
      include: ['./node_modules/**'],
    }),

    json(),
  ],
};
