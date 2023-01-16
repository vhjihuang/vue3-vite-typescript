import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// API 自动引入插件
import AutoImport from 'unplugin-auto-import/vite'
// 组件自动引入插件
import Components from 'unplugin-vue-components/vite'

import {
  ArcoResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'

// Icon 插件
import Icons from 'unplugin-icons/vite'
// Icon 自动引入解析器
import IconsResolver from 'unplugin-icons/resolver'
// Icon 加载 loader
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// Unocss 插件
import Unocss from 'unocss/vite'
// Unocss 默认预设
import presetUno from '@unocss/preset-uno'
// Unocss 属性模式预设
import presetAttributify from '@unocss/preset-attributify'
// Unocss 指令转换插件
import transformerDirectives from '@unocss/transformer-directives'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const viteENV = loadEnv(mode, './')

  return {
    base: viteENV.VITE_BASE,
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      // 接口占用直接退出
      strictPort: true,
      // 本地服务 CORS 是否开启
      cors: true,
      proxy: {
        [viteENV.VITE_BASE_URL]: {
          target: viteENV.VITE_BASE_SERVER_URL,
          // 允许跨域
          changeOrigin: true,
          rewrite: path => path.replace(viteENV.VITE_BASE_URL, '/')
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static/assets',
      sourcemap: true,
      // 规定触发警告的 chunk 大小,消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 静态资源打包搭配dist目录下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        // 需要解析的文件
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
        // import 指定自动引入的包位置(名)
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        // 生成相应的自动导入json文件
        eslintrc: {
          // 启用
          enabled: true,
          // 生成自动导入json文件的位置
          filepath: './.eslintrc-auto-import.json',
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
          VueUseDirectiveResolver(),
          // icon 组件自动引入解析器使用
          IconsResolver({
            // icon 自动引入的组件前缀 - 为了统一组件的icon组件名称格式
            prefix: 'icon',
            // 自定义的 icon 模块集合
            customCollections: [] // 自定义的组件名
          })
        ]
      }),
      // icon 配置
      Icons({
        compiler: 'vue3',
        customCollections: {
          // 模版 user 图标集,给svg文件设置 fill='currentColor', 使用图标的颜色具有适应性
          user: FileSystemIconLoader('src/assets/svg/user', svg =>
            svg.replace(/<svg /, '<svg fill="currentColor" ')
          )
        },
        autoInstall: true
      }),
      // Unocss 新增一个 Unocss 插件配置å
      Unocss({
        // 预设
        presets: [presetUno(), presetAttributify()],
        // 指令转化插件
        transformers: [transformerDirectives()],
        // 自定义规则
        rules: []
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
