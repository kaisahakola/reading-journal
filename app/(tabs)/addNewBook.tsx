import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Book } from '@/types/book';
import { addBook } from '@/services/bookService';
import { auth } from '@/config/firebase';
import { useRouter, useFocusEffect } from 'expo-router';
import Toast from 'react-native-toast-message';
import BookForm from '@/components/BookForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState } from 'react';
import SearchBookApi from '@/components/SearchBookApi';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import { BookApiData } from '@/types/bookApi';

const AddNewBook = () => {
  const [showForm, setShowForm] = useState(false);
  const [showBookApiSearch, setShowBookApiSearch] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookApiData | null>(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setShowForm(false);
      setShowBookApiSearch(false);
      setSelectedBook(null);
    }, []),
  );

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'New book added!',
    });
  };

  const handleAddNew = async (bookData: Book) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error('No user found');
      return;
    }

    const fullBookData = {
      ...bookData,
      thumbnail: selectedBook?.thumbnail ?? null,
    };

    showToast();
    await addBook(userId, fullBookData);
    router.replace('/(tabs)/home');
  };

  const handleBookSelect = (book: BookApiData) => {
    setSelectedBook(book);
    setShowBookApiSearch(false);
    setShowForm(true);
  };

  const handleGoBack = () => {
    setShowForm(false);
    setSelectedBook(null);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      {!showForm && !showBookApiSearch && (
        <View style={styles.chooseOptionBtns}>
          <Text style={styles.title}>Add a New Book</Text>
          <TouchableOpacity
            style={styles.showFormBtn}
            onPress={() => setShowForm(true)}
          >
            <Text style={styles.btnText}>Add manually</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.showFormBtn}
            onPress={() => setShowBookApiSearch(true)}
          >
            <Text style={styles.btnText}>Search from Google Books</Text>
          </TouchableOpacity>
        </View>
      )}
      {showForm && (
        <View style={styles.newBookView}>
          <ButtonWithIcon
            buttonType={'goBack'}
            featherIconName={'arrow-left'}
            onPress={handleGoBack}
          />
          <BookForm
            onSubmit={handleAddNew}
            submitLabel="Add New Book"
            formLabel=""
            initialValues={
              selectedBook
                ? {
                    title: selectedBook.title ?? '',
                    author: selectedBook.author ?? '',
                    genre: (selectedBook.genre?.toLowerCase() as any) ?? null,
                    note: '',
                    rating: 0,
                    thumbnail: selectedBook.thumbnail ?? null,
                  }
                : undefined
            }
          />
        </View>
      )}
      {showBookApiSearch && (
        <View style={styles.newBookView}>
          <ButtonWithIcon
            buttonType={'goBack'}
            featherIconName={'arrow-left'}
            onPress={() => setShowBookApiSearch(false)}
          />
          <SearchBookApi onSelectBook={handleBookSelect} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E6E6E9',
  },
  chooseOptionBtns: {
    marginTop: '50%',
    width: '100%',
    gap: 30,
    alignItems: 'center',
  },
  showFormBtn: {
    backgroundColor: '#001427',
    borderRadius: 20,
    padding: 10,
    width: '90%',
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  newBookView: {
    gap: 10,
    flex: 1,
    paddingHorizontal: 15,
  },
  btnText: {
    color: '#F4D58D',
    fontFamily: 'AndadaPro',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Marcellus',
    marginTop: 20,
  },
});

export default AddNewBook;
