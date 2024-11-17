import { DragEvent } from "react";

export const DraggableNode = ({
  type,
  label,
}: {
  type: string;
  label: string;
}) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    const appData = { nodeType };
    (event.target as HTMLDivElement).style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} flex items-center justify-center flex-col cursor-grab p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 sm:min-w-[80px] sm:h-[60px] min-w-[60px] h-[50px]`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event: any) => (event.target as HTMLDivElement).style.cursor = "grab"}
      draggable
    >
      <span className="text-white text-sm sm:text-base">{label}</span>
    </div>
  );
};
