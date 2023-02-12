import React, { useState } from "react";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "../firebase-config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);

    const loginEmailPassword = async () => {

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential.user);
        } catch (error) {
            console.log(error);
        }
    };
    const createAccount = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential.user);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form>
            <input
                name="email"
                type="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
                name="password"
                type="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    loginEmailPassword(e);
                }}
                type="submit"
            >
                Sign in
            </button>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    createAccount(e);
                }}
                type="submit"
            >
                Sign up
            </button>
        </form>
    );
};

export default Login;

//jam_how@hotmail.com
//passwordtest
