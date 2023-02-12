import beanGramLogo from "../assets/images/beanGramLogo.png";
import React from "react";

const Navbar = ({ userName, userPhoto }) => {
    return (
        <div className="navbar-container">
            <img src={beanGramLogo} alt="Bean gram logo" width="100px" />
            <div className="user-info">
                <h3>{userName}</h3>
                <img src={userPhoto} alt="user avatar" />
            </div>
        </div>
    );
};

export default Navbar;
