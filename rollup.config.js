import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import sass from 'rollup-plugin-sass';
import json from "@rollup/plugin-json";
import bundleExclude from 'rollup-plugin-exclude-dependencies-from-bundle';

const overrides = {
  compilerOptions: {declaration: true},
  exclude: ['src/components/**/*.test.tsx', 'src/**/*.stories.tsx', 'src/stories/*.stories.ts'],
};

const config = {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.em.js',
      format: 'es',
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({tsconfigOverride: overrides}),
    sass({ output: 'dist/index.css' }),
    bundleExclude(),
  ],
  external: ['react', 'react-dom', 'axios'],
};

export default config;