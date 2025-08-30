import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
// @ts-ignore no check
import tailwindcss from '@tailwindcss/vite'
// @ts-ignore no check
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin({ exclude: ['lowdb'] })],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('lowdb')) {
              return 'lowdb'
            }
            return undefined
          }
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true
      }),
      react(),
      tailwindcss()
    ]
  }
})
