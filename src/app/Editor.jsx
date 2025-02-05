import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import pptxgen from "pptxgenjs";

import { closestCenter, DndContext } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { headings } from "../components/headings-data"
import DraggableItem from "../components/DraggableItem";
import DroppableSection from "../components/DroppableSection";

const layout_section_sizing = [
  {
    layout: 1,
    sections: [{ x: 0.5, y: 0.45, w: "90%", h: "84%" }],
  },
  {
    layout: 2,
    sections: [
      { x: 0.5, y: 0.45, w: "44%", h: "84%" },
      {
        x: 5.1,
        y: 0.45,
        w: "44%",
        h: "84%",
      },
    ],
  },
  {
    layout: 3,
    sections: [
      { x: 0.5, y: 0.45, w: "44%", h: "41%" },
      {
        x: 5.1,
        y: 0.45,
        w: "44%",
        h: "41%",
      },
      {
        x: 0.5,
        y: 2.85,
        w: "44%",
        h: "41%",
      },
      {
        x: 5.1,
        y: 2.85,
        w: "44%",
        h: "41%",
      },
    ],
  },
];

const Editor = () => {
  const [slides, setSlides] = useState([]);
  const [isDragging, setIsDragging] = useState(false)

  const createNewSlide = (layout) => {
    let content = {};
    if (layout === 3) content = { 0: null, 1: null, 2: null, 3: null };
    else if (layout === 2) content = { 0: null, 1: null };
    else if (layout === 1) content = { 0: null };

    const lastElement = [...slides].pop();
    setSlides([
      ...slides,
      { id: lastElement ? lastElement.id + 1 : 0, layout, content },
    ]);
  };

  const exportPPTX = () => {
    let pptx = new pptxgen();
    slides.forEach((item) => {
      let slide = pptx.addSlide();
      const coordinates = layout_section_sizing.filter(
        (c) => c.layout === item.layout
      )[0];

      for (const [key, value] of Object.entries(item.content)) {
        if (value.type === "image") {
          slide.addImage({
            path: value.content,
            type: "cover",
            ...coordinates.sections[key],
          });
        } else if (value.type === "text") {
          slide.addText(value.content, {
            fontSize: 14,
            align: "left",
            color: "008899",
            ...coordinates.sections[key],
          });
        }
      }
    });

    pptx.writeFile({ fileName: "example-01-slides.pptx" });
  };

  const onRemoveSlide = (idx) => {
    setSlides(slides.filter((s) => s.id !== idx));
  };

  const updateSlideContent = (idx, section, content) => {
    const newSlides = slides.map((s) => {
      if (s.id === idx) {
        return { ...s, content: { ...s.content, [section]: content } };
      } else {
        return s;
      }
    });

    setSlides(newSlides);
  };

  const layoutCell = (
    <div className="flex flex-col justify-center grow border-2 border-dashed border-slate-400 opacity-75">
      <p className="text-black opacity-200 text-slate-500">+</p>
    </div>
  );

  const handleDragStart = (event) => {
    setIsDragging(true)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const droppedId = over.id.split("-")[1];
    const droppedSection = over.id.split("-")[2];

    updateSlideContent(
      Number(droppedId),
      Number(droppedSection),
      active.data.current
    );
    setIsDragging(false)
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      autoScroll={{ layoutShiftCompensation: false }}
      modifiers={[snapCenterToCursor]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-dvh w-dvw relative overflow-y-hidden">
        <div className="basis-2/12 bg-slate-200 h-full">
          <h2 className="p-4 text-2xl font-medium text-[#646cff]">
            React PptxGenJS
          </h2>
          <ul className="list-none px-3">
            {headings.map((item, idx) => (
              <li key={idx} className="border-b-1 border-slate-300">
                <DraggableItem id={`draggable-${idx}`} item={item} />
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-10/12 flex flex-col items-center gap-4 overflow-y-auto">
          <div className="flex justify-end w-full p-4 fixed top-0 right-0">
            <button
              className="bg-[#646cff] hover:bg-slate-500 text-white shadow-md"
              onClick={exportPPTX}
            >
              Export PPTX
            </button>
          </div>
          <h2 className="mt-20 text-2xl font-bold text-slate-600">
            Start creating your AI Powered Presentation
          </h2>
          {slides.map((item) => (
            <div key={item.id} className="relative">
              <button
                className="absolute top-4 right-4 z-10 !p-2 bg-slate-300 opacity-50 !rounded-3xl"
                onClick={() => onRemoveSlide(item.id)}
              >
                <IoClose />
              </button>
              <section
                className="slide bg-slate-200 shadow-md relative z-0"
                style={{ width: "10in", minHeight: "5.625in" }}
              >
                <div className="p-10 h-[5.625in]">
                  {item?.layout === 1 ? (
                    <div className="flex justify-center items-center h-full border-2 border-dashed border-slate-400 opacity-75">
                      <DroppableSection item={item} section={0} isDragging={isDragging} />
                    </div>
                  ) : item?.layout === 2 ? (
                    <div className="flex flex-row h-full gap-2">
                      <div className="basis-1/2 flex justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                        <DroppableSection item={item} section={0} isDragging={isDragging} />
                      </div>
                      <div className="basis-1/2 flex justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                        <DroppableSection item={item} section={1} isDragging={isDragging} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row h-full gap-2">
                      <div className="basis-1/2 flex flex-col gap-2">
                        <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                          <DroppableSection item={item} section={0} isDragging={isDragging} />
                        </div>
                        <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                          <DroppableSection item={item} section={2} isDragging={isDragging} />
                        </div>
                      </div>
                      <div className="basis-1/2 flex flex-col gap-2">
                        <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                          <DroppableSection item={item} section={1} isDragging={isDragging} />
                        </div>
                        <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                          <DroppableSection item={item} section={3} isDragging={isDragging} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          ))}
          <section
            className="flex flex-row gap-4"
            style={{ width: "10in", minHeight: "2in" }}
          >
            <button
              className="basis-1/3 bg-slate-200 rounded-none"
              onClick={() => createNewSlide(1)}
            >
              <div className="flex justify-center items-center h-[90%] border-2 border-dashed border-slate-400 opacity-75">
                <p className="text-black opacity-200 text-slate-500">+</p>
              </div>
            </button>
            <button
              className="basis-1/3 bg-slate-200 rounded-none"
              onClick={() => createNewSlide(2)}
            >
              <div className="flex flex-row h-[90%] gap-2">
                {layoutCell}
                {layoutCell}
              </div>
            </button>
            <button
              className="basis-1/3 bg-slate-200 rounded-none"
              onClick={() => createNewSlide(3)}
            >
              <div className="flex flex-row h-[90%] gap-2">
                <div className="basis-1/2 flex flex-col gap-2">
                  {layoutCell}
                  {layoutCell}
                </div>
                <div className="basis-1/2 flex flex-col gap-2">
                  {layoutCell}
                  {layoutCell}
                </div>
              </div>
            </button>
          </section>
        </div>
      </div>
    </DndContext>
  );
};

export default Editor;
