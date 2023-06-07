import React from "react";
import { Link, Navigate } from "react-router-dom";
import { QUERY_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import Navbar from "../components/Navbar/Navbar";
import CreateChat from "../components/CreateChat/CreateChat";
import Profile from "../components/Profile/Profile";

export default function Home() {
  // If logged in, home redirects to profile

  // const { data } = useQuery(QUERY_USER);
  // let user;

  // if (data) {
  // 	user = data.user;
  // }
  // console.log(user)

  if (Auth.loggedIn()) {
    return (
      <>
        <Navbar />
        <div className="home-div">
          {/* we can remove this, just here for movement to chat page */}
          <p>temporary link:</p>
          <Link to="/chats">go to chats</Link>
          <CreateChat />
          <Profile />
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Navigate to="/login" replace={true} />
      </div>
    );
  }
}
