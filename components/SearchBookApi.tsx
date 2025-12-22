import {
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { GoogleBooksResponse, GoogleBook, BookApiData } from '@/types/bookApi';
import { TriggerAlert } from '@/utils/alert';
import ApiResultList from '@/components/ApiResultList';

interface SearchBookApiProps {
  onSelectBook: (book: BookApiData) => void;
}

const SearchBookApi = ({ onSelectBook }: SearchBookApiProps) => {
  const [query, setQuery] = useState<string>('');
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [bookListVisible, setBookListVisible] = useState<boolean>(false);
  const [activateLoadingAnimation, setActivateLoadingAnimation] =
    useState<boolean>(false);

  const searchBooks = async () => {
    try {
      Keyboard.dismiss();
      setActivateLoadingAnimation(true);
      setBookListVisible(false);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`,
      );
      const data: GoogleBooksResponse = await response.json();
      setBooks(data.items || []);
      setBookListVisible(true);
      setActivateLoadingAnimation(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectBook = async (bookId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}`,
      );
      const data: GoogleBook = await response.json();
      const bookDetails: BookApiData = {
        title: data.volumeInfo.title,
        author: data.volumeInfo.authors?.join(', '),
        genre: data.volumeInfo.categories?.[0] ?? 'Unknown',
        thumbnail: data.volumeInfo.imageLinks?.thumbnail ?? null,
      };

      TriggerAlert(
        'Select this book?',
        `Would you like to add ${bookDetails.title} to your journal?`,
        'An error occurred and book could not be selected.',
        'Select',
        () => onSelectBook(bookDetails),
        false,
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <TextInput
            placeholder="Type in the book title..."
            placeholderTextColor="#333"
            value={query}
            onChangeText={setQuery}
            style={styles.input}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={searchBooks}>
            <Text style={{ color: '#F4D58D' }}>Search</Text>
          </TouchableOpacity>
        </View>
        {activateLoadingAnimation && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {bookListVisible && (
          <ApiResultList books={books} handleSelectBook={handleSelectBook} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 5,
  },
  input: {
    padding: 15,
    borderRadius: 20,
    height: 50,
    backgroundColor: 'lightgray',
    textAlignVertical: 'top',
    width: '80%',
  },
  searchBtn: {
    backgroundColor: '#001427',
    padding: 5,
    borderRadius: 20,
    height: 50,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    marginTop: 50,
  },
});

export default SearchBookApi;
