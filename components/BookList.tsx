import { View, StyleSheet, ScrollView } from 'react-native';
import BookItem from './BookItem';
import { useFetchAllBooks } from '@/hooks/useFetchAllBooks';

const BookList = () => {
  const { books } = useFetchAllBooks();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 90 }}
    >
      {books.map((book) => (
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
