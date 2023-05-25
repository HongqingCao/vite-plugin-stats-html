
# Vite Plugin Status Html
A Vite (rollup) packaging analysis reporting tool that shows details of the packaging from multiple perspectives, from resource file information to third party dependencies. I hope this information can serve as a reference in your performance optimization process~

README | [中文 README](README.md)


It will give you the following packaging information:
- Project path, total packaging time, packaging date
- Total packaging volume, js file volume, css file volume, and pie chart showing the percentage of packaging products
- Number of files packaged out, all modules and their dependencies specified at the entry point, number of third-party dependencies referenced in the artifact
- We also provide tools like WebpackBundleAnalyzer/ rollup-plugin-visualizer to help us better understand the product content and visualize the dependency reference relationships
- Table displays the packaged outgoing files, including file type, file size, and the number of third-party dependencies referenced in them
 
## Screenshots

![pic](https://github.com/HongqingCao/vite-plugin-stats-html/blob/main/pics/vite.gif)

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
import { defineConfig, type PluginOption } from 'vite'
export default defineConfig({
  plugins: [visualizer() as PluginOption],
})
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