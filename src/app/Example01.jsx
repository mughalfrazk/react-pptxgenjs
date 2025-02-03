import React from "react";
import pptxgen from "pptxgenjs";

const Exmaple01 = () => {
  const slides = [
    {
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      subtitle: "How AI is Transforming Industries",
      content: `
        Presented by: John Doe
        Date: February 2025
      `,
    },
    {
      title: "Introduction",
      content: `
        - Artificial Intelligence (AI) is revolutionizing various industries.
        - Businesses are leveraging AI for automation, analytics, and customer engagement.
        - This presentation explores AI's role in business growth and operational efficiency.
      `,
      image:
        "https://plus.unsplash.com/premium_photo-1682785303642-f56eac9fbeb6?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Understanding AI in Business",
      content: `
        - AI encompasses machine learning, natural language processing, and robotics.
        - Companies use AI to optimize processes and improve decision-making.
        - Common applications include AI-powered chatbots, recommendation systems, and fraud detection.
      `,
    },
    {
      title: "AI in Marketing & Customer Experience",
      content: `
        - AI-driven tools personalize marketing campaigns for targeted audiences.
        - Chatbots and virtual assistants enhance customer support with 24/7 availability.
        - Predictive analytics help businesses anticipate customer needs and trends.
      `,
      chart: [
        {
          name: "Actual Sales",
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          values: [1500, 4600, 5156, 3167, 8510, 8009, 6006, 7855, 12102, 12789, 10123, 15121],
        },
        {
          name: "Projected Sales",
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          values: [1000, 2600, 3456, 4567, 5010, 6009, 7006, 8855, 9102, 10789, 11123, 12121],
        },
      ],
    },
    {
      title: "Challenges of AI Adoption",
      content: `
        - Ethical concerns: AI biases and job displacement are key issues.
        - Data privacy: Companies must ensure compliance with data protection regulations.
        - High implementation costs and technical expertise are required for AI integration.
      `,
    },
    {
      title: "Future of AI in Business",
      content: `
        - AI is expected to drive further automation and innovation in various industries.
        - Emerging trends include AI-powered autonomous vehicles, smart assistants, and AI-driven creativity.
        - Businesses must adapt and invest in AI to remain competitive in the digital era.
      `,
    },
    {
      title: "Conclusion",
      content: `
        - AI is transforming the business landscape, offering numerous benefits.
        - Organizations must address challenges and implement AI responsibly.
        - The future of AI is promising, with continuous advancements shaping industries.
      `,
    },
    {
      title: "Thank You!",
      content: `
        Thank you for your time and attention!
        Any questions?
        Contact: johndoe@example.com
      `,
    },
  ];

  const exportPPTX = () => {
    let pptx = new pptxgen();

    slides.forEach((item) => {
      let slide = pptx.addSlide({
        sectionTitle: item.title,
      });

      if (item.title) {
        slide.addText(item.title, {
          x: 1,
          y: 0.5,
          w: "80%",
          h: 1,
          fontSize: 30,
          align: "center",
          fill: { color: pptx.SchemeColor.accent3 },
          color: "008899",
        });
      }

      if (item.image && item.content) {
        slide.addImage({
          path: item.image,
          x: 5,
          y: 1.5,
          w: "40%",
          h: "60%",
          type: "cover",
        });

        slide.addText(item.content, {
          x: 0.2,
          y: 1,
          w: "45%",
          h: "60%",
          fontSize: 17,
          align: "left",
          color: pptx.SchemeColor.accent5,
        });
      } else if (item.chart && item.content) {
        slide.addChart(pptx.ChartType.line, item.chart, {
          x: 1,
          y: 1,
          w: "40%",
          h: "60%",
        });

        slide.addText(item.content, {
          x: 0.2,
          y: 1,
          w: "45%",
          h: "60%",
          fontSize: 17,
          align: "left",
          color: pptx.SchemeColor.accent5,
        });
      } else if (item.content) {
        slide.addText(item.content, {
          x: 0,
          y: 1,
          w: "100%",
          h: "60%",
          fontSize: 17,
          align: "left",
          color: pptx.SchemeColor.accent5,
        });
      }

      if (item.subtitle) {
        slide.addText(item.subtitle, {
          x: 0,
          y: 1.5,
          w: "100%",
          h: 0.3,
          fontSize: 10,
          align: "center",
          color: "A1A1A1", // pptx.SchemeColor.accent3,
        });
      }
    });

    pptx.writeFile({ fileName: "example-01-slides.pptx" });
  };

  return (
    <div
      className="presentation"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <button onClick={exportPPTX} style={{ marginBottom: "1rem" }}>
        Export Slides
      </button>
      {slides.map((slide, index) => (
        <div
          key={index}
          className="slide"
          style={{
            width: "100%",
            borderBottom: "1px dashed #616161",
            padding: "10px 0",
          }}
        >
          <div
            className="body"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2
              className="heading"
              style={{ textAlign: "center", width: "80%" }}
            >
              {slide.title}
            </h2>
            <div className="content" style={{ textAlign: "left" }}>
              <p style={{ width: "550px" }}>{slide.subtitle}</p>
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{ width: 300, height: 300 }}
                />
              )}
              <p style={{ width: "550px" }}>{slide.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Exmaple01;
