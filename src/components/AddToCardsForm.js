import { useState } from "react";
import { db } from "../firebase-config";
import { nanoid } from "nanoid";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
    setDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore";

const AddToCardsForm = ({ userName, userPhoto, setAddFormActive }) => {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState();

    const addDetailsToFirestore = async (id, url) => {
        console.log("details ran")
        await setDoc(doc(db, "beanCards", `${id}`), {
            name: userName,
            avatar: userPhoto,
            photoURL: url,
            description: description,
            comments: [],
            likes: 0,
            postDate: serverTimestamp(),
            id: id,
            showComments: false,
        });
        setAddFormActive(false);
    };
    const addPhotoToStorage = async () => {
        const id = nanoid();
        if (!file) return alert("Please choose a file");
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addDetailsToFirestore(id, url);
                });
            }
        );
    };
    return (
        <form className="add-to-cards-form">
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <input
                name="description"
                placeholder="Description"
                required={true}
                onChange={(e) => {
                    setDescription(e.target.value);
                    console.log(description);
                }}
            />
            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    addPhotoToStorage();
                }}
            >
                Submit
            </button>
        </form>
    );
};

export default AddToCardsForm;
