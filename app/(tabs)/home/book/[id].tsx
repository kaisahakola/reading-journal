import { useRouter } from 'expo-router';
import { View, StyleSheet, Alert } from 'react-native';
import { deleteBookById } from '@/hooks/useBooks';
import Toast from 'react-native-toast-message';
import { useFetchBook } from '@/hooks/useFetchBook';
import BookInfo from '@/components/BookInfo';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsContainer}>
        <ButtonWithIcon
          buttonType={'goBack'}
          featherIconName={'arrow-left'}
          onPress={() => router.replace('/(tabs)/home')}
        />

        <View style={styles.editAndDeleteButtons}>
          <ButtonWithIcon
            buttonType={'delete'}
            featherIconName={'trash-2'}
            onPress={handleDelete}
          />
          <ButtonWithIcon
            buttonType={'edit'}
            featherIconName={'edit-2'}
            onPress={() => router.push(`/home/book/${id}/edit`)}
          />
        </View>
      </View>

      {book ? <BookInfo book={book} /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  editAndDeleteButtons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    gap: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
});

export default BookDetailsScreen;
