import { useEffect, useState } from 'react';
import { Book, BookWithIdAndDate, BookTitle } from '@/types/book';
import { auth, db } from '@/config/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export const useFetchAllBooks = () => {
  const [books, setBooks] = useState<BookWithIdAndDate[]>([]);
  const [titles, setTitles] = useState<BookTitle[]>([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, 'users', userId, 'books'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allBooks: BookWithIdAndDate[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Book),
      }));
      setBooks(allBooks);
      const allTitles: BookTitle[] = querySnapshot.docs.map((doc) => ({
        title: doc.data().title,
      }));
      setTitles(allTitles);
    });

    return () => unsubscribe();
  }, [userId]);

  return { books, titles, userId };
};
