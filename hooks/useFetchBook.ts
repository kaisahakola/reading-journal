import { useCallback, useEffect, useState } from 'react';
import { BookWithId } from '@/types/book';
import { useLocalSearchParams } from 'expo-router';
import { auth } from '@/config/firebase';
import { getBookById } from '@/services/bookService';

export const useFetchBook = () => {
  const [book, setBook] = useState<BookWithId>();
  const { id } = useLocalSearchParams();
  const userId = auth.currentUser?.uid;

  const fetchBook = useCallback(async () => {
    if (typeof id !== 'string') {
      console.error('Invalid bookId:', id);
      return;
    }
    if (!userId) {
      console.error('No user found');
      return;
    }
    const bookData = await getBookById(id, userId);
    setBook(bookData);
  }, [id, userId]);

  useEffect(() => {
    fetchBook().catch((err) => console.error('Error fetching book: ', err));
  }, [fetchBook]);

  return { book, id, userId, refetch: fetchBook };
};
