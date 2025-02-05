import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { IoIosAddCircle } from "react-icons/io";
import { IoImage } from "react-icons/io5";
import { LuScanText } from "react-icons/lu";

const DroppableSection = ({ item, section }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${item.id}-${section}`,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return item?.content?.[section] ? (
    <div className="flex flex-col items-center gap-2">
      {item?.content?.[section].type === "image" ? (
        <IoImage className="text-slate-900" size={50} />
      ) : (
        <LuScanText className="text-slate-900" size={50} />
      )}
      <h3>{item?.content?.[section].title}</h3>
    </div>
  ) : (
    <div ref={setNodeRef} style={style}>
      <div className="flex gap-2">
        <div className="flex flex-col items-center gap-2">
          <IoIosAddCircle
            size={40}
            className={isOver ? "text-green-600" : "text-slate-500"}
          />
          <h4 className="text-slate-600">
            {isOver ? "Drop Here!" : "Drag n Drop any item from the sidebar"}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DroppableSection;
