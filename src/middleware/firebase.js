// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyD2Hqvv9B-MCoeRlS-SEB6CwAQBjuxzHqg',
	authDomain: 'educational-platform-8dd63.firebaseapp.com',
	projectId: 'educational-platform-8dd63',
	storageBucket: 'educational-platform-8dd63.appspot.com',
	messagingSenderId: '770927907053',
	appId: '1:770927907053:web:6a184a7cb757581af87ce4',
	measurementId: 'G-NLQ274WBTS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
