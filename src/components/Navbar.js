import beanGramLogo from "../assets/images/beanGramLogo.png";
import blankAvatar from "../assets/images/blankAvatar.png"
import React from "react";

const Navbar = ({ userName, userPhoto, user }) => {
    const getFirstPartOfEmail = () => {
        let email = user.email.substring(0, user.email.indexOf("@"))
        console.log(email)
        return email

    }
    return (
        <div className="navbar-container">
            <img src={beanGramLogo} alt="Bean gram logo" width="100px" />
            <div className="user-info">
                <h3>{userName ? userName : getFirstPartOfEmail()}</h3>
                <img src={userPhoto ? userPhoto : blankAvatar} alt="user avatar" />
            </div>
        </div>
    );
};

export default Navbar;
