import React, { memo } from "react";
import AutoSize from "react-virtualized-auto-sizer";
import { Tree, TreeApi } from "react-arborist";
import {  TreeNode } from "./treeNode";
import useBackend from "./backend";
import LoadingIcon from "../LoadingIcon";
import fileStore from "./fileStore";

const  FileTree = ()=> {
  const backend = useBackend();
  const loading = fileStore((state) => state.loading);

  if (loading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        <LoadingIcon color="black" />
      </div>
    );
  }

  return (
    <AutoSize>
      {(props: any) => (
        <Tree
          //@ts-ignore
          ref={(tree: TreeApi) => {
            // @ts-ignore
            global.tree = tree;
          }}
          data={backend.data}
          getChildren="children"
          isOpen="isOpen"
          indent={24}
          onMove={backend.onMove}
          onToggle={backend.onToggle}
          onEdit={backend.onEdit}
          // rowHeight={22}
          width={props.width}
          height={props.height}
        >
          {TreeNode}
        </Tree>
      )}
    </AutoSize>
  );
}

export default memo(FileTree)

