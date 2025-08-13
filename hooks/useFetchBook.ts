import { useEffect, useState } from "react";
import { BookWithId } from "@/types/book";
import { useLocalSearchParams } from "expo-router";
import { auth } from "@/config/firebase";
import { getBookById } from "@/hooks/useBooks";

export const useFetchBook = () => {
    const [book, setBook] = useState<BookWithId>();
    const { id } = useLocalSearchParams();
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        const fetchBook = async () => {
            if (typeof id !== "string") {
                console.error("Invalid bookId:", id);
                return;
            }
            if (!userId) {
                console.error("No user found");
                return;
            }
            const book = await getBookById(id, userId);
            setBook(book);
        }

        fetchBook().catch((err) => console.error("Error fetching book: ", err));
    }, [id, userId]);

    return { book, id, userId };
}
