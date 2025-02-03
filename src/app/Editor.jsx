import React, { useEffect, useState } from "react";
import pptxgen from "pptxgenjs"; // react-app webpack will use package.json `"module": "dist/pptxgen.es.js"` value

const Editor = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    setSlides([emptySlide]);
  }, []);

  const addSlide = () => {
    setSlides([...slides, emptySlide]);
  };

  const exportPPTX = () => {
    console.log(slides);
  };

  const onRemoveSlide = (idx) => {
    setSlides(slides.filter((item, i) => i !== idx));
  };

  const emptySlide = (idx) => (
    <section
      key={idx}
      className="slide"
      style={{ width: "10in", height: "5.625in", position: "relative" }}
    >
      <div className="editable-ctrls">
        <button className="close-btn" onClick={() => onRemoveSlide(idx)}>
          x
        </button>
        <div className="header" style={{ width: "100%" }}>
          <button className="editable">Add Header</button>
        </div>
        <div className="text">
          <button className="editable">Add Text</button>
        </div>
      </div>
    </section>
  );

  const headerText = (title) => {
    return <p style={{ fontSize: "3rem" }}>{title}</p>;
  };

  function runDemo() {
    let pptx = new pptxgen();
    let slide = pptx.addSlide({
      masterName: "Main Slide",
      sectionTitle: "React Demo Slide 01",
    });

    let dataChartRadar = [
      {
        name: "Region 1",
        labels: ["May", "June", "July", "August", "September"],
        values: [26, 53, 100, 75, 41],
      },
    ];
    slide.addChart(pptx.ChartType.radar, dataChartRadar, {
      x: 0.36,
      y: 2.25,
      w: 4.0,
      h: 4.0,
      radarStyle: "standard",
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: 4.36,
      y: 2.36,
      w: 5,
      h: 2.5,
      fill: pptx.SchemeColor.background2,
    });

    slide.addText("React Demo!", {
      x: 1,
      y: 1,
      w: "80%",
      h: 1,
      fontSize: 36,
      fill: "eeeeee",
      align: "center",
    });

    slide = pptx.addSlide();

    slide.addText("React Demo!", {
      x: 1,
      y: 0.5,
      w: "80%",
      h: 1,
      fontSize: 36,
      align: "center",
      fill: { color: "D3E3F3" },
      color: "008899",
    });

    slide.addChart(pptx.ChartType.radar, dataChartRadar, {
      x: 1,
      y: 1.9,
      w: 8,
      h: 3,
    });

    slide.addText(`PpptxGenJS version: ${pptx.version}`, {
      x: 0,
      y: 5.3,
      w: "100%",
      h: 0.33,
      fontSize: 10,
      align: "center",
      fill: "E1E1E1", //{ color: pptx.SchemeColor.background2 },
      color: "A1A1A1", // pptx.SchemeColor.accent3,
    });

    pptx.writeFile({ fileName: "pptxgenjs-demo-react.pptx" });
  }

  return (
    <div className="main-section">
      <header>
        <h1>React Powerpoint</h1>
      </header>
      <div className="row">
        <div className="left-section">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: "10px",
              gap: "0.5rem",
            }}
          >
            <button
              type="button"
              className="btn btn-success w-100 me-3"
              onClick={addSlide}
            >
              Add Slide
            </button>
            <button
              type="button"
              className="btn btn-success w-100 me-3"
              onClick={exportPPTX}
            >
              Run Demo
            </button>
          </div>
        </div>
        <div className="right-section">
          {slides.map((item, idx) => item(idx))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
