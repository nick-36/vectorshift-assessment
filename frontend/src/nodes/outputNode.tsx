import React, { useState, ChangeEvent } from "react";
import { Position, HandleType } from "reactflow";
import BaseNode from "./baseNode";

interface OutputNodeProps {
  id: string;
  data: {
    outputName?: string;
    outputType?: string;
  };
}

export const OutputNode: React.FC<OutputNodeProps> = ({ id, data }) => {
  const [currName, setCurrName] = useState<string>(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState<string>(
    data.outputType || "Text"
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOutputType(e.target.value);
  };

  const content = (
    <div className="flex flex-col gap-2">
      <label>
        Name:
        <input
          className="ml-1 p-1"
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Type:
        <select className="ml-1" value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </div>
  );

  const handles: {
    type: HandleType;
    position: Position;
    id: string;
    style?: React.CSSProperties;
  }[] = [{ type: "target", position: Position.Left, id: "value" }];

  return (
    <BaseNode id={id} title="Output" handles={handles} content={content} />
  );
};

export default OutputNode;
