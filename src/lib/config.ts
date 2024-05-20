require('dotenv').config()


interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

type configKey = "apiKey" | "authDomain" | "projectId" | "storageBucket" | "messagingSenderId" | "appId"; 

const config: FirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  };
  
// When deployed, there are quotes that need to be stripped
Object.keys(config).forEach((k) => {
const key = k as configKey;
const configValue = config[key] + "";
if (configValue.charAt(0) === '"') {
    config[key] = configValue.substring(1, configValue.length - 1);
}
});

export const firebaseConfig = config;