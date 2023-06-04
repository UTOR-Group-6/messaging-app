import React, { useEffect } from "react";
import "./Chat.css";
import Message from "../components/Message";
import Upload from "../components/Upload";
import DrawCanvas from "../components/Canvas";
import { QUERY_CHAT } from "../utils/API";

import Auth from "../utils/auth";

export default function Chat() {
  const [imgFile, setFile] = useState();

  const renderImg = () => {
    if (imgFile) {
      return (
        <div className="upload-wrapper">
          {/* Remove image */}
          <button>X</button>
          {/* Show image before sending */}
          <img srcSet={imgFile} alt="Image to be sent" loading="lazy" />
        </div>
      );
    } else return;
  };

  // to upload an image
  const handleFileChange = (e) => {
    // Set target file
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

    // Upload image to mongoose
    fetch()
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
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
            {renderImg}
            <button className="chat-upload-btn">
              <input
                className="btn-file-input"
                type="file"
                accept="image/gif,image/jpeg,image/png"
                onChange={handleFileChange}
              />
              +
            </button>
            <textarea
              className="chat-input-ta"
              placeholder="send a message"
            ></textarea>
            {/* Replace with submit on enter?*/}
            <button className="chat-submit-btn">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
