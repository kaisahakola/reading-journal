import { useRouter } from "expo-router";
import {Text, View, Button, StyleSheet} from "react-native";
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { getAllBooks } from "@/hooks/useBooks";
import { useEffect, useState } from "react";
import {Book} from "@/types/book";

const Index = () => {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);

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
            <View>
                {books.map((book) => (
                    <Text key={book.title}>{book.title}</Text>
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
