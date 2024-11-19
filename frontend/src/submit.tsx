import { Edge, Node } from "reactflow";
import { useStore } from "./store";
import axios from "axios";
import { useState } from "react";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const transformedNodes = nodes.map((node: Node) => ({ id: node.id }));
      const transformedEdges = edges.map((edge: Edge) => ({
        source: edge.source,
        target: edge.target,
      }));

      const data = {
        nodes: transformedNodes,
        edges: transformedEdges,
      };
      const apiUrl =
        process.env.REACT_APP_ENVIRONMENT === "development"
          ? "http://localhost:8000/pipelines/parse"
          : "https://vectorshift-assessment.onrender.com/pipelines/parse";

      const response = await axios.post(apiUrl, data);

      const result = response.data;

      alert(
        `Number of nodes: ${result.num_nodes}\n` +
          `Number of edges: ${result.num_edges}\n` +
          `Is DAG: ${result.is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting the data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="px-2 py-1 rounded-md bg-gray-950 text-white font-semibold border-solid border-2 border-gray-800"
        type="button"
        onClick={handleSubmit}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};
