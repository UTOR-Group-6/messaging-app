import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import "./Navbar.css"

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="navigator-ul">
                    <li className="navigator-li">
                        <a href="/login" onClick={() => Auth.logout()}>Logout</a>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navigator-ul">
                    <li className="navigator-li">
                        <a href="/login">Login</a>
                        <a href="/signup">Signup</a>
                    </li>
                </ul>
            )
        }
    }

    return (
        <header className="nav-div">
            <div className="logo-div">
                <h1>messenger application</h1>
            </div>
            <nav>
                {showNavigation()}
            </nav>
        </header>
    )
}

export default Nav;