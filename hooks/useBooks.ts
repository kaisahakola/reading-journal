import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Book } from '@/types/book';

const addBook = async (userId: string, book: Book) => {
    try {
        const docRef = collection(db, "users", userId, "books")
        await addDoc(docRef, {
            ...book,
            createdAt: new Date().toISOString(),
        })
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

export { addBook };
