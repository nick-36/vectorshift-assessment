import React from "react";
import BaseNode from "./baseNode";
import { nodeConfigs } from "./nodeConfigs";
import { useStore } from "./../store";
import { NodeConfig } from "./nodeConfigs";

interface AbstractNodeProps {
  id: string;
  type: string;
  data: Record<string, any>;
}

const AbstractNode: React.FC<AbstractNodeProps> = ({ id, type, data }) => {
  const config: NodeConfig = nodeConfigs[type];
  const { updateNodeField } = useStore();

  const handleChange = (name: string, value: any) => {
    updateNodeField(id, name, value);
  };

  const content = (
    <div className="flex flex-col space-y-4">
      {config.fields &&
        config.fields.map((field) => (
          <label key={field.name} className="flex flex-col">
            <span className="text-sm text-gray-500">{field.label}</span>
            {field.type === "text" && (
              <input
                type="text"
                value={data[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-full"
              />
            )}
            {field.type === "select" && (
              <select
                value={data[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="mt-1 px-3 py-2 border border-gray-300 rounded-full"
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {field.type === "textarea" && (
              <textarea
                value={data[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            )}
            {field.type === "para" && <span>This is a LLM.</span>}
          </label>
        ))}
    </div>
  );

  return (
    <BaseNode
      id={id}
      title={config.title}
      handles={config.handles}
      content={content}
    />
  );
};

export default AbstractNode;
