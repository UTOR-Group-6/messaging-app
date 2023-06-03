import React from "react";
import "./Chat.css";
import Message from "../components/Message";
import DrawCanvas from "../components/Canvas";

import Auth from "../utils/auth";

export default function Chat() {
  let popCanvas = null;
  let displayCanvas = false;

  const renderCanvas = () => {
    // toggle canvas on button click
    this.setState({ displayCanvas: !this.state.displayCanvas });
  };

  if (displayCanvas) {
    popCanvas = <DrawCanvas />;
  }

  return (
    <div className="chat-div">
      <div className="chat">
        <div className="chat-wrapper">
          <div className="chat-output">
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
          <div className="canvas-popup">{popCanvas}</div>
          <div className="chat-input">
            <button className="chat-canvas-btn" onClick={renderCanvas}>
              Canvas
            </button>
            <textarea
              className="chat-input-ta"
              placeholder="send a message"
            ></textarea>
            <button className="chat-submit-btn">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
