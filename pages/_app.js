import "../styles/globals.css";
import { auth, db } from "../firebase";
import Login from "./login";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loading } from "../components/Loading";
import { useEffect } from "react";
import firebase from "firebase";

function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(auth);
	useEffect(() => {
		if (user) {
			db.collection("users").doc(user.uid).set(
				{
					email: user.email,
					lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
					dp: user.photoURL,
				},
				{
					merge: true,
					// set actually replaces everything , but we just have to merge so we do the above
					// but if its not there, we have to create is thats y we use set above
				}
			);
		}
	}, [user]);
	if (loading) return <Loading />;
	if (!user) return <Login />;
	return <Component {...pageProps} />;
}

export default MyApp;
