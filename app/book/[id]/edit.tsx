import BookForm from '@/components/BookForm';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useFetchBook } from '@/hooks/useFetchBook';
import { updateBookById } from '@/hooks/useBooks';
import { Book } from '@/types/book';
import Toast from 'react-native-toast-message';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditBook = () => {
  const router = useRouter();
  const { book, id, userId } = useFetchBook();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Book updated successfully!',
    });
  };

  const handleUpdate = async (bookData: Book) => {
    if (typeof id !== 'string') {
      console.error('Invalid bookId:', id);
      return;
    }
    if (!userId) {
      console.error('No user found');
      return [];
    }
    await updateBookById(id, userId, bookData);
    showToast();
    router.replace(`/book/${id}`);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.buttonContainer}>
        <ButtonWithIcon
          buttonType={'goBack'}
          featherIconName={'arrow-left'}
          onPress={() => router.replace(`/book/${id}`)}
        />
      </View>
      <BookForm
        onSubmit={handleUpdate}
        submitLabel="Edit Book"
        initialValues={book}
        formLabel="Edit Book"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 15,
  },
});

export default EditBook;
