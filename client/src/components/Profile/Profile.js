import React, { useState, useEffect } from "react";
import { UPDATE_USER_ICON, UPDATE_USER_INFO } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import "./Profile.css";

// Profile shows info on current user and allows updating
export default function Profile() {
  const [data] = useQuery(QUERY_USER);
  console.log(data);
  const [infoState, setInfo] = useState({
    username: "",
    email: "",
    bio: "",
  });
  const [iconURL, setIconURL] = useState();
  const [file, setFile] = useState();
  let user;

  if (data) {
    user = data.user;
    console.log(user);
    setInfo({
      username: user.username,
      email: user.email,
      bio: user.bio,
    });
    // Need to actually get the picture
    setFile(user.icon);
  }

  const [updateUserIcon] = useMutation(UPDATE_USER_ICON);
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

  // Effect to create a preview whenever file is changed
  useEffect(() => {
    if (!file) {
      setIconURL(undefined);
      return;
    }
    // catch if file is too large (>16mb)

    // Display image without saving the file
    const url = URL.createObjectURL(file);
    setIconURL(url);

    // Free memory whenever this component is unmounted
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...infoState, [name]: value });
  };

  const handleIconSubmit = async (e) => {
    e.preventDefault();

    console.log(file);

    try {
      const updatedIconData = await updateUserIcon({
        variables: {
          file: file,
        },
      });

      console.log(updatedIconData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    console.log(infoState);

    try {
      const updatedUserInfo = await updateUserInfo({
        variables: { ...infoState },
      });

      console.log(updatedUserInfo);
      window.alert("Saved!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <div className="profile-header">
        <form className="icon-form" onSubmit={handleIconSubmit}>
          <input
            className="icon-upload-btn"
            type="file"
            name="icon"
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
          <button type="submit">Save icon</button>
        </form>
      </div>
      <div className="profile-info">
        <form className="info-form" onSubmit={handleInfoSubmit}>
          <label>Bio: {infoState.bio}</label>
          <input
            className="profile-bio"
            name="bio"
            type="text"
            value={infoState.bio}
            onChange={(event) => handleInfoChange(event)}
          />
          {/* Username */}
          <label>Username: {infoState.username}</label>
          <input
            className="profile-username"
            name="username"
            type="text"
            value={infoState.username}
            onChange={(event) => handleInfoChange(event)}
          />
          {/* Email */}
          <label>Email: {infoState.email}</label>
          <input
            className="profile-email"
            name="email"
            type="email"
            value={infoState.email}
            onChange={(event) => handleInfoChange(event)}
          />
          {/* Enable editing */}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
