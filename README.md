
# Vite Plugin Status Html
README | [EN README](README_EN.md)  

一个Vite（rollup）打包产物分析报告工具，多个角度展示打包产物的细节信息，从资源文件信息到第三方依赖等等。希望这些信息能在您性能优化过程中起到参考作用~   


通过它,你将获得下面打包信息：

- 项目路径，打包一共花费时间，打包日期
- 打包总体积，js 文件体积，css 文件体积，以及饼状图显示的打包产物占比
- 打包出的文件数量，入口点指定的所有模块及其依赖项，产物中引用的第三方依赖的数量
- 同时我们也提供了类似 WebpackBundleAnalyzer/ rollup-plugin-visualizer 的工具，可以帮助我们更好的了解产物内容，可视化的依赖的引用关系
- 表格展示打包的出的文件，包含文件类型，文件大小，里面引用第三方依赖数量

## 示例

![11.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/848c09ab19684f1985dccc2df58e6990~tplv-k3u1fbpfcp-watermark.image?)

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
import  stats  from "vite-plugin-stats-html";
// or
// cjs
const stats = require("vite-plugin-stats-html");
```

Usage with rollup (rollup.config.js)

```js
module.exports = {
  plugins: [
    // put it the last one
    stats(),
  ],
};
```

Usage with vite (vite.config.js)

```js
module.exports = {
  plugins: [stats()],
};
```

Usage with vite TypeScript (vite.config.ts)

```ts
import { defineConfig, type PluginOption } from "vite";
export default defineConfig({
  plugins: [stats() as PluginOption],
});
```

Usage with SvelteKit (vite.config.js)

```js
const config = {
  plugins: [
    stats({
      filename: "stats.html",
    }),
  ],
};

export default config;
```
