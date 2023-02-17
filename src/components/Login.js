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
    const [errorMessage, setErrorMessage] = useState("");
    const [googleErrorMessage, setGoogleErrorMessage] = useState("");
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
            setErrorMessage(error.message);
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
            setErrorMessage(error.message);
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
                <label htmlFor="name">
                    <input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

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
                <p className="error-message">{errorMessage}</p>
            </form>
            <button
                className="google-button"
                onClick={() => signInWithGoogle()}
            >
                Sign in with Google
            </button>
            <p className="error-message">{googleErrorMessage}</p>
        </div>
    );
};

export default Login;
