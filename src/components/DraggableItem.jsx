import React from "react";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { IoImage } from "react-icons/io5";
import { LuScanText } from "react-icons/lu";

const DraggableItem = ({ id, item, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { ...item },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <>
      <DragOverlay>{isDragging ? item.title : null}</DragOverlay>
      <div
        ref={setNodeRef}
        className={`flex flex-row items-center px-3 py-2.5 bg-slate-200 cursor-pointer relative z-10 ${
          transform ? "shadow border border-slate-300" : ""
        }`}
        style={style}
        {...listeners}
        {...attributes}
      >
        {item.type === "image" ? (
          <IoImage className="me-3" />
        ) : (
          <LuScanText className="me-3" />
        )}
        {item.title}
      </div>
    </>
  );
};

export default DraggableItem;
