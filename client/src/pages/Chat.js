import React from "react";
import "./Chat.css";
import Message from "../components/Message";
import Upload from "../components/Upload";

import Auth from "../utils/auth";

export default function Chat() {
  const [displayUpload, setUpload] = useState();

  const renderUpload = () => {
    if (displayUpload) {
      return <Upload />;
    } else return;
  };

  // const handleUploadRender = () => {
  //   ;
  // };

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
          {renderUpload}
          <div className="chat-input">
            <button
              className="chat-upload-btn"
              onClick={(setUpload = !displayUpload)}
            >
              +
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
