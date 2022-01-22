import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import reactJsx from 'vite-react-jsx'
import path from 'path'

// IE11対策
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  build: {
    // root (= ./src) から見た相対パス
    outDir: '../public',
    emptyOutDir: true
  },

  base: './',
  server: {
    open: true,
    port: 8080
  },

  plugins: [
    // import Reactしなくて済むように
    reactJsx(),

    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],

  resolve: {
    alias: {
      '@css/': path.join(__dirname, './src/assets/css/'),
      '@js/': path.join(__dirname, './src/assets/js/'),
      '@img/': path.join(__dirname, './src/assets/img/')
    }
  }
})
