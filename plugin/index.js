/*
 * @Description:
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2023-05-18 21:34:54
 * @LastEditors: codercao
 * @LastEditTime: 2023-05-21 22:22:37
 */
const fs = require("fs");
const path = require("path");
import { ModuleMapper } from "./mapper";
import { buildTree } from "./buildTree";
import { createHtml } from "./createHtml";
function visualizer(options = {}) {
  const outputFile = options.output || "stats.html";

  let startTime;

  return {
    name: "visualizer",
    buildStart() {
      startTime = Date.now();
    },
    async generateBundle(opts, outputBundle) {
      const projectRoot = opts.projectRoot ?? process.cwd();
      const roots = [];
      const mapper = new ModuleMapper(projectRoot);
      const ModuleLengths = async ({ id, renderedLength, code }) => {
        const isCodeEmpty = code == null || code == "";

        const result = {
          id,
          renderedLength: isCodeEmpty
            ? renderedLength
            : Buffer.byteLength(code, "utf-8"),
        };
        return result;
      };

      let assetCount = 0;
      let chunkCount = 0;
      let packageCount = 0;
      let totalSize = 0;
      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;
      let htmlSize = 0;
      let fontSize = 0;
      let tableData = [];
      for (const [bundleId, bundle] of Object.entries(outputBundle)) {
        let type = path.extname(bundle.fileName).slice(1);
        let size;

        switch (type) {
          case "js":
            size = bundle.code.length;
            jsSize += size;
            break;
          case "css":
            size = bundle.source.length;
            cssSize += size;
            break;
          case "jpg":
          case "jpeg":
          case "png":
          case "gif":
          case "svg":
            imageSize += size;
            break;
          case "html":
            htmlSize += size;
            break;
          case "woff":
          case "woff2":
          case "ttf":
          case "otf":
            fontSize += size;
            break;
          default:
            break;
        }
        const dependencyCount = Object.keys(bundle.modules ?? []).length;
        totalSize += size;
        assetCount++;
        tableData.push({
          file: bundle.fileName,
          type,
          size: Number(size / 1000).toFixed(2),
          dependencyCount,
        });

        if (bundle.type !== "chunk") continue;
        packageCount += dependencyCount;

        let tree;
        const modules = await Promise.all(
          Object.entries(bundle.modules).map(([id, { renderedLength, code }]) =>
            ModuleLengths({ id, renderedLength, code })
          )
        );
        tree = buildTree(bundleId, modules, mapper);
        if (tree.children.length === 0) {
          const bundleSizes = await ModuleLengths({
            id: bundleId,
            renderedLength: bundle.code.length,
            code: bundle.code,
          });

          const facadeModuleId = bundle.facadeModuleId ?? `${bundleId}-unknown`;
          const bundleUid = mapper.setNodePart(
            bundleId,
            facadeModuleId,
            bundleSizes
          );
          mapper.setNodeMeta(facadeModuleId, { isEntry: true });
          const leaf = { name: bundleId, uid: bundleUid };
          roots.push(leaf);
        } else {
          roots.push(tree);
        }
      }
    //   const newTree = [
    //     {
    //       name: "root",
    //       children: roots,
    //       isRoot: true,
    //     },
    //   ];

      const nodeParts = mapper.getNodeParts();
      const nodeMetas = mapper.getNodeMetas();

      chunkCount = Object.keys(outputBundle).length;

      let outputBundlestats = {
        bundleObj: {
          projectRoot: projectRoot,
          startTime: startTime.toLocaleString(),
          time: Date.now() - startTime,
          totalSize: Number(totalSize / 1000).toFixed(2),
          assetCount,
          chunkCount,
          packageCount,
          jsSize: Number(jsSize / 1000).toFixed(2),
          cssSize: Number(cssSize / 1000).toFixed(2),
          imageSize: Number(imageSize / 1000).toFixed(2),
          htmlSize: Number(htmlSize / 1000).toFixed(2),
          fontSize: Number(fontSize / 1000).toFixed(2),
        },
        tableData,
        treeData: roots,
      };

      const chartScript = createHtml(outputBundlestats);
      fs.writeFileSync(path.join("./dist", "outputBundle.html"), chartScript);
      //   fs.writeFileSync(
      //     path.join("./dist", "outputBundlestats.text"),
      //     JSON.stringify(outputBundlestats)
      //   );

      //   fs.writeFileSync(
      //     path.join("./dist", "outputBundle.text"),
      //     JSON.stringify(outputBundle)
      //   );
      //   fs.writeFileSync(path.join("./dist", "outputBundle.html"), chartScript);
        fs.writeFileSync(
          path.join("./dist", "stats.text"),
          JSON.stringify(roots)
        );
      //   fs.writeFileSync(
      //     path.join("./dist", "nodeParts.text"),
      //     JSON.stringify(nodeParts)
      //   );
      //   fs.writeFileSync(
      //     path.join("./dist", "nodeMetas.text"),
      //     JSON.stringify(nodeMetas)
      //   );
    },
  };
}

module.exports = visualizer;
