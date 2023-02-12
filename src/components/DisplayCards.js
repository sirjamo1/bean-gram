import React, { useState, useEffect } from "react";
import thumbUp from "../assets/icons/thumbUp.png";
import travel1 from "../assets/images/travel1.jpeg";
import travel2 from "../assets/images/travel2.jpeg";
import travel3 from "../assets/images/travel3.jpeg";
import beanAvatar from "../assets/images/beanAvatar.jpeg";

const DisplayCards = () => {
    return (
        <div className="cards-container">
            <div className="card">
                <div className="poster-details">
                    <img className="poster-avatar" src={beanAvatar} />
                    <h4>Poster Name</h4>
                </div>
                <img className="card-photo" src={travel1} />

                <p className="card-description">Description</p>
                <div className="date-thumb-container">
                    <p>date</p>
                    <img
                        className="thumb-up-icon"
                        src={thumbUp}
                        alt="thumb up image"
                    />
                </div>
            </div>
            <div className="card">
                <div className="poster-details">
                    <img className="poster-avatar" src={beanAvatar} />
                    <h4>Poster Name</h4>
                </div>
                <img className="card-photo" src={travel2} />

                <p className="card-description">Description</p>
                <div className="date-thumb-container">
                    <p>date</p>
                    <img
                        className="thumb-up-icon"
                        src={thumbUp}
                        alt="thumb up image"
                    />
                </div>
            </div>
            <div className="card">
                <div className="poster-details">
                    <img className="poster-avatar" src={beanAvatar} />
                    <h4>Poster Name</h4>
                </div>
                <img className="card-photo" src={travel3} />

                <p className="card-description">Description</p>
                <div className="date-thumb-container">
                    <p>date</p>
                    <img
                        className="thumb-up-icon"
                        src={thumbUp}
                        alt="thumb up image"
                    />
                </div>
            </div>
        </div>
    );
};

export default DisplayCards;
