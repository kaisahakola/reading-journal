import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, View, StyleSheet } from 'react-native';

const books = [
  { id: '1', title: '1984', rating: 1 },
  { id: '2', title: 'Brave New World', rating: 3 },
  { id: '3', title: 'Dune', rating: 2 },
];

const BookDetailsScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {books.map((book) => (
        id === book.id ? (
            <View key={book.id}>
              <Text>{book.title}</Text>
              <Text>Rating: {book.rating}</Text>
            </View>
        ) : null
      ))}

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
