import { BookWithIdAndDate } from '@/types/book';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StarRating from './StarRating';
import { parseDate } from '@/utils/date';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BookInfoProps {
  book: BookWithIdAndDate;
}

const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {book.createdAt ? (
        <Text style={styles.date}>{parseDate(book.createdAt)}</Text>
      ) : null}
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.genre}>{book.genre}</Text>
          <StarRating rating={book.rating} size={'big'} />
          <Text style={styles.note}>{book.note}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  date: {
    padding: 15,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Crafteds',
    marginBottom: 5,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  author: {
    fontFamily: 'AndadaPro',
    fontSize: 24,
    marginBottom: 15,
  },
  note: {
    marginTop: 25,
    backgroundColor: 'lightgray',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    minHeight: '20%',
    fontSize: 16,
  },
  genre: {
    fontFamily: 'Helvetica',
    marginBottom: 15,
  },
});

export default BookInfo;
