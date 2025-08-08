import { useState } from "react";
import {
    SafeAreaView,
    View,
    TextInput,
    StyleSheet,
    Text,
    Button
} from "react-native";
import { Book } from '@/types/book';
import { addBook } from "@/hooks/useBooks";
import { auth } from "@/config/firebase";

const AddNewBook = () => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [note, setNote] = useState<string>('');

    const handleAddNew = async (
        title: string,
        author: string,
        rating: string,
        note: string) => {

        const newBook: Book = {
            title: title,
            author: author,
            rating: Number(rating),
            note: note
        }

        const userId = auth.currentUser?.uid;

        if (!userId) {
            console.error("No user found");
            return;
        }

        await addBook(userId, newBook);

        setTitle("");
        setAuthor("");
        setRating("");
        setNote("");
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Add A New Book
                </Text>

                <TextInput
                    placeholder="Title"
                    placeholderTextColor="#333"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Author"
                    placeholderTextColor="#333"
                    value={author}
                    onChangeText={setAuthor}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Rating"
                    placeholderTextColor="#333"
                    keyboardType="numeric"
                    value={rating}
                    onChangeText={setRating}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Note"
                    placeholderTextColor="#333"
                    value={note}
                    onChangeText={setNote}
                    style={styles.input}
                />

                <Button title="Add book" onPress={() => handleAddNew(title, author, rating, note)} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        marginTop: '35%',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        width: '90%',
        margin: 'auto'
    },
    titleText: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    }
})

export default AddNewBook;
