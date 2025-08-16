import { BookWithIdAndDate } from "@/types/book";
import {SafeAreaView, StyleSheet, Text } from "react-native";

interface BookInfoProps {
    book: BookWithIdAndDate;
}

const BookInfo = ({ book }: BookInfoProps) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.rating}</Text>
            <Text>{book.note}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    }
})

export default BookInfo;
