import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver, VueUseComponentsResolver, VueUseDirectiveResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 需要解析的文件
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ],
      // import 指定自动引入的包位置(名)
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      // 生成相应的自动导入json文件
      eslintrc: {
        // 启用
        enabled: true,
        // 生成自动导入json文件的位置
        filepath:'./eslintrc-auto-import.json',
        // 全局属性值
        globalsPropValue: true
      },
      resolvers: [ArcoResolver()]
    }),
    Components({
      dirs: ['src/components/', 'src/views/'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ArcoResolver({
          sideEffect: true
        }),
        VueUseComponentsResolver(),
        VueUseDirectiveResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
