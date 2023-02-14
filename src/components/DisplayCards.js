import React, { useState, useEffect } from "react";
import CardComments from "./CardComments";
import thumbUp from "../assets/icons/thumbUp.png";
import travel1 from "../assets/images/travel1.jpeg";
import travel2 from "../assets/images/travel2.jpeg";
import travel3 from "../assets/images/travel3.jpeg";
import beanAvatar from "../assets/images/beanAvatar.jpeg";
import { db } from "../firebase-config";
import {
    collection,
    query,
    getDocs,
    updateDoc,
    doc,
    getDoc,
} from "firebase/firestore";

const DisplayCards = ({ userName, userPhoto }) => {
    const [cards, setCards] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const cardsRef = query(collection(db, "beanCards"));
    const updateLikes = async (id) => {
        try {
            const likesDocRef = doc(db, "beanCards", `${id}`);
            const currentStateSnap = await getDoc(likesDocRef);
            let newLikes = (currentStateSnap.data().likes += 1);
            await updateDoc(likesDocRef, {
                likes: newLikes,
            });
        } catch (error) {
            console.log({ error });
        }
    };
    useEffect(() => {
        try {
            const getCards = async () => {
                console.log("getCards ran");
                const cardsSnapshot = await getDocs(cardsRef);
                const tempCards = [];
                cardsSnapshot.docs.forEach((doc) => {
                    tempCards.push({ ...doc.data() });
                    // console.log(doc.id, " =>> ", doc.data());
                });
                // console.log(tempCards);
                setCards(tempCards);
                setIsLoading(false);
            };

            getCards();
        } catch (error) {
            console.log({ error });
        }
    }, []);
    const switchDescriptionComments = (id) => {
        let tempCards = [...cards];
        console.log(tempCards);
        for (let i = 0; i < tempCards.length; i += 1) {
            if (tempCards[i].id === id) {
                tempCards[i].showComments = !tempCards[i].showComments;
            }
        }
        setCards(tempCards);
    };
    console.log(cards);
    return (
        <div className="cards-container">
            {isLoading ? (
                <div className="loading">
                    <h3>LOADING...</h3>
                </div>
            ) : (
                cards.map((card, i) => {
                    const date = card.postDate.toDate().toUTCString();
                    console.log(card.showComments);
                    return (
                        <div className="card" key={card.id}>
                            <div className="poster-details">
                                <img
                                    className="poster-avatar"
                                    src={card.avatar ? card.avatar : beanAvatar}
                                    alt="User avatar"
                                />
                                <h4>{card.name}</h4>
                            </div>
                            <img className="card-photo" src={travel1} />
                            <div className="description-comments-container">
                                <div className="description-comments-button-container">
                                    <button
                                        style={{
                                            opacity: !card.showComments
                                                ? 1
                                                : 0.5,
                                        }}
                                        disabled={card.showComments}
                                        onClick={() =>
                                            switchDescriptionComments(card.id)
                                        }
                                    >
                                        Description
                                    </button>
                                    <button
                                        style={{
                                            opacity: card.showComments
                                                ? 1
                                                : 0.5,
                                        }}
                                        disabled={!card.showComments}
                                        onClick={() =>
                                            switchDescriptionComments(card.id)
                                        }
                                    >
                                        Comments ({card.comments.length})
                                    </button>
                                </div>
                                <div className="description-comments-content-container">
                                    {card.showComments ? (
                                        <CardComments
                                            comments={card.comments}
                                            userName={userName}
                                            userPhoto={userPhoto}
                                            id={card.id}
                                        />
                                    ) : (
                                        <p className="card-description">
                                            {card.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="date-thumb-container">
                                <p className="posted-date">Posted: {date}</p>
                                <div>
                                    <p>
                                        {card.likes > 0
                                            ? `(${card.likes})`
                                            : ""}
                                    </p>
                                    <img
                                        className="thumb-up-icon"
                                        src={thumbUp}
                                        alt="thumb up icon"
                                        style={{
                                            opacity: card.likes > 0 ? 1 : 0.4,
                                        }}
                                        onClick={() => updateLikes(card.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default DisplayCards;

// <div className="card">
//                <div className="poster-details">
//                    <img className="poster-avatar" src={beanAvatar} />
//                    <h4>Poster Name</h4>
//                </div>
//                <img className="card-photo" src={travel1} />

//                <p className="card-description">Description</p>
//                <div className="date-thumb-container">
//                    <p>date</p>
//                    <img
//                        className="thumb-up-icon"
//                        src={thumbUp}
//                        alt="thumb up image"
//                    />
//                </div>
//            </div>
//            <div className="card">
//                <div className="poster-details">
//                    <img className="poster-avatar" src={beanAvatar} />
//                    <h4>Poster Name</h4>
//                </div>
//                <img className="card-photo" src={travel2} />

//                <p className="card-description">Description</p>
//                <div className="date-thumb-container">
//                    <p>date</p>
//                    <img
//                        className="thumb-up-icon"
//                        src={thumbUp}
//                        alt="thumb up image"
//                    />
//                </div>
//            </div>
//            <div className="card">
//                <div className="poster-details">
//                    <img className="poster-avatar" src={beanAvatar} />
//                    <h4>Poster Name</h4>
//                </div>
//                <img className="card-photo" src={travel3} />

//                <p className="card-description">Description</p>
//                <div className="date-thumb-container">
//                    <p>date</p>
//                    <img
//                        className="thumb-up-icon"
//                        src={thumbUp}
//                        alt="thumb up image"
//                    />
//                </div>
//            </div>
