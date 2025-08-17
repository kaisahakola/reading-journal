import {
  addDoc,
  collection,
  getDocs,
  query,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Book } from '@/types/book';

const addBook = async (userId: string, book: Book) => {
  try {
    const docRef = collection(db, 'users', userId, 'books');
    await addDoc(docRef, {
      ...book,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

const getAllBooks = async (userId: string) => {
  try {
    const q = query(collection(db, 'users', userId, 'books'));
    const querySnapshots = await getDocs(q);

    return querySnapshots.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Book),
    }));
  } catch (err) {
    console.error('Error getting all books: ', err);
    return [];
  }
};

const getBookById = async (bookId: string, userId: string) => {
  try {
    const docRef = doc(db, 'users', userId, 'books', bookId);
    const docSnap = await getDoc(docRef);

    return {
      id: docSnap.id,
      ...(docSnap.data() as Book),
    };
  } catch (err) {
    console.error('Error getting document by id: ', err);
  }
};

const deleteBookById = async (bookId: string, userId: string) => {
  try {
    const docRef = doc(db, 'users', userId, 'books', bookId);
    await deleteDoc(docRef);
  } catch (err) {
    console.error('Error deleting document: ', err);
  }
};

const updateBookById = async (
  bookId: string,
  userId: string,
  updatedBookData: Book,
) => {
  try {
    const docRef = doc(db, 'users', userId, 'books', bookId);
    await updateDoc(docRef, {
      ...updatedBookData,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error updating document: ', err);
  }
};

export { addBook, getAllBooks, getBookById, deleteBookById, updateBookById };
