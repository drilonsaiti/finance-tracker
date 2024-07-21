import {db} from './firebase.js'
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {onValue, ref, set,remove,update} from "firebase/database";
import {uid} from 'uid';

export const getAllOutcome = async () => {
    try {
        const snapshot = await new Promise((resolve, reject) => {
            onValue(ref(db, "outcome"), (snapshot) => {
                resolve(snapshot);
            }, {
                onlyOnce: true
            });
        });

        const data = snapshot.val();

        if (data) {
            const dataArray = Object.values(data);
            console.log(dataArray);
            return dataArray;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching outcome:", error);
        throw error;
    }
}
export const addOutcome = async (outcomeData) => {
    const uuid = uid();

    try {
        const docRef = await set(ref(db, `/outcome/${uuid}`), {
            ...outcomeData,
            uuid
        });    } catch (e) {
        throw new Error(`Error adding outcome: ${e}`);
    }
};

export const updateOutcome = async (newOutcome, uuid) => {
    console.log(uuid);
    console.log(newOutcome);
    try {

        await update(ref(db,`/outcome/${uuid}`),{
            ...newOutcome,
            uuid
        })
        console.log("Document successfully updated!");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

export const deleteOutcome = async (uuid) => {
    try {
        await remove(ref(db, `/outcome/${uuid}`));
        console.log("Document successfully deleted!");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};


// ======================= INCOME ==========================

export const getAllIncome = async () => {
    try {
        const snapshot = await new Promise((resolve, reject) => {
            onValue(ref(db, "income"), (snapshot) => {
                resolve(snapshot);
            }, {
                onlyOnce: true
            });
        });

        const data = snapshot.val();

        if (data) {
            const dataArray = Object.values(data);
            console.log(dataArray);
            return dataArray;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching income:", error);
        throw error;
    }
}

export const addIncome = async (incomeData) => {
    const uuid = uid();

    try {
        const docRef = await set(ref(db, `/income/${uuid}`), {
            ...incomeData,
            uuid
        });    } catch (e) {
        throw new Error(`Error adding income: ${e}`);
    }
};


export const updateIncome = async (newIncome, uuid) => {

    try {

        await update(ref(db,`/income/${uuid}`),{
            ...newIncome,
            uuid
        })
        console.log("Document successfully updated!");
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

export const deleteIncome = async (uuid) => {

    try {
        await remove(ref(db, `/income/${uuid}`));
        console.log("Document successfully deleted!");
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};