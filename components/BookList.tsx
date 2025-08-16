import { useEffect, useState } from "react";
import { BookWithIdAndDate } from "@/types/book";
import { auth } from "@/config/firebase";
import { getAllBooks } from "@/hooks/useBooks";
import {View, StyleSheet, ScrollView} from "react-native";
import BookItem from "./BookItem";

const BookList = () => {
    const [books, setBooks] = useState<BookWithIdAndDate[]>([]);

    useEffect(() => {
        fetchBooks().catch((err) => console.error("Error fetching books: ", err));
    }, [books]);

    const fetchBooks = async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error("No user found");
            return [];
        }
        const allBooks = await getAllBooks(userId);
        setBooks(allBooks);
    };

    return (
        <ScrollView style={styles.container}>
            {books.map((book) => (
                <View key={book.id}>
                    <BookItem book={book} />
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    }
})

export default BookList;
