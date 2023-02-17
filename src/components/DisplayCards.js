import React, { useState, useEffect } from "react";
import CardComments from "./CardComments";
import thumbUp from "../assets/icons/thumbUp.png";
import blankAvatar from "../assets/images/blankAvatar.png";
import { db } from "../firebase-config";
import {
    collection,
    query,
    updateDoc,
    doc,
    getDoc,
    orderBy,
    onSnapshot,
} from "firebase/firestore";

const DisplayCards = ({ userName, userPhoto, addFormActive, user }) => {
    const [cards, setCards] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const updateLikes = async (id) => {
        try {
            const likesDocRef = doc(db, "beanCards", `${id}`);
            const currentStateSnap = await getDoc(likesDocRef);
            let newLikes = currentStateSnap.data().likes;
            if (newLikes.length > 0) {
                const index = newLikes.findIndex((e) => e.uid === user.uid);
                console.log(index);
                if (index > -1) {
                    newLikes.splice(index, 1);
                    console.log(newLikes, "after splice");
                } else {
                    newLikes.unshift({
                        uid: user.uid,
                        name: userName,
                    });
                }
            } else {
                newLikes.unshift({
                    uid: user.uid,
                    name: userName,
                });
                console.log(newLikes, "after unshift");
            }
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
                const cardQuery = query(
                    collection(db, "beanCards"),
                    orderBy("postDate", "desc")
                );
                onSnapshot(cardQuery, (querySnapshot) => {
                    const tempCards = [];
                    querySnapshot.forEach((doc) => {
                        tempCards.push(doc.data());
                    });
                    setCards(tempCards);
                    setIsLoading(false);
                });
            };

            getCards();
        } catch (error) {
            console.log({ error });
        }
    }, []);
    const switchDescriptionComments = (id, value) => {
        let tempCards = [...cards];
        for (let i = 0; i < tempCards.length; i += 1) {
            if (tempCards[i].id === id) {
                tempCards[i].showComments = value === "comments" ? true : false;
            }
        }
        setCards(tempCards);
    };
    return (
        <div className="cards-container">
            {isLoading ? (
                <div className="loading">
                    <h3>LOADING...</h3>
                </div>
            ) : (
                cards.map((card) => {
                    const date = card.postDate
                        ? card.postDate.toDate().toUTCString()
                        : null;
                    return (
                        <div className="card" key={card.id}>
                            <div className="poster-details">
                                <img
                                    className="poster-avatar"
                                    src={
                                        card.avatar ? card.avatar : blankAvatar
                                    }
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
                                        onClick={() =>
                                            switchDescriptionComments(
                                                card.id,
                                                "description"
                                            )
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
                                        onClick={() =>
                                            switchDescriptionComments(
                                                card.id,
                                                "comments"
                                            )
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
                                        {card.likes.length > 0
                                            ? `(${card.likes.length})`
                                            : ""}
                                    </p>
                                    <img
                                        className="thumb-up-icon"
                                        src={thumbUp}
                                        alt="thumb up icon"
                                        style={{
                                            opacity: card.likes.some(
                                                (e) => e.uid === user.uid
                                            )
                                                ? 1
                                                : 0.4,
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
