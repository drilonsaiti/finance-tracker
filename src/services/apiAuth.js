import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const loginApi = async ({ email, password }) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (err) {
        throw err;
    }
};

export const logoutApi = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        await auth.signOut();
    } catch (err) {
        throw err;
    }
};



export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
            (user) => {
                unsubscribe();
                resolve(user);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
