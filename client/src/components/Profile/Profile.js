import React, { useState } from "react";
import { QUERY_USER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import "./Profile.css";

// Profile shows info on current user and allows updating
export default function Profile() {
  const [formState, setFormState] = useState();
  const { profile } = useQuery(QUERY_PROFILE);

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <div className="profile-icon"></div>
        <div className="profile-bio"></div>
      </div>
      <div className="profile-info">
        {/* Username */}
        <p>Username: {user.username}</p>
        {/* Email */}
        <p>Email: {user.email}</p>
        {/* Password */}
      </div>
    </div>
  );
}
