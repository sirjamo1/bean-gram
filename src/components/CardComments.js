import { useState } from "react";
import { db } from "../firebase-config";
import { nanoid } from "nanoid";
import { doc, updateDoc } from "firebase/firestore";

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
        tempComments.push(comment);
        const cardRef = doc(db, "beanCards", `${id}`);

        await updateDoc(cardRef, {
            comments: tempComments,
        });
    };
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
                            placeholder="Add a comment"
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
                <div >
                    <p style={{padding: "6px"}}>No comments</p>
                    <form className="comment-form">
                        <input
                            type="text"
                            placeholder="Add a comment"
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
