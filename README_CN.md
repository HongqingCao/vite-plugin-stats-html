<!--
 * @Description:
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2023-05-22 21:54:52
 * @LastEditors: codercao
 * @LastEditTime: 2023-05-22 22:42:48
-->

# Vite Plugin Status Html

README | [EN README](README.md)

通过它你将获得下面打包信息：

- 项目路径，打包一共花费时间，打包日期
- 打包总体积，js 文件体积，css 文件体积，以及饼状图显示的打包产物占比
- 打包出的文件数量，入口点指定的所有模块及其依赖项，产物中引用的第三方依赖的数量
- 同时我们也提供了类似 WebpackBundleAnalyzer/ rollup-plugin-visualizer 的工具，可以帮助我们更好的了解产物内容，可视化的依赖的引用关系
- 表格展示打包的出的文件，包含文件类型，文件大小，里面引用第三方依赖数量

## 截图

![pic](https://github.com/HongqingCao/vite-plugin-stats-html/blob/main/pics/vite.png?raw=true)

## Installation

```sh
npm install --save-dev vite-plugin-stats-html
```

or via yarn:

```sh
yarn add --dev vite-plugin-stats-html
```

## Usage

Import

```javascript
// es
import { visualizer } from "vite-plugin-stats-html";
// or
// cjs
const { visualizer } = require("vite-plugin-stats-html");
```

Usage with rollup (rollup.config.js)

```js
module.exports = {
  plugins: [
    // put it the last one
    visualizer(),
  ],
};
```

Usage with vite (vite.config.js)

```js
module.exports = {
  plugins: [visualizer()],
};
```

Usage with vite TypeScript (vite.config.ts)

```ts
import { defineConfig, type PluginOption } from "vite";
export default defineConfig({
  plugins: [visualizer() as PluginOption],
});
```

Usage with SvelteKit (vite.config.js)

```js
const config = {
  plugins: [
    visualizer({
      filename: "stats.html",
    }),
  ],
};

export default config;
```
