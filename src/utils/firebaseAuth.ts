import {
    AuthErrorCodes,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInAnonymously,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { firebaseApp } from "./firebaseInit";

export const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => signInWithPopup(auth, provider);

export const guestSignIn = async () => signInAnonymously(auth);

export const loginEmailPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        return getErrorFieldAndMessage(error);
    }
    return undefined;
}

export const createUser = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        return getErrorFieldAndMessage(error);
    }
    return undefined;
}

export const getErrorFieldAndMessage = (error: any) => {
    if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
        return {
            field: 'password',
            message: 'Invalid Password'
        }
    }
    if (error.code == AuthErrorCodes.INVALID_EMAIL) {
        return {
            field: 'email',
            message: 'Invalid Email'
        }
    }
    if (error.code == AuthErrorCodes.EMAIL_EXISTS) {
        return {
            field: 'email',
            message: 'Email already in use'
        }
    }
    if (error.code == AuthErrorCodes.NETWORK_REQUEST_FAILED) {
        return {
            field: '',
            message: 'Network error, try again later'
        }
    }
    if (error.code == AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER) {
        return {
            field: '',
            message: 'Too many attempts, try again later'
        }
    }
    if (error.code == AuthErrorCodes.WEAK_PASSWORD) {
        return {
            field: 'password',
            message: 'Password is too weak'
        }
    }
    return {
        field: '',
        message: error.message,
    }
}

export const logout = async () => {
    signOut(auth);
}