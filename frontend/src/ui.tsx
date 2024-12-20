import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Node,
  Edge,
  ReactFlowInstance,
  Connection,
  ConnectionLineType,
} from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import AbstractNode from "./nodes/abstractNode";
import { nodeConfigs } from "./nodes/nodeConfigs";
import "reactflow/dist/style.css";
import TextNode from "./nodes/textNode";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: AbstractNode,
  customOutput: AbstractNode,
  llm: AbstractNode,
  fileSave: AbstractNode,
  note: AbstractNode,
  dataLoader: AbstractNode,
  transformer: AbstractNode,
  integration: AbstractNode,
  text: TextNode,
};

const selector = (state: any) => ({
  nodes: state.nodes as Node[],
  edges: state.edges as Edge[],
  getNodeID: state.getNodeID as (type: string) => string,
  addNode: state.addNode as (node: Node) => void,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

type NodeType = keyof typeof nodeConfigs;

interface AppData {
  nodeType: NodeType;
}

export const PipelineUI: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID: string, type: NodeType) => {
    const config = nodeConfigs[type];
    return config ? { id: nodeID, nodeType: type, ...config.defaultData } : {};
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appDataString = event.dataTransfer.getData("application/reactflow");

      if (appDataString) {
        const appData: AppData = JSON.parse(appDataString);
        const type = appData.nodeType;

        if (!type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode: Node = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: "100vw", height: "80vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect as (params: Connection | Edge) => void}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType={ConnectionLineType.Bezier}
        style={{ backgroundColor: "#F7F9FB" }}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default PipelineUI;
