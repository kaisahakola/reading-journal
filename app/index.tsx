import { useRouter } from "expo-router";
import {Text, TouchableOpacity, View, Button, StyleSheet} from "react-native";
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

const books = [
  { id: '1', title: '1984', rating: 1 },
  { id: '2', title: 'Brave New World', rating: 3 },
  { id: '3', title: 'Dune', rating: 2 },
];

const Index = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace('/login');
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <View
            style={styles.container}
          >
            {books.map((book) => (
              <TouchableOpacity key={book.id} onPress={() => router.push(`/book/${book.id}`)}>
                <Text>{book.title}</Text>
              </TouchableOpacity>
            ))}

            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
});

export default Index;
