import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "@/config/firebase";
import {Book} from '@/types/book';

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

const getAllBooks = async (userId: string) => {
    try {
        const q = query(collection(db, "users", userId, "books"));
        const querySnapshots = await getDocs(q);

        return querySnapshots.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Book),
        }))
    } catch (err) {
        console.error("Error getting all books: ", err);
        return [];
    }
}

export { addBook, getAllBooks };
