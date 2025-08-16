import { useRouter } from 'expo-router';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import { deleteBookById } from "@/hooks/useBooks";
import Toast from 'react-native-toast-message';
import { useFetchBook } from "@/hooks/useFetchBook";

const BookDetailsScreen = () => {
  const router = useRouter();
  const { book, id, userId } = useFetchBook();

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Book deleted!"
    })
  }

  const handleDelete = async () => {
    Alert.alert("Delete this book?", `Are you sure you want to delete ${book?.title}`, [
        {
          text: 'Delete',
          onPress: async () => {
            if (typeof id !== "string") {
              console.error("Invalid bookId:", id);
              return;
            }
            if (!userId) {
              console.error("No user found");
              return [];
            }
            await deleteBookById(id, userId);
            showToast();
            router.push("/(tabs)/home");
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
    ]);
  }

  return (
    <View style={styles.container}>
      {book ? (
          <View>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.rating}</Text>
            <Text>{book.note}</Text>
          </View>
      ) : null }

      <Button title="Delete book" onPress={() => handleDelete()} />
      <Button title="Update book" onPress={() => router.push(`/book/${id}/edit`)} />
      <Button title="Go back" onPress={() => router.replace('/(tabs)/home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
})

export default BookDetailsScreen;
