export interface Book {
  title: string;
  author: string;
  note: string;
  rating: number;
}

export type BookWithId = Book & { id: string };

export type BookWithIdAndDate = Book & {
  id: string;
  createdAt?: string;
  updatedAt?: string;
};
