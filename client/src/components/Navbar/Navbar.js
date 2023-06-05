import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import logoImage from '../../assets/logo.png'
import "./Navbar.css"

function Nav() {
    return (
        <header className="nav-div">
            <div className="logo-div">
                <img src={logoImage} alt="spark logo" className="logo-image"/>
            </div>
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