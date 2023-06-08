import React, { useState } from "react";
import { QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import ProfileForm from "./ProfileForm";
import { Link } from 'react-router-dom';
import "./Profile.css";

// Import images
import {
  crab,
  fish,
  octopus,
  shell,
  starfish,
  whale,
} from "../../assets/icons/index";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_USER);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const user = data?.user || [];
  let userIcon;

  switch (user.icon) {
    case "crab": {
      userIcon = crab;
      return;
    }
    case "fish": {
      userIcon = fish;
      return;
    }
    case "octopus": {
      userIcon = octopus;
      return;
    }
    case "shell": {
      userIcon = shell;
      return;
    }
    case "starfish": {
      userIcon = starfish;
      return;
    }
    case "whale": {
      userIcon = whale;
      return;
    }
    default: {
      userIcon = crab;
    }
  }

  const toggleUpdateProfile = () => {
    setUpdatingProfile(!updatingProfile);
  };

  return (
    <div className="profile">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="profile-body">
          <p className="welcome-msg">Welcome to Blub</p>
          <Link className="chat-link" to="/chats">Go to Chats</Link>
          {updatingProfile ? (
            <ProfileForm
              user={(user.username, user.email, user.bio, user.icon)}
            />
          ) : (
            <div className="profile-form-div">
              <div className="profile-header">
                {/* <img srcSet={userIcon} className="profile-icon" alt="icon" /> */}
              </div>
              <ul className="profile-info">
                <li className="profile-bio">Bio: {user.bio}</li>
                <li className="profile-username">Username: {user.username}</li>
                <li className="profile-email">Email: {user.email}</li>
              </ul>
            </div>
          )}
          <button className="edit-btn" onClick={toggleUpdateProfile}>
            {updatingProfile ? "Finish" : "Edit"}
          </button>
        </div>
      )}
    </div>
  );
}
