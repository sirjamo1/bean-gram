import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import DisplayCards from "./components/DisplayCards";
import AddToCardsForm from "./components/AddToCardsForm";
import "./App.css";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase-config";
import blankAvatar from "./assets/images/blankAvatar.png";

function App() {
    const [userName, setUserName] = useState("No Bean");
    const [userPhoto, setUserPhoto] = useState(blankAvatar);
    const auth = getAuth(firebaseApp);
    const [loggedIn, setLoggedIn] = useState(false);
    const [addFormActive, setAddFormActive] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        const monitorAuthState = async () => {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                    let emailFirstPart = user.email.substring(
                        0,
                        user.email.indexOf("@")
                    );
                    setUserName(
                        user.displayName ? user.displayName : emailFirstPart
                    );
                    setUserPhoto(user.photoURL ? user.photoURL : blankAvatar);
                    setLoggedIn(true);
                } else {
                    console.log("you are not logged in", false);
                    setLoggedIn(false);
                    setUserName("No Bean");
                    setUserPhoto(blankAvatar);
                    setUser(null);
                }
            });
        };
        monitorAuthState();
    }, []);

    return (
        <div className="app">
            <Navbar
                userName={userName}
                setUserName={setUserName}
                userPhoto={userPhoto}
                setUserPhoto={setUserPhoto}
                user={user}
                auth={auth}
            />
            {loggedIn ? (
                <>
                    <DisplayCards
                        userName={userName}
                        userPhoto={userPhoto}
                        addFormActive={addFormActive}
                        user={user}
                    />
                    {/* <LogOut auth={auth} /> */}
                    {addFormActive ? (
                        <AddToCardsForm
                            userName={userName}
                            userPhoto={userPhoto}
                            setAddFormActive={setAddFormActive}
                            user={user}
                        />
                    ) : (
                        <button
                            onClick={() => setAddFormActive(true)}
                            className="add-button"
                        >
                            +
                        </button>
                    )}
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;
