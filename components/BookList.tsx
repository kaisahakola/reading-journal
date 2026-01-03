import { View, StyleSheet, ScrollView } from 'react-native';
import BookItem from './BookItem';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';
import { useEffect, useState } from 'react';
import { BookWithIdAndDate } from '@/types/book';

const BookList = () => {
  const { books } = useFetchAllBooks();
  const [sortedBooks, setSortedBooks] = useState<BookWithIdAndDate[]>([]);

  useEffect(() => {
    if (!books) return;
    const booksSorted = [...books].sort(sortBooksByDate);
    setSortedBooks(booksSorted);
  }, [books]);

  const sortBooksByDate = (a: BookWithIdAndDate, b: BookWithIdAndDate) => {
    const dateA = new Date(a.createdAt ?? 0).getTime();
    const dateB = new Date(b.createdAt ?? 0).getTime();

    return dateB - dateA;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 90 }}
    >
      {sortedBooks.map((book) => (
        <View key={book.id}>
          <BookItem book={book} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default BookList;
