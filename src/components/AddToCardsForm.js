import react, { useEffect, useState } from "react";
import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    getFirestore,
    setDoc,
    doc,
    addDoc,
    query,
} from "firebase/firestore";

// const topScoreRef = collection(db, "topScore");
// const sendScore = async (userName) => {
//     await addDoc(topScoreRef, {
//         name: userName,
//         time: timer,
//     });
// };

const AddToCardsForm = ({ userName, userPhoto, setAddFormActive }) => {
    const [description, setDescription] = useState("");
    const cardsRef = query(collection(db, "beanCards"));
    const addCardToFirestore = async () => {
     console.log("add ran")
        await addDoc(cardsRef, {
            name: userName,
            avatar: userPhoto,
            description: description,
            liked: false,
        });
    };
    return (
        <form className="add-to-cards-form">
            <input
                name="description"
                placeholder="Description"
                onChange={(e) => {setDescription(e.target.value);console.log(description)}}
            ></input>
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    addCardToFirestore();
                }}
            >
                Submit
            </button>
        </form>
    );
};

export default AddToCardsForm;
