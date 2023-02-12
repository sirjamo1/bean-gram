import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import "./App.css";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase-config";
import blankAvatar from "./assets/images/blankAvatar.png"

function App() {
    const [userName, setUserName] = useState("No Bean");
    const [userPhoto, setUserPhoto] = useState(blankAvatar);
    const auth = getAuth(firebaseApp);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const monitorAuthState = async () => {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user, true);
                    setUserName(user.displayName);
                    setUserPhoto(user.photoURL);
                    setLoggedIn(true);
                } else {
                    console.log("you are not logged in", false);
                    setLoggedIn(false);
                    setUserName("No Bean");
                    setUserPhoto(blankAvatar);
                }
            });
        };
        monitorAuthState();
    }, []);
    return (
        <div className="App">
            <Navbar userName={userName} userPhoto={userPhoto} />
            {loggedIn ? <LogOut auth={auth} /> : <Login />}
        </div>
    );
}

export default App;
