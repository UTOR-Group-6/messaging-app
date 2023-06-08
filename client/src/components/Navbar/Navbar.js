import React from "react";
import Auth from "../../utils/auth";
import "./Navbar.css"

function Nav() {
    return (
        <header className="nav-div">
            <a href="/" className="logo-div">
                <h1>BLUB</h1>
            </a>
            <nav>
                <ul className="navigator-ul">
                    <li className="navigator-li">
                        <a href="/login" onClick={() => Auth.logout()}>Logout</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;