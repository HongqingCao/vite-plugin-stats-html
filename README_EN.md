<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2023-05-25 20:26:13
 * @LastEditors: codercao
 * @LastEditTime: 2023-05-27 10:38:23
-->

# Vite Plugin Status Html
README | [中文 README](README.md)  

A Vite (rollup) packaging analysis reporting tool that shows details of the packaging from multiple perspectives, from resource file information to third party dependencies. I hope this information can serve as a reference in your performance optimization process~  
 

It will give you the following packaging information:
- Project path, total packaging time, packaging date
- Total packaging volume, js file volume, css file volume, and pie chart showing the percentage of packaging products
- Number of files packaged out, all modules and their dependencies specified at the entry point, number of third-party dependencies referenced in the artifact
- We also provide tools like WebpackBundleAnalyzer/ rollup-plugin-visualizer to help us better understand the product content and visualize the dependency reference relationships
- Table displays the packaged outgoing files, including file type, file size, and the number of third-party dependencies referenced in them
 
## Screenshots

![Vite Plugin Status Html](https://github.com/HongqingCao/vite-plugin-stats-html/blob/main/pics/vite.gif)

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
