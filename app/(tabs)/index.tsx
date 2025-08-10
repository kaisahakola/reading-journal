import { useRouter } from "expo-router";
import { Text, View, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getAllBooks } from "@/hooks/useBooks";
import { useEffect, useState } from "react";
import { BookWithId } from "@/types/book";

const Index = () => {
    const router = useRouter();
    const [books, setBooks] = useState<BookWithId[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                console.error("No user found");
                return [];
            }
            const allBooks = await getAllBooks(userId);
            setBooks(allBooks);
        };
        fetchBooks();
    }, [books]);

    const handleLogout = async () => {
        try {
            Alert.alert("Logging out", "Are you sure you want to log out?", [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Log out',
                    onPress: async () => {
                        await signOut(auth);
                        router.replace('/login');
                    }
                }
            ])
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <View
            style={styles.container}
        >
            <View>
                {books.map((book) => (
                    <TouchableOpacity key={book.id} onPress={() => router.push(`/book/${book.id}`)}>
                        <Text>{book.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
});

export default Index;
