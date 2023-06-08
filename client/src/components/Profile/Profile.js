import React, { useState } from "react";
import { QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import ProfileForm from "./ProfileForm";
import "./Profile.css";

export default function Profile() {
  const { loading, data } = useQuery(QUERY_USER);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const user = data?.user || [];
  const iconPath = user.icon
    ? "../../assets/" + user.icon + ".jpeg"
    : "../../assets/fish.jpeg";

  const toggleUpdateProfile = () => {
    setUpdatingProfile(!updatingProfile);
  };

  return (
    <div className="profile">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="profile-body">
          {updatingProfile ? (
            <ProfileForm
              user={(user.username, user.email, user.bio, user.icon)}
            />
          ) : (
            <>
              <div className="profile-header">
                <img srcSet={iconPath} className="profile-icon" alt="icon" />
              </div>
              <ul className="profile-info">
                <li className="profile-bio">Bio: {user.bio}</li>
                <li className="profile-username">Username: {user.username}</li>
                <li className="profile-email">Email: {user.email}</li>
              </ul>
            </>
          )}
          <button className="edit-btn" onClick={toggleUpdateProfile}>
            {updatingProfile ? "Finish" : "Edit"}
          </button>
        </div>
      )}
    </div>
  );
}
