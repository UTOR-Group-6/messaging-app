import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import Navbar from "../components/Navbar/Navbar";
import CreateChat from "../components/CreateChat/CreateChat"


export default function Home() {
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
				</div>
			</>
		)
	} else {
		return (
			<div>
				<Navigate to="/login" replace={true}/>
			</div>
		)
	}
}