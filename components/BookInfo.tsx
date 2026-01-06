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
          <View style={styles.thumbnailContainer}>
            {book.thumbnail ? (
              <Image
                style={styles.thumbnail}
                source={{ uri: book.thumbnail }}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    alignItems: 'center',
  },
  date: {
    padding: 15,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Marcellus',
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
    marginBottom: 15,
    backgroundColor: '#F4F4F6',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    fontSize: 16,

    // iOS shadow
    shadowColor: '#9999A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android shadow
    elevation: 4,
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
  thumbnailContainer: {
    // iOS shadow
    shadowColor: '#66666E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
});

export default BookInfo;
