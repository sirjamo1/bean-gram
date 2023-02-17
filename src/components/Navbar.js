import beanGramLogo from "../assets/images/beanGramLogo.png";
import blankAvatar from "../assets/images/blankAvatar.png";
import React, { useState } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Navbar = ({
    userName,
    userPhoto,
    user,
    auth,
    setUserName,
    setUserPhoto,
}) => {
    const [listActive, setListActive] = useState(false);
    const [changeNameActive, setChangeNameActive] = useState(false);
    const [changeAvatarActive, setChangeAvatarActive] = useState(false);
    const [name, setName] = useState(userName);
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState();

    const logUserOut = async () => {
        await signOut(auth);
    };
    const updateName = async () => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
            .then(() => {
                setUserName(user.displayName);
                setChangeNameActive(false);
                setListActive(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    const updateAvatar = async (url) => {
        console.log(url, "<--url after");
        updateProfile(auth.currentUser, {
            photoURL: url,
        })
            .then(() => {
                setUserPhoto(user.photoURL);
                setChangeAvatarActive(false);
                setListActive(false);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    const uploadAvatar = async () => {
        if (!file) return alert("Please choose a file");
        const storageRef = ref(storage, `/avatars/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url, "<--url before");
                    updateAvatar(url);
                });
            }
        );
    };

    return (
        <div className="navbar-container">
            <img src={beanGramLogo} alt="Bean gram logo" width="100px" />

            <div className="user-info">
                <h3>{userName}</h3>

                <img
                    src={userPhoto ? userPhoto : blankAvatar}
                    alt="user avatar"
                    onClick={() => {
                        if (user !== null) setListActive(!listActive);
                    }}
                />
                {listActive ? (
                    <ul className="nav-list">
                        <li
                            onClick={() => {
                                logUserOut();
                                setListActive(false);
                            }}
                        >
                            LogOut
                        </li>
                        <li
                            onClick={() => {
                                setChangeNameActive(!changeNameActive);
                                setChangeAvatarActive(false);
                            }}
                        >
                            Change Name
                        </li>
                        {changeNameActive ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    updateName();
                                }}
                            >
                                <input
                                    placeholder={userName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <button type="submit">change</button>
                            </form>
                        ) : (
                            <></>
                        )}
                        <li
                            onClick={() => {
                                setChangeAvatarActive(!changeAvatarActive);
                                setChangeNameActive(false);
                            }}
                        >
                            Change Avatar
                        </li>
                        {changeAvatarActive ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    uploadAvatar();
                                }}
                                className="add-to-cards-form"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                {/* <p>{percent} %</p> */}
                                <button type="submit">change</button>
                            </form>
                        ) : (
                            <></>
                        )}
                    </ul>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Navbar;

// const LogOut = ({ auth }) => {
//     const logUserOut = async () => {
//         await signOut(auth);
//     };

//     return (
//         <div className="logout">
//             <button onClick={() => logUserOut()}>Log out</button>
//         </div>
//     );
// };
