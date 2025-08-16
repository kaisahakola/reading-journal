import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"
import { BookWithId } from "@/types/book";
import StarRating from "./StarRating";

interface BookItemProps {
    book: BookWithId;
}

const BookItem = ({ book }: BookItemProps) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push(`/book/${book.id}`)}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
                <StarRating rating={book.rating} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        marginTop: 20,
        padding: 25,
        borderRadius: 20,
        width: '90%',
        margin: 'auto',
    },
    title: {
        fontSize: 24,
        fontFamily: 'AndadaPro'
    },
    author: {
        fontSize: 18,
        fontFamily: 'AndadaPro',
        marginBottom: 5,
    }
})

export default BookItem;
