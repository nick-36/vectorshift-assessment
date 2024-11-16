import { HandleType, Position } from "reactflow";

export interface NodeConfig {
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
  dataLoader: {
    title: "Data Loader",
    fields: [
      {
        name: "sourceType",
        label: "Source Type",
        type: "select",
        options: ["Database", "API", "File"],
      },
      {
        name: "query",
        label: "Query/Endpoint",
        type: "text",
        placeholder: "Enter query or endpoint",
      },
    ],
    handles: [
      { type: "source", position: Position.Right, id: "dataOut" },
      { type: "target", position: Position.Left, id: "dataIn" },
    ],
  },

  transformer: {
    title: "Transformer",
    fields: [
      {
        name: "transformationLogic",
        label: "Logic",
        type: "textarea",
        placeholder: "Enter logic here",
      },
    ],
    handles: [
      { type: "target", position: Position.Left, id: "input" },
      { type: "source", position: Position.Right, id: "output" },
    ],
  },

  integration: {
    title: "Integration",
    fields: [
      {
        name: "serviceName",
        label: "Service Name",
        type: "text",
        placeholder: "Enter service name",
      },
      {
        name: "apiKey",
        label: "API Key",
        type: "text",
        placeholder: "Enter API key",
      },
    ],
    handles: [
      { type: "target", position: Position.Left, id: "integrationInput" },
      { type: "source", position: Position.Right, id: "integrationOutput" },
    ],
  },
};
