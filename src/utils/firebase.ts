import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

const app = initializeApp({
	databaseURL: process.env.FIREBASE_DATABASE_URL
});

export const FBD = getDatabase(app);