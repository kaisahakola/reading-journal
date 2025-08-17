import { useRouter } from 'expo-router';
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { deleteBookById } from '@/hooks/useBooks';
import Toast from 'react-native-toast-message';
import { useFetchBook } from '@/hooks/useFetchBook';
import BookInfo from '@/components/BookInfo';
import ButtonWithIcon from '@/components/ButtonWithIcon';

const BookDetailsScreen = () => {
  const router = useRouter();
  const { book, id, userId } = useFetchBook();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Book deleted!',
    });
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete this book?',
      `Are you sure you want to delete ${book?.title}`,
      [
        {
          text: 'Delete',
          onPress: async () => {
            if (typeof id !== 'string') {
              console.error('Invalid bookId:', id);
              return;
            }
            if (!userId) {
              console.error('No user found');
              return [];
            }
            await deleteBookById(id, userId);
            showToast();
            router.push('/(tabs)/home');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {book ? <BookInfo book={book} /> : null}

      <ButtonWithIcon
        buttonType={'delete'}
        featherIconName={'trash-2'}
        onPress={handleDelete}
      />
      <ButtonWithIcon
        buttonType={'edit'}
        featherIconName={'edit-2'}
        onPress={() => router.push(`/book/${id}/edit`)}
      />
      <ButtonWithIcon
        buttonType={'goBack'}
        featherIconName={'arrow-left'}
        onPress={() => router.replace('/(tabs)/home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 20,
  },
});

export default BookDetailsScreen;
