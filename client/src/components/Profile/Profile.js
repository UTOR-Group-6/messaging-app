import React, { useState } from "react";
import { UPDATE_USER_ICON, UPDATE_USER_INFO } from "../../utils/mutations";
import { QUERY_USER } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import "./Profile.css";

// Profile shows info on current user and allows updating
export default function Profile() {
  const { loading, data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
    console.log(user);
  }

  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
  });
  const [iconUrl, setIcon] = useState(user.icon);

  const [updateUserIcon] = useMutation(UPDATE_USER_ICON);
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

  if (loading) {
    return <p>loading!</p>;
  }

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleIconSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedIconData = await updateUserIcon({
        variables: {
          ...iconUrl,
        },
      });

      console.log(updatedIconData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const updatedUserInfo = await updateUserInfo({
        variables: { ...formState },
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
          {/* replace with 6 icon choices? merge both into one form? */}
          <div>{/* Icon choices */}</div>
          <img
            srcSet={iconUrl}
            className="profile-icon"
            alt="icon"
            loading="lazy"
          />
          <button type="submit">Save icon</button>
        </form>
      </div>
      <div className="profile-info">
        <form className="info-form" onSubmit={handleInfoSubmit}>
          <label>Bio: {formState.bio}</label>
          <input
            className="profile-bio"
            name="bio"
            type="text"
            value={formState.bio}
            onChange={(event) => handleInfoChange(event)}
          />
          {/* Username */}
          <label>Username: {formState.username}</label>
          <input
            className="profile-username"
            name="username"
            type="text"
            value={formState.username}
            onChange={(event) => handleInfoChange(event)}
          />
          {/* Email */}
          <label>Email: {formState.email}</label>
          <input
            className="profile-email"
            name="email"
            type="email"
            value={formState.email}
            onChange={(event) => handleInfoChange(event)}
          />
          {/* Enable editing */}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
