import { useStore } from "./../store";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Handle, Position, HandleType, Connection } from "reactflow";

interface BaseNodeProps {
  id: string;
  title: string;
  handles: {
    type: HandleType;
    position: Position;
    id: string;
    style?: React.CSSProperties;
  }[];
  content: ReactNode;
}

const BaseNode: React.FC<BaseNodeProps> = ({ id, title, handles, content }) => {
  const [connectedHandles, setConnectedHandles] = useState<Set<string>>(
    new Set()
  );
  const { edges, onConnect, removeNode } = useStore();

  const updateConnectedHandles = useCallback(() => {
    const connectedIds = new Set(
      edges
        .filter((edge) => edge.source === id || edge.target === id)
        .map((edge) =>
          edge.source === id ? edge.sourceHandle : edge.targetHandle
        )
        .filter(
          (handleId): handleId is string =>
            handleId !== null && handleId !== undefined
        )
    );
    setConnectedHandles(connectedIds);
  }, [edges, id]);

  useEffect(() => {
    updateConnectedHandles();
  }, [edges, updateConnectedHandles]);

  const handleConnect = (connection: Connection) => {
    onConnect(connection);
    const handleId =
      connection.source === id
        ? connection.sourceHandle
        : connection.targetHandle;
    if (handleId) {
      setConnectedHandles((prev) => new Set(prev).add(handleId));
    }
  };

  const handleDelete = () => {
    removeNode(id);
  };

  return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-colors duration-300">
      <div className="p-4 bg-white shadow-lg rounded-md">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-gray-500 font-semibold text-md">{title}</span>
          <button
            onClick={handleDelete}
            className="text-purple-500 hover:text-red-700 font-bold"
            title="Delete Node"
          >
            ✕
          </button>
        </div>
        <div className="bg-gray-50 p-2 rounded-md border border-gray-200">
          {content}
        </div>
        {handles.map((handle, index) => (
          <Handle
            key={index}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.id}`}
            style={handle.style}
            onConnect={handleConnect}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              connectedHandles.has(`${id}-${handle.id}`)
                ? "bg-purple-600"
                : "bg-white border-2 border-purple-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(BaseNode);
  