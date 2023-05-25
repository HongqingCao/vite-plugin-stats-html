// 导入相关类型和函数
const getUid = (alphabit, size) => () => {
  let result = "";
  for (let i = 0; i < size; i++) {
    result += alphabit[(Math.random() * alphabit.length) | 0];
  }
  return result;
};
// 生成唯一前缀
const nanoid = getUid("1234567890abcdef", 4);
const UNIQUE_PREFIX = nanoid();
let COUNTER = 0;

// 生成唯一 ID
const uniqueId = () => `${UNIQUE_PREFIX}-${COUNTER++}`;

// 定义模块 ID 存储类型
// 包括模块的 UID 和元数据
// 元数据包括导入/导出相关信息
// imported 和 importedBy 是指被模块导入和导出的模块的 ID 集合
// 实现了 Omit 泛型，可以从 ModuleMeta 接口中剔除某些属性
// 从而定义一个新的类型
// 该类型中的 ModuleMeta 不包含 imported 和 importedBy 属性
// 而包含了这些属性的 Set 集合
// 目的是避免在生成 ESM 格式的代码时，因为循环依赖导致的无限递归问题
// 这样可以通过 Set 来避免重复导入/导出同一个模块
// 能够更好地处理模块间的循环依赖问题
// 在生成 ESM 格式的代码时，需要将 Set 转换为数组
// 并根据数组元素中的 dynamic 属性来判断是否为动态导入
// 从而构建正确的依赖关系
// 同时需要将 Set 中的字符串类型转换为对象类型
// 以便在生成模块依赖图时能够正确处理
// 导出 ModuleMapper 类
export const ModuleMapper = class ModuleMapper {
  // 定义节点部分和节点元数据
  // 节点部分以模块的 UID 为键，存储模块部分的长度信息
  // 节点元数据以模块的 ID 为键，存储模块的 UID 和元数据
  // 元数据包括模块 ID、模块部分、导入模块和被导入模块的 ID 集合等信息
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.nodeParts = {};
    this.nodeMetas = {};
  }

  // 去除模块 ID 中的项目根路径前缀
  trimProjectRootId(moduleId) {
    if (
      typeof this.projectRoot === "string" &&
      moduleId.startsWith(this.projectRoot)
    ) {
      return moduleId.slice(this.projectRoot.length);
    }
    return moduleId.replace(this.projectRoot, "");
  }

  // 获取模块 ID 对应的 UID
  getModuleUid(moduleId) {
    if (!(moduleId in this.nodeMetas)) {
      this.nodeMetas[moduleId] = {
        uid: uniqueId(),
        meta: {
          id: this.trimProjectRootId(moduleId),
          moduleParts: {},
          imported: new Set(),
          importedBy: new Set(),
        },
      };
    }
    return this.nodeMetas[moduleId].uid;
  }

  // 获取 bundle ID 和模块 ID 对应的 UID
  getBundleModuleUid(bundleId, moduleId) {
    if (!(moduleId in this.nodeMetas)) {
      this.nodeMetas[moduleId] = {
        uid: uniqueId(),
        meta: {
          id: this.trimProjectRootId(moduleId),
          moduleParts: {},
          imported: new Set(),
          importedBy: new Set(),
        },
      };
    }
    if (!(bundleId in this.nodeMetas[moduleId].meta.moduleParts)) {
      this.nodeMetas[moduleId].meta.moduleParts[bundleId] = uniqueId();
    }
    return this.nodeMetas[moduleId].meta.moduleParts[bundleId];
  }

  // 设置节点部分
  setNodePart(bundleId, moduleId, value) {
    const uid = this.getBundleModuleUid(bundleId, moduleId);
    if (uid in this.nodeParts) {
      throw new Error(
        `Override module: bundle id ${bundleId}, module id ${moduleId}, value ${JSON.stringify(
          value
        )}, existing value: ${JSON.stringify(this.nodeParts[uid])}`
      );
    }
    this.nodeParts[uid] = { ...value, metaUid: this.getModuleUid(moduleId) };
    return uid;
  }

  // 设置节点元数据
  setNodeMeta(moduleId, value) {
    this.getModuleUid(moduleId);
    this.nodeMetas[moduleId].meta.isEntry = value.isEntry;
    this.nodeMetas[moduleId].meta.isExternal = value.isExternal;
  }

  // 检查是否存在节点部分
  hasNodePart(bundleId, moduleId) {
    if (!(moduleId in this.nodeMetas)) {
      return false;
    }
    if (!(bundleId in this.nodeMetas[moduleId].meta.moduleParts)) {
      return false;
    }
    if (
      !(this.nodeMetas[moduleId].meta.moduleParts[bundleId] in this.nodeParts)
    ) {
      return false;
    }
    return true;
  }

  // 获取节点部分
  getNodeParts() {
    return this.nodeParts;
  }

  // 获取节点元数据
  getNodeMetas() {
    const nodeMetas = {};
    for (const { uid, meta } of Object.values(this.nodeMetas)) {
      nodeMetas[uid] = {
        ...meta,
        imported: [...meta.imported].map((rawImport) => {
          const [uid, dynamic] = rawImport.split(",");
          const importData = { uid };
          if (dynamic === "true") {
            importData.dynamic = true;
          }
          return importData;
        }),
        importedBy: [...meta.importedBy].map((rawImport) => {
          const [uid, dynamic] = rawImport.split(",");
          const importData = { uid };
          if (dynamic === "true") {
            importData.dynamic = true;
          }
          return importData;
        }),
      };
    }
    return nodeMetas;
  }

  // 添加被导入模块链接
  addImportedByLink(targetId, sourceId) {
    const sourceUid = this.getModuleUid(sourceId);
    this.getModuleUid(targetId);
    this.nodeMetas[targetId].meta.importedBy.add(sourceUid);
  }

  // 添加导入模块链接
  addImportedLink(sourceId, targetId, dynamic = false) {
    const targetUid = this.getModuleUid(targetId);
    this.getModuleUid(sourceId);
    this.nodeMetas[sourceId].meta.imported.add(String([targetUid, dynamic]));
  }
};
