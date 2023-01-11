/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  env: {
    // 浏览器环境
    browser: true,
    // node环境
    node: true,
    // 启用除了modules以外的所有 ECMAScript 6 特性
    es2021: true
  },
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  global: {
    defineEmits: "readonly",
    defineProps: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: ["warn", "never"], // 禁止尾部使用分号
    "no-debugger": "warn", // 禁止出现 debugger
  }
};
