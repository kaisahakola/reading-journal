import { useEffect, useState } from 'react';
import { BookWithIdAndDate } from '@/types/book';
import { auth } from '@/config/firebase';
import { getAllBooks } from '@/hooks/useBooks';

export const useFetchAllBooks = () => {
  const [books, setBooks] = useState<BookWithIdAndDate[]>([]);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchBooks = async () => {
      if (!userId) {
        console.error('No user found');
        return [];
      }
      const allBooks = await getAllBooks(userId);
      setBooks(allBooks);
    };

    fetchBooks().catch((err) => console.error('Error fetching books: ', err));
  }, [userId]);

  return { books, userId };
};
