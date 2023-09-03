// source: https://github.com/sveltejs/template/blob/master/rollup.config.js

import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import copy from "rollup-plugin-copy";
import typescript from '@rollup/plugin-typescript';
import { sass } from "svelte-preprocess-sass";
import autoPreprocess from 'svelte-preprocess'

const production = !process.env.ROLLUP_WATCH;
const OUTPUT_DIR = 'public';
const UI_DIR = 'src/ui';
const ELECTRON_DIR = 'src/electron';

function serve() {
  spawn('npm', ['run', 'build-css'], {
    shell: true
  })
  let electron;
  return {
    writeBundle: () => {
      if (!electron) {
        electron = spawn('npm', ['run', 'start'], {
          shell: true
        });
      }
    }
  };
}

export default {
  input: `${UI_DIR}/main.js`,
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: `${ OUTPUT_DIR }/bundle.js`
  },
  plugins: [
    typescript({ sourceMap: !production }),
    sass({}),
    svelte({
      preprocess: autoPreprocess(),
      compilerOptions: {
        dev: !production
      }
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      exportConditions: ['svelte']
    }),
    commonjs(),
    !production && serve(),
    !production && livereload({
      watch: OUTPUT_DIR,
      delay: 2000
    }),
    production && terser(),
    copy({
      targets: [
        { src: `${UI_DIR}/index.html`, dest: OUTPUT_DIR },
        { src: `${UI_DIR}/icons`, dest: OUTPUT_DIR },
        { src: `${ELECTRON_DIR}/preload.js`, dest: `${OUTPUT_DIR}` }
      ]
    })
  ],
  watch: {
    clearScreen: false
  }
};