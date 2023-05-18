/*
 * @Description:
 * @Version: 1.0
 * @Autor: codercao
 * @Date: 2023-05-18 21:34:54
 * @LastEditors: codercao
 * @LastEditTime: 2023-05-18 23:15:13
 */
const fs = require("fs");
const path = require("path");
import { ModuleMapper } from "./mapper";
import { buildTree } from "./buildTree";
function visualizer(options = {}) {
  const outputFile = options.output || "stats.html";
  return {
    name: "visualizer",
    async generateBundle(opts, outputBundle) {
      const projectRoot = opts.projectRoot ?? process.cwd();
      const roots = [];
      const mapper = new ModuleMapper(projectRoot);

      const ModuleLengths = async ({ id, renderedLength, code }) => {
        const isCodeEmpty = code == null || code == "";

        const result = {
          id,
          gzipLength: 10,
          brotliLength: 30,
          renderedLength: isCodeEmpty
            ? renderedLength
            : Buffer.byteLength(code, "utf-8"),
        };
        return result;
      };
      for (const [bundleId, bundle] of Object.entries(outputBundle)) {
        if (bundle.type !== "chunk") continue;
        let tree;

        const modules = await Promise.all(
          Object.entries(bundle.modules).map(([id, { renderedLength, code }]) =>
            ModuleLengths({ id, renderedLength, code })
          )
        );
        console.log("modules", modules);
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
      const newTree = {
        name: "root",
        children: roots,
        isRoot: true,
      };

      fs.writeFileSync(
        path.join("./dist", "stats.text"),
        JSON.stringify(newTree)
      );
    },
  };
}

module.exports = visualizer;
