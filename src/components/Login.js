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
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const errorEmail = error.customData.email;
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            });
    };
    return (
        <div className="login-container">
            <form>
                <input
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
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
            <button onClick={() => signInWithGoogle()}>
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;

//jam_how@hotmail.com
//passwordtest
