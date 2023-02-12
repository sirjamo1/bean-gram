import { signOut } from "firebase/auth";

const LogOut = ({ auth }) => {
    const logUserOut = async () => {
        await signOut(auth);
    };

    return (
        <div>
            <button onClick={() => logUserOut()}>Log out</button>
        </div>
    );
};

export default LogOut;
