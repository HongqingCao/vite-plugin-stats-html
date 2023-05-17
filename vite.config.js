/*
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2023-05-17 22:41:30
 * @LastEditors: codercao
 * @LastEditTime: 2023-05-17 22:50:47
 */
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: './plugin/index.js',
      name: 'vite-plugin-stats-html',
      fileName: 'vite-plugin-stats-html'
    }
  }
})