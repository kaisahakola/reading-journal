import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import {useEffect, useState} from "react";
import { Book } from "@/types/book";

interface BookFormProps {
    onSubmit: (bookData: Book) => void;
    submitLabel: string;
    initialValues?: Book;
    formLabel: string;
}

const BookForm = ({ onSubmit, submitLabel, initialValues, formLabel}: BookFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [rating, setRating] = useState<string>('');
    const [note, setNote] = useState<string>('');

    useEffect(() => {
        if (initialValues) {
            setTitle(initialValues.title);
            setAuthor(initialValues.author);
            setRating(initialValues.rating.toString());
            setNote(initialValues.note);
        }
    }, [initialValues]);

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    {formLabel}
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
                <Button title={submitLabel} onPress={() => onSubmit({
                    title,
                    author,
                    rating: Number(rating),
                    note
                })} />
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

export default BookForm;
