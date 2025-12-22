import { BookWithIdAndDate } from '@/types/book';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import StarRating from './StarRating';
import { parseDate } from '@/utils/date';

interface BookInfoProps {
  book: BookWithIdAndDate;
}

const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <View style={styles.container}>
      {book.createdAt ? (
        <Text style={styles.date}>{parseDate(book.createdAt)}</Text>
      ) : null}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.author}</Text>
          <Text style={styles.genre}>{book.genre}</Text>
          <StarRating rating={book.rating} size={'big'} />
          <Text style={styles.note}>{book.note}</Text>
          {book.thumbnail ? (
            <Image style={styles.thumbnail} source={{ uri: book.thumbnail }} />
          ) : null}
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: '#708D81',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    fontSize: 16,
  },
  genre: {
    fontFamily: 'Helvetica',
    marginBottom: 15,
  },
  thumbnail: {
    width: '50%',
    aspectRatio: 2 / 3,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 50,
  },
});

export default BookInfo;
