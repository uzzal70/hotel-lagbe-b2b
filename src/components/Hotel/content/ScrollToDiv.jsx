import React, { useRef, useState } from "react";

const ScrollToDiv = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);

  const handleScrollToDiv = (divRef, divName) => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
    setSelectedDiv(divName);
  };

  return (
    <div>
      <button onClick={() => handleScrollToDiv(div1Ref, "div1")}>
        Scroll to Div 1
      </button>
      <button onClick={() => handleScrollToDiv(div2Ref, "div2")}>
        Scroll to Div 2
      </button>
      <button onClick={() => handleScrollToDiv(div3Ref, "div3")}>
        Scroll to Div 3
      </button>

      <div
        ref={div1Ref}
        style={{
          height: "200px",
          backgroundColor: selectedDiv === "div1" ? "yellow" : "lightgray",
          margin: "20px",
        }}
      >
        Div 1
      </div>

      <div
        ref={div2Ref}
        style={{
          height: "200px",
          backgroundColor: selectedDiv === "div2" ? "yellow" : "lightgray",
          margin: "20px",
        }}
      >
        Div 2
      </div>

      <div
        ref={div3Ref}
        style={{
          height: "200px",
          backgroundColor: selectedDiv === "div3" ? "yellow" : "lightgray",
          margin: "20px",
        }}
      >
        Div 3
      </div>
    </div>
  );
};

export default ScrollToDiv;
