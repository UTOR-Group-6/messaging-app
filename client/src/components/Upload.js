import React from "react";
import "./Upload.css";
import DrawCanvas from "../components/Canvas";

export default function Upload() {
  function renderCanvas() {}

  return (
    <div className="img-input-wrapper">
      <div className="upload-wrapper">
        <div className="btn">
          <input id="upload-file" className="btn-file-input" type="file" />
        </div>
        <p>OR</p>
        <div className="btn">Canvas</div>
      </div>
      {renderCanvas}
    </div>
  );
}
