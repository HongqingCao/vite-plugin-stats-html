const isModuleTree = (folder) => "children" in folder;

const addToPath = (moduleId, tree, modulePath, node) => {
  if (modulePath.length === 0) {
    throw new Error(`Error adding node to path ${moduleId}`);
  }

  const [head, ...rest] = modulePath;
  if (rest.length === 0) {
    tree.children.push({ ...node, name: head });
    return;
  } else {
    let newTree = tree.children.find(
      (folder) => folder.name === head && isModuleTree(folder)
    );
    if (!newTree) {
      newTree = { name: head, children: [] };
      tree.children.push(newTree);
    }
    addToPath(moduleId, newTree, rest, node);
    return;
  }
};

const mergeSingleChildTrees = (tree) => {
  if (tree.children.length === 1) {
    const child = tree.children[0];
    const name = `${tree.name}/${child.name}`;
    if (isModuleTree(child)) {
      tree.name = name;
      tree.children = child.children;
      return mergeSingleChildTrees(tree);
    } else {
      return {
        name,
        uid: child.uid,
        value:child.value,
      };
    }
  } else {
    tree.children = tree.children.map((node) => {
      if (isModuleTree(node)) {
        return mergeSingleChildTrees(node);
      } else {
        return node;
      }
    });
    return tree;
  }
};

export  const buildTree = (bundleId, modules, mapper) => {
  const tree = {
    name: bundleId,
    children: [],
  };

  for (const { id, renderedLength } of modules) {
    const bundleModuleUid = mapper.setNodePart(bundleId, id, {
      renderedLength,
    });

    const trimmedModuleId = mapper.trimProjectRootId(id);

    const pathParts = trimmedModuleId.split(/\\|\//).filter((p) => p !== "");
    addToPath(trimmedModuleId, tree, pathParts, {
      uid: bundleModuleUid,
      value: renderedLength,
    });
  }

  tree.children = tree.children.map((node) => {
    if (isModuleTree(node)) {
      return mergeSingleChildTrees(node);
    } else {
      return node;
    }
  });

  return tree;
};

