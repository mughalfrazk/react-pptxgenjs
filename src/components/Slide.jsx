import React from "react";
import { IoImage } from "react-icons/io5";
import { LuScanText } from "react-icons/lu";

const AddButtons = () => {
return (
    <div className="flex gap-2">
      <button className="flex flex-col items-center justify-between bg-slate-300 text-slate-900">
        <IoImage className="text-slate-900" size={30} />
        Add Image
      </button>
      <button className="flex flex-col items-center justify-between bg-slate-300 text-slate-900">
        <LuScanText className="text-slate-900" size={28} />
        Add Text
      </button>
    </div>
  );
};

const Slide = ({ layout }) => {
  return (
    <section
      className="slide bg-slate-200 shadow-md"
      style={{ width: "10in", minHeight: "5.625in" }}
    >
      <div className="p-10 h-[5.625in] ">
        {layout === 1 ? (
          <div className="flex justify-center items-center h-full border-2 border-dashed border-slate-400 opacity-75">
            <AddButtons />
          </div>
        ) : layout === 2 ? (
          <div className="flex flex-row h-full gap-2">
            <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
              <AddButtons />
            </div>
            <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
              <AddButtons />
            </div>
          </div>
        ) : (
          <div className="flex flex-row h-full gap-2">
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                <AddButtons />
              </div>
              <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                <AddButtons />
              </div>
            </div>
            <div className="basis-1/2 flex flex-col gap-2">
              <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                <AddButtons />
              </div>
              <div className="flex flex-grow justify-center items-center border-2 border-dashed border-slate-400 opacity-75">
                <AddButtons />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Slide;
