import React, { useEffect } from "react";
import "./Canvas.css";

const DrawCanvas = () => {
  // watch the canvas so that on submit, setCanvas becomes a jpeg
  const userCanvas = React.useRef(null);

  const ctx = userCanvas.getContext("2d");

  // get previous mouse positions in order to draw a line
  let prevX = null;
  let prevY = null;

  // set line thickness
  ctx.lineWidth = 5;

  // set so that drawing can be controlled
  let draw = false;

  // Clear functionality
  const clearCanvas = () => {
    ctx.clearRect(0, 0, userCanvas.width, userCanvas.height);
  };

  // Save functionality
  const saveCanvas = () => {
    let data = userCanvas.toDataURL("imag/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();
    // on click, send the sketch as a message
  };

  // Set draw to true when mouse is pressed
  userCanvas.addEventListener("mousedown", (e) => (draw = true));
  // Set draw to false when mouse is released
  userCanvas.addEventListener("mouseup", (e) => (draw = false));

  userCanvas.addEventListener("mousemove", (e) => {
    // if draw is false, don't draw
    if (prevX == null || prevY == null || !draw) {
      prevX = e.clientX;
      prevY = e.clientY;
      return;
    }

    // Draw line
    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    prevX = currentX;
    prevY = currentY;
  });

  return (
    <div className="canvas-container">
      <canvas id="canvas" className="canvas" ref={userCanvas}></canvas>
      {/* Nav buttons for choosing colours, line width */}
      <div class="canvas-nav">
        {/* Colour options */}
        <div class="clr" data-clr="#000"></div>
        <div class="clr" data-clr="#EF626C"></div>
        <div class="clr" data-clr="#fdec03"></div>
        <div class="clr" data-clr="#24d102"></div>
        <div class="clr" data-clr="#fff"></div>
        {/* {option to change line width} */}
        {/* option to use eraser */}
        <button class="clear-btn" onClick={clearCanvas}>
          clear
        </button>
        <button class="save-btn" onClick={saveCanvas}>
          save
        </button>
      </div>
    </div>
  );
};

export default DrawCanvas;
