import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBnJQM2tJtnuHtQV8mg5W1mcwwsQFvprCE',
  authDomain: 'toptal-quiz-app-9527a.firebaseapp.com',
  projectId: 'toptal-quiz-app-9527a',
  storageBucket: 'toptal-quiz-app-9527a.appspot.com',
  messagingSenderId: '45636706473',
  appId: '1:45636706473:web:ccd3b7a7753e4d553d49b8',
};

export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
