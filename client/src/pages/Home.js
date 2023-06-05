import React from 'react'
import { Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import Navbar from "../components/Navbar/Navbar"


export default function Home() {
	const { data } = useQuery(QUERY_USER);
	let user;

	if (data) {
		user = data.user;
	}
	console.log({data})

	if (Auth.loggedIn()) {
		return (
			<>
			<Navbar />
				<div className="home-div">
					{/* we can remove this, just here for movement to chat page */}
					<p>temporary link:</p>
					<Link to="/chats">go to chats</Link>
				</div>
			</>
		)
	} else {
		return (
			<>
				<Navbar />
				<div className="home-div">
					<p>{user}</p>
					{/* we can remove this, just here for movement to chat page */}
					<p>not logged in</p>
				</div>
			</>
		)
	}
}