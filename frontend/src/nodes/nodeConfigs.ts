import { HandleType, Position } from "reactflow";

interface NodeConfig {
  title: string;
  type?: string;
  fields: {
    name: string;
    label?: string;
    type: string;
    placeholder?: string;
    options?: string[];
  }[];
  handles: {
    type: HandleType;
    position: Position;
    id: string;
    style?: any;
  }[];
  customLogic?: (data: any) => {};
  defaultData?: Record<string, any>;
}

export const nodeConfigs: Record<string, NodeConfig> = {
  customInput: {
    title: "Input",
    type: "customInput",
    fields: [
      {
        name: "inputName",
        label: "Name",
        type: "text",
        placeholder: "Enter name",
      },
      {
        name: "inputType",
        label: "Type",
        type: "select",
        options: ["Text", "File"],
      },
    ],
    handles: [
      { type: "source", position: Position.Right, id: "valueOut" },
      { type: "target", position: Position.Left, id: "valueIn" },
    ],
  },
  customOutput: {
    title: "Output",
    type: "customOutput",
    fields: [
      {
        name: "outputName",
        label: "Name",
        type: "text",
        placeholder: "Enter output name",
      },
      {
        name: "outputType",
        label: "Type",
        type: "select",
        options: ["Text", "Image"],
      },
    ],
    handles: [
      { type: "target", position: Position.Left, id: "valueIn" },
      { type: "source", position: Position.Right, id: "valueOut" },
    ],
  },
  llm: {
    title: "LLM",
    type: "llm",
    fields: [
      {
        name: "llmName",
        type: "para",
      },
    ],
    handles: [
      {
        type: "target",
        position: Position.Left,
        id: "system",
        style: { top: `${100 / 3}%` },
      },

      {
        type: "target",
        position: Position.Left,
        id: "prompt",
        style: { top: `${200 / 3}%` },
      },
      {
        type: "source",
        position: Position.Right,
        id: "response",
      },
    ],
  },
  fileSave: {
    title: "File Save",
    fields: [
      {
        name: "fileName",
        label: "File Name",
        type: "text",
        placeholder: "Enter file name",
      },
      {
        name: "fileFormat",
        label: "File Format",
        type: "select",
        options: ["CSV", "JSON", "TXT"],
      },
    ],
    handles: [{ type: "target", position: Position.Left, id: "input" }],
  },
  note: {
    title: "Note",
    fields: [
      {
        name: "noteContent",
        label: "Content",
        type: "textarea",
        placeholder: "Enter your note here",
      },
    ],
    handles: [{ type: "source", position: Position.Right, id: "output" }],
  },
};
