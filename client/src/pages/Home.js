import React from "react";
import { Link, Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import Navbar from "../components/Navbar/Navbar";
import CreateChat from "../components/CreateChat/CreateChat";
import Profile from "../components/Profile/Profile";

import './Home.css'

export default function Home() {
  if (Auth.loggedIn()) {
    return (
      <div className="home-div">
        <Navbar />
        <div className="profile-div">
          <Profile />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navigate to="/login" replace={true} />
      </div>
    );
  }
}
