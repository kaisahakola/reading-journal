import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Button,
  Text,
  View,
  StyleSheet,
  Alert
} from 'react-native';
import { useEffect, useState } from 'react';
import { BookWithId } from "@/types/book";
import { getBookById, deleteBookById } from "@/hooks/useBooks";
import { auth } from "@/config/firebase";

const BookDetailsScreen = () => {
  const [book, setBook] = useState<BookWithId>();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchBook = async () => {
      if (typeof id !== "string") {
        console.error("Invalid bookId:", id);
        return;
      }
      if (!userId) {
        console.error("No user found");
        return;
      }
      const book = await getBookById(id, userId);
      setBook(book);
    }

    fetchBook().catch((err) => console.error("Error fetching book: ", err));
  }, [id, userId]);


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
            router.push("/");
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
      <Button title="Go back" onPress={() => router.replace('/')} />
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
