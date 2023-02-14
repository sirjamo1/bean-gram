import react, { useState, useEffect } from "react";
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
    updateDoc,
} from "firebase/firestore";

const CardComments = ({ comments, id, userName, userPhoto }) => {
    const [commentText, setCommentText] = useState("");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    const postComment = async () => {
        let tempComments = [...comments];
        let comment = {
            comment: commentText,
            userName: userName,
            userPhoto: userPhoto,
            commentDate: `${dd}-${mm}-${yyyy}`,
            commentId: `${id}-${nanoid()}`,
        };
        tempComments.unshift(comment);
        const cardRef = doc(db, "beanCards", `${id}`);

        await updateDoc(cardRef, {
            comments: tempComments,
        });
    };
//NOTE: styling comments section
    return (
        <div className="comments-container">
            {comments.length > 0 ? (
                <div>
                    <div className="comment-info-container">
                        {comments.map((comment) => (
                            <div
                                key={comment.commentId}
                                className="single-comment"
                            >
                                <div className="commenter-info">
                                    <img
                                        src={comment.userPhoto}
                                        alt="User avatar"
                                    />
                                    <p>{comment.userName}:</p>
                                </div>
                                <div className="comment-text">
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form className="comment-form">
                        <input
                            type="text"
                            placeholder="Add comment"
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                postComment();
                            }}
                        >
                            Add
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <p>No comments</p>
                    <form className="comment-form">
                        <input
                            type="text"
                            placeholder="Add comment"
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                postComment();
                            }}
                        >
                            Add
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CardComments;
