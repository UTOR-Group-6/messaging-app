import React, { useState } from "react";
import { UPDATE_USER_INFO } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import "./ProfileForm.css";

const ProfileForm = (user) => {
  const [formState, setFormState] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
    icon: user.icon,
  });
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO);

  const handleIconChange = (e) => {
    const value = e.target.id;
    setFormState({ ...formState, icon: value });
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const updatedUserInfo = await updateUserInfo({
        variables: { ...formState },
      });

      console.log(updatedUserInfo);
      window.location.assign("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="info-form" onSubmit={handleFormSubmit}>
      <div className="profile-header icon-options">
        <button
          id="crab"
          className="icon"
          onClick={(e) => handleIconChange(e)}
        ></button>
        <button
          id="fish"
          className="icon"
          onClick={(e) => handleIconChange(e)}
        ></button>
        <button
          id="octopus"
          className="icon"
          onClick={(e) => handleIconChange(e)}
        ></button>
        <button
          id="shell"
          className="icon"
          onClick={(e) => handleIconChange(e)}
        ></button>
        <button
          id="starfish"
          className="icon"
          onClick={(e) => handleIconChange(e)}
        ></button>
        <button
          id="whale"
          className="icon"
          onClick={(e) => handleIconChange(e)}
        ></button>
      </div>
      <ul className="profile-info">
        <li className="profile-bio">
          Bio:{" "}
          <input
            type="text"
            name="bio"
            value={formState.bio}
            onChange={(event) => handleInfoChange(event)}
          />
        </li>
        <li className="profile-username">
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={(event) => handleInfoChange(event)}
          />
        </li>
        <li className="profile-email">
          Email:{" "}
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={(event) => handleInfoChange(event)}
          />
        </li>
      </ul>
      <button className="save-btn" type="submit">
        Save
      </button>
    </form>
  );
};

export default ProfileForm;
