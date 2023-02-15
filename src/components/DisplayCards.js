import React, { useState, useEffect } from "react";
import CardComments from "./CardComments";
import thumbUp from "../assets/icons/thumbUp.png";
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
                });
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
                cards.map((card) => {
                    const date = card.postDate.toDate().toUTCString();
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
                            <img className="card-photo" src={card.photoURL} />
                            <div className="description-comments-container">
                                <div className="description-comments-button-container">
                                    <button
                                        style={{
                                            backgroundColor: !card.showComments
                                                ? "yellow"
                                                : "white",
                                        }}
                                        disabled={!card.showComments}
                                        onClick={() =>
                                            switchDescriptionComments(card.id)
                                        }
                                    >
                                        Description
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: card.showComments
                                                ? "yellow"
                                                : "white",
                                        }}
                                        disabled={card.showComments}
                                        onClick={() =>
                                            switchDescriptionComments(card.id)
                                        }
                                    >
                                        Comments ({card.comments.length})
                                    </button>
                                </div>
                                <div className="description-comments">
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