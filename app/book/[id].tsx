import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { BookWithId } from "@/types/book";
import { getBookById } from "@/hooks/useBooks";
import { auth } from "@/config/firebase";

const BookDetailsScreen = () => {
  const [book, setBook] = useState<BookWithId>();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchBook = async () => {
      if (typeof id !== "string") {
        console.error("Invalid bookId:", id);
        return;
      }

      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("No user found");
        return [];
      }
      const book = await getBookById(id, userId);
      setBook(book);
    }

    fetchBook();
  }, []);

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
