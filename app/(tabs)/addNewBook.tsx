import { SafeAreaView, StyleSheet } from 'react-native';
import { Book } from '@/types/book';
import { addBook } from '@/hooks/useBooks';
import { auth } from '@/config/firebase';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import BookForm from '@/components/BookForm';

const AddNewBook = () => {
  const router = useRouter();

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

    showToast();
    await addBook(userId, bookData);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <BookForm
        onSubmit={handleAddNew}
        submitLabel="Add New Book"
        formLabel="Add New Book"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
});

export default AddNewBook;
