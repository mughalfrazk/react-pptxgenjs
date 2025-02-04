import React, { useEffect, useState } from "react";
import pptxgen from "pptxgenjs";

import Slide from "../components/Slide";
import { IoClose, IoImage } from "react-icons/io5";
import { LuScanText } from "react-icons/lu";

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

  useEffect(() => {
    console.log(slides);
  }, [slides]);

  const exportPPTX = () => {
    let pptx = new pptxgen();
    const text = `
      Introduction
      - Artificial Intelligence (AI) is revolutionizing various industries.
      - Businesses are leveraging AI for automation, analytics, and customer engagement.
      - This presentation explores AI's role in business growth and operational efficiency.
    `;
    const image =
      "https://plus.unsplash.com/premium_photo-1682785303642-f56eac9fbeb6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    slides.forEach((item) => {
      let slide = pptx.addSlide();
      const coordinates = layout_section_sizing.filter(
        (c) => c.layout === item.layout
      )[0];

      if (item.layout === 1) {
        for (const [key, value] of Object.entries(item.content)) {
          if (value === "image") {
            slide.addImage({
              path: image,
              type: "cover",
              ...coordinates.sections[key],
            });
          } else if (value === "text") {
            slide.addText(text, {
              fontSize: 20,
              align: "left",
              color: "008899",
              ...coordinates.sections[key],
            });
          }
        }
      } else if (item.layout === 2) {
        for (const [key, value] of Object.entries(item.content)) {
          if (value === "image") {
            slide.addImage({
              path: image,
              type: "cover",
              ...coordinates.sections[key],
            });
          } else if (value === "text") {
            slide.addText(text, {
              fontSize: 14,
              align: "left",
              color: "008899",
              ...coordinates.sections[key],
            });
          }
        }
      } else if (item.layout === 3) {
        for (const [key, value] of Object.entries(item.content)) {
          if (value === "image") {
            slide.addImage({
              path: image,
              type: "cover",
              ...coordinates.sections[key],
            });
          } else if (value === "text") {
            slide.addText(text, {
              fontSize: 14,
              align: "left",
              color: "008899",
              ...coordinates.sections[key],
            });
          }
        }
      }
    });

    pptx.writeFile({ fileName: "example-01-slides.pptx" });
  };

  const onRemoveSlide = (idx) => {
    setSlides(slides.filter((s) => s.id !== idx));
  };

  const updateSlideContent = (idx, section, content) => {
    console.log(idx, section, content);

    const newSlides = slides.map((s, i) => {
      if (s.id === idx)
        return { ...s, content: { ...s.content, [section]: content } };
      else return s;
    });

    setSlides(newSlides);
  };

  const headings = [
    "Mastering Accounting",
    "Financial Statements",
    "Cash Flow vs Profit",
    "Common Mistakes",
    "Accurate Bookkeeping",
    "Tax Strategies",
    "Auditing in Business Success",
  ];

  const layoutCell = (
    <div className="flex flex-col justify-center grow border-2 border-dashed border-slate-400 opacity-75">
      <p className="text-black opacity-200 text-slate-500">+</p>
    </div>
  );

  const ContentSection = ({ item, idx, section }) => {
    return item?.content?.[section] === "image" ? (
      <div className="flex flex-col items-center gap-2">
        <IoImage className="text-slate-900" size={50} />
        <h3>Image Added!</h3>
      </div>
    ) : item?.content?.[section] === "text" ? (
      <div className="flex flex-col items-center gap-2">
        <LuScanText className="text-slate-900" size={50} />
        <h3>Text Added!</h3>
      </div>
    ) : (
      <div className="flex gap-2">
        <button
          className="flex flex-col items-center justify-between bg-slate-300 text-slate-900"
          onClick={() => updateSlideContent(item.id, section, "image")}
        >
          <IoImage className="text-slate-900" size={30} />
          Add Image
        </button>
        <button
          className="flex flex-col items-center justify-between bg-slate-300 text-slate-900"
          onClick={() => updateSlideContent(item.id, section, "text")}
        >
          <LuScanText className="text-slate-900" size={28} />
          Add Text
        </button>
      </div>
    );
  };

  return (
    <div className="flex h-dvh w-dvw">
      <div className="basis-2/12 bg-slate-200">
        <h2 className="p-4 text-2xl font-medium text-[#646cff]">
          React PptxGenJS
        </h2>
        <ul className="list-none px-6">
          {headings.map((item, idx) => (
            <li
              key={idx}
              className="border-b-1 border-slate-300 py-2.5"
            >
              <div className="flex flex-row items-center p-0 m-0">
                <LuScanText className="me-3" />
                {item}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="basis-10/12 bg-slate-100 flex flex-col items-center gap-4 overflow-y-auto">
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
        {slides.map((item, idx) => (
          <div key={item.id} className="relative">
            <button
              className="absolute top-4 right-4 z-10 !p-2 bg-slate-300 opacity-50 !rounded-3xl"
              onClick={() => onRemoveSlide(item.id)}
            >
              <IoClose />
            </button>
            <section
              className="slide bg-slate-200 shadow-md"
              style={{ width: "10in", minHeight: "5.625in" }}
            >
              <div className="p-10 h-[5.625in] ">
                {item?.layout === 1 ? (
                  <div className="flex justify-center items-center h-full border-2 border-dashed border-slate-400 opacity-75">
                    <ContentSection item={item} idx={idx} section={0} />
                  </div>
                ) : item?.layout === 2 ? (
                  <div className="flex flex-row h-full gap-2">
                    <div className="basis-1/2 flex justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                      <ContentSection item={item} idx={idx} section={0} />
                    </div>
                    <div className="basis-1/2 flex justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                      <ContentSection item={item} idx={idx} section={1} />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row h-full gap-2">
                    <div className="basis-1/2 flex flex-col gap-2">
                      <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                        <ContentSection item={item} idx={idx} section={0} />
                      </div>
                      <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                        <ContentSection item={item} idx={idx} section={2} />
                      </div>
                    </div>
                    <div className="basis-1/2 flex flex-col gap-2">
                      <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                        <ContentSection item={item} idx={idx} section={1} />
                      </div>
                      <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                        <ContentSection item={item} idx={idx} section={3} />
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
  );
};

export default Editor;
