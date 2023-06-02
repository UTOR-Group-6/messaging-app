import React from 'react'
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';


export default function Home() {
	return (
		<div className="home-div">
      {/* we can remove this, just here for movement to chat page */}
      <p>temporary link:</p>
      <Link to="/chats">go to chats</Link>
		</div>
	)
}