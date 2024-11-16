// toolbar.tsx

import React from "react";
import { DraggableNode } from "./draggableNode";

export const PipelineToolbar: React.FC = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div className="flex flex-wrap gap-4 m-2">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="fileSave" label="File" />
        <DraggableNode type="note" label="Note" />
        <DraggableNode type="dataLoader" label="Dataloader" />
        <DraggableNode type="transformer" label="Transformer" />
        <DraggableNode type="integration" label="Integration" />
      </div>
    </div>
  );
};

export default PipelineToolbar;
