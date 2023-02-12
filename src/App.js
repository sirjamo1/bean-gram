import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import "./App.css";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { firebaseApp } from "./firebase-config";


function App() {
    const auth = getAuth(firebaseApp);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const monitorAuthState = async () => {
            await onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(user, true);
                    setLoggedIn(true);
                } else {
                    console.log("you are not logged in", false);
                    setLoggedIn(false);
                }
            });
        };
        monitorAuthState()
    }, []);
    return (
        <div className="App">
            <Navbar />
            {loggedIn ? <LogOut auth={auth} /> : <Login />}
        </div>
    );
}

export default App;
