import react, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { nanoid } from "nanoid";

import {
    collection,
    getDocs,
    getFirestore,
    setDoc,
    doc,
    addDoc,
    query,
    serverTimestamp,
} from "firebase/firestore";


const AddToCardsForm = ({ userName, userPhoto, setAddFormActive }) => {
    const [description, setDescription] = useState("");

    const addCardToFirestore = async () => {
        const id = nanoid();
        console.log("add ran");
        await setDoc(doc(db, "beanCards", `${id}`), {
                name: userName,
                avatar: userPhoto,
                description: description,
                comments: [],
                likes: 0,
                postDate: serverTimestamp(),
                id: id,
                showComments: false,
        });
        setAddFormActive(false)
    };
    return (
        <form className="add-to-cards-form">
            <input
                name="description"
                placeholder="Description"
                required={true}
                onChange={(e) => {
                    setDescription(e.target.value);
                    console.log(description);
                }}
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
