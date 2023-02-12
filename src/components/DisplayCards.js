import React, { useState, useEffect } from "react";
import thumbUp from "../assets/icons/thumbUp.png";
import travel1 from "../assets/images/travel1.jpeg";
import travel2 from "../assets/images/travel2.jpeg";
import travel3 from "../assets/images/travel3.jpeg";
import beanAvatar from "../assets/images/beanAvatar.jpeg";
import { db } from "../firebase-config";
import { collection, query, getDocs } from "firebase/firestore";

const DisplayCards = () => {
    const [cards, setCards] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const cardsRef = query(collection(db, "beanCards"));
    useEffect(() => {
        try {
            const getCards = async () => {
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
     console.log(cards);

    return (
        <div className="cards-container">
            { isLoading ? <div className="loading"><h3>LOADING...</h3></div> : cards.map((card, i) => {
             return (
                 <div className="card" key={i}>
                     <div className="poster-details">
                         <img
                             className="poster-avatar"
                             src={card.avatar ? card.avatar : beanAvatar}
                         />
                         <h4>{card.name}</h4>
                     </div>
                     <img className="card-photo" src={travel1} />

                     <p className="card-description">{card.description}</p>
                     <div className="date-thumb-container">
                         <p>date</p>
                         <img
                             className="thumb-up-icon"
                             src={thumbUp}
                             alt="thumb up image"
                             style={{ opacity: card.liked ? 1 : 0.4 }}
                         />
                     </div>
                 </div>
             );
            })}
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
