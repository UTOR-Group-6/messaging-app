import React, { useEffect } from "react";
import "./Chat.css";
import Message from "../components/Message";
import DrawCanvas from "../components/Canvas";
import { useMutation } from "@apollo/client";
import { ADD_CHAT } from "../utils/mutations";
import { QUERY_CHATLOG, QUERY_MESSAGE } from "../utils/queries";

import Auth from "../utils/auth";

export default function Chat() {
  const [selectedImage, setImage] = useState();
  const [preview, setPreview] = useState();
  const [addChat, { error, data }] = useMutation(ADD_CHAT);

  // Effect to create a preview whenever file is changed
  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }

    const imgUrl = URL.createObjectURL(selectedImage);
    setPreview(imgUrl);

    // Free memory whenever this component is unmounted
    return () => URL.revokeObjectURL(imgUrl);
  }, [selectedImage]);

  const handleFileSelect = (e) => {
    // Set target file
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }

    // Accept only one image
    setImage(e.target.files[0]);
  };

  const renderPreview = () => {
    if (preview) {
      return (
        <div className="chat-preview">
          {/* Remove image and preview */}
          <button className="remove-img" onClick={setImage(undefined)}>
            X
          </button>
          <img srcSet={preview} alt="Image to be sent" loading="lazy" />
        </div>
      );
    } else return;
  };

  // Send message, including any images and text
  const handleFormSubmit = (e) => {};

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
            {renderPreview}
            <div className="chat-input-main">
              <button className="chat-upload-btn">
                <input
                  className="btn-file-input"
                  type="file"
                  accept="image/gif,image/jpeg,image/png"
                  onChange={handleFileSelect}
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
    </div>
  );
}
