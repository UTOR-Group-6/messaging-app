import React from "react";
import "./Chat.css";
import Message from "../components/Message";
import DrawCanvas from "../components/Canvas";

import Auth from "../utils/auth";

export default function Chat() {
  const [displayCanvas, setDisplay] = useState(false);

  const renderChatInput = () => {
    if (displayCanvas) {
      return <DrawCanvas />;
    } else {
      return (
        <textarea
          className="chat-input-ta"
          placeholder="send a message"
        ></textarea>
      );
    }
  };

  const handleInputChange = () => {
    // toggle canvas display
    setDisplay(!displayCanvas);
  };

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
          <div className="chat-input">
            <button className="chat-canvas-btn" onClick={handleInputChange}>
              Use Canvas
            </button>
            {/* Toggle between text input and canvas */}
            {renderChatInput}
            <button className="chat-submit-btn">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
