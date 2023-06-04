import React, { useEffect } from "react";
import "./Upload.css";

export default function Upload() {
  const [imgFile, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

    //display img in div above
  };

  const handleUploadClick = () => {
    if (!imgFile) {
      return;
    }

    // Upload image
    fetch()
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="upload-wrapper">
      <div className="btn">
        <input
          className="btn-file-input"
          type="file"
          accept="image/gif,image/jpeg,image/png"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
