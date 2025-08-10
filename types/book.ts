export interface Book {
    title: string;
    author: string;
    note: string;
    rating: number;
}

export type BookWithId = Book & { id: string };
