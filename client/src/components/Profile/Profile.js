import React, { useState, useEffect } from "react";
import { QUERY_USER } from "../../utils/queries";
import { UPDATE_USER_ICON } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import "./Profile.css";

// Profile shows info on current user and allows updating
export default function Profile() {
  const [formState, setFormState] = useState("");
  const { data } = useQuery(QUERY_USER);
  const [updateUserIcon] = useMutation(UPDATE_USER_ICON);
  const [file, setFile] = useState();
  const [iconURL, setIconURL] = useState();

  // Effect to create a preview whenever file is changed
  useEffect(() => {
    if (!file) {
      setIconURL(undefined);
      return;
    }

    const url = URL.createObjectURL(file);
    setIconURL(url);

    // Free memory whenever this component is unmounted
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // save and send image
    console.log(file);
    // const currentUser = user._id;
    // console.log(currentUser);
    try {
      const updatedUserIcon = await updateUserIcon({
        variables: {
          file: file,
        },
      });

      console.log(updatedUserIcon);
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div className="profile">
      <form className="icon" onSubmit={handleFormSubmit}>
        <div className="profile-header">
          <input
            className="icon-upload-btn"
            type="file"
            name="userIcon"
            accept="image/jpeg,image/png"
            onChange={(e) => setFile(e.target.files[0])}
            filename={file}
          ></input>
          <img
            srcSet={iconURL}
            className="profile-icon"
            alt="icon"
            loading="lazy"
          />

          <span className="profile-bio">bio</span>
        </div>
        <div className="profile-info">
          {/* Username */}
          <p>Username: </p>
          {/* Email */}
          <p>Email: </p>
          {/* Password */}
        </div>
        <button type="submit">Save info</button>
      </form>
    </div>
  );
}
