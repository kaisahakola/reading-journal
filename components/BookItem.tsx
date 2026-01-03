import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { BookWithIdAndDate } from '@/types/book';
import StarRating from './StarRating';
import { parseDate } from '@/utils/date';

interface BookItemProps {
  book: BookWithIdAndDate;
}

const BookItem = ({ book }: BookItemProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push(`/home/book/${book.id}`)}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <StarRating rating={book.rating} size={'small'} />
        <View>
          {book.createdAt ? (
            <Text style={styles.date}>{parseDate(book.createdAt)}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 25,
    borderRadius: 20,
    width: '92%',
    margin: 'auto',
    flex: 1,

    // iOS shadow
    shadowColor: '#9999A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: 'AndadaPro',
  },
  author: {
    fontSize: 18,
    fontFamily: 'AndadaPro',
    marginBottom: 8,
    marginTop: 8,
  },
  date: {
    marginLeft: 'auto',
  },
});

export default BookItem;
