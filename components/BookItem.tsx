import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router"
import {BookWithIdAndDate} from "@/types/book";
import StarRating from "./StarRating";

interface BookItemProps {
    book: BookWithIdAndDate;
}

const BookItem = ({ book }: BookItemProps) => {
    const router = useRouter();

    const parseDate = (date: string) => {
        const year = date.slice(0, 4);
        const month = date.slice(6, 7);
        const day = date.slice(8, 10);

        return `${day}.${month}.${year}`;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push(`/book/${book.id}`)}>
                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
                <StarRating rating={book.rating} />
                <View style={styles.date}>
                    {book.createdAt ? (
                        <Text>{parseDate(book.createdAt)}</Text>
                    ) : null}
                </View>
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
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: 'AndadaPro'
    },
    author: {
        fontSize: 18,
        fontFamily: 'AndadaPro',
        marginBottom: 8,
        marginTop: 8,
    },
    date: {
        marginLeft: 'auto',
    }
})

export default BookItem;
