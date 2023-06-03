import React, { useEffect } from "react";
import "./Canvas.css";

const DrawCanvas = () => {
  // Get canvas object
  const userCanvas = React.useRef(null);

  // Use ctx to affect the canvas
  const ctx = userCanvas.getContext("2d");

  // Set starting variables
  let prevX = null;
  let prevY = null;
  let draw = false;
  ctx.lineWidth = 5;

  // Change stroke colour
  const changeColour = (clr) => {
    ctx.strokeStyle = clr;
  };

  // Change line width
  const changeWidth = (width) => {
    ctx.lineWidth = width.value;
  };

  // Clear functionality
  const clearCanvas = () => {
    ctx.clearRect(0, 0, userCanvas.width, userCanvas.height);
  };

  // Save and send functionality - needs work
  const sendCanvas = () => {
    let data = userCanvas.toDataURL("imag/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";

    // should save data as a chat message / should be merged with chat submit btn
    a.click();
    // on click, send the message
  };

  // Set draw to true when mouse is pressed
  userCanvas.addEventListener("mousedown", (e) => (draw = true));
  // Set draw to false when mouse is released
  userCanvas.addEventListener("mouseup", (e) => (draw = false));
  // Follow mouse position
  userCanvas.addEventListener("mousemove", (e) => {
    // Draw when mouse is clicked
    if (prevX == null || prevY == null || !draw) {
      prevX = e.clientX;
      prevY = e.clientY;
      return;
    }

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
      <div className="canvas-nav">
        {/* Colour options: black, white, yellow, green, red */}
        <button className="clr-btn" onClick={changeColour("#000")}></button>
        <button className="clr-btn" onClick={changeColour("#fdec03")}></button>
        <button className="clr-btn" onClick={changeColour("#24d102")}></button>
        <button className="clr-btn" onClick={changeColour("#d10202")}></button>
        <button className="clr-btn" onClick={changeColour("#fff")}></button>
        {/* option to change line width with slider */}
        <div className="line-width">
          <input
            type="range"
            className="line-width"
            min={1}
            max={10}
            onChange={changeWidth}
            value={5}
          />
        </div>
        <button className="clear-btn" onClick={clearCanvas}>
          clear
        </button>
        <button className="send-btn" onClick={sendCanvas}>
          send
        </button>
      </div>
    </div>
  );
};

export default DrawCanvas;
